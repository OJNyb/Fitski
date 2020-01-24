const express = require("express");
const router = express.Router();
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const stream = require("stream");

// Storage engine
const AvatarStorage = require("../../helpers/AvatarStorage");
// Models
const User = require("../../models/User");

// Configure UPLOAD_PATH
// process.env.AVATAR_STORAGE contains uploads/avatars
var UPLOAD_PATH = path.resolve(
  __dirname,
  "../..",
  process.env.AVATAR_STORAGE,
  "responsive"
);

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const createErrorObject = require("../../utils/createErrorObject");

// setup a new instance of the AvatarStorage engine
const storage = AvatarStorage({
  square: true,
  responsive: true,
  quality: 90
});

const limits = {
  files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024 // 1 MB (max file size)
};

const fileFilter = function(req, file, cb) {
  // supported image file mimetypes
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (_.includes(allowedMimes, file.mimetype)) {
    // allow supported image files
    cb(null, true);
  } else {
    // throw error for invalid files
    cb(
      createErrorObject([
        "Invalid file type. Only jpg, png and gif image files are allowed."
      ])
    );
  }
};

// setup multer
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

function removeFile(filename, next) {
  let basePath = path.join(UPLOAD_PATH, filename);
  let filesToRemove = [];
  filesToRemove.push(basePath + "_lg");
  filesToRemove.push(basePath + "_md");
  filesToRemove.push(basePath + "_sm");
  for (let i = 0; i < filesToRemove.length; i++) {
    fs.unlink(filesToRemove[i] + ".jpg", err => {
      if (err) next(err);
    });
  }
}

// @route GET api/image/avatar/:filename
// @desc Get users avatar
// @access Public
router.get("/avatar/:filename", function(req, res, next) {
  const { params } = req;
  const { filename } = params;
  const pathToFile = path.join(UPLOAD_PATH, filename);
  const r = fs.createReadStream(pathToFile);
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, err => {
    if (err) {
      res.status(404).json(createErrorObject(["Couldn't find image"]));
    }
  });
  ps.pipe(res);
});

// @route GET api/image/resources/:filename
// @desc Get file
// @access Public
router.get("/resources/:filename", function(req, res, next) {
  const { params } = req;
  const { filename } = params;
  var pathToFile = path.resolve(
    __dirname,
    "../..",
    "uploads",
    "resources",
    filename
  );
  const r = fs.createReadStream(pathToFile);
  const ps = new stream.PassThrough();
  stream.pipeline(r, ps, err => {
    if (err) {
      res.status(404).json(createErrorObject(["Couldn't find image"]));
    }
  });
  ps.pipe(res);
});

// @route POST api/image/avatar
// @desc Upload avatar
// @access Private
router.post(
  "/avatar",
  ensureSignedIn,
  validateRequest,
  upload.single(process.env.AVATAR_FIELD),
  async function(req, res, next) {
    const { app, file, session, storage, baseUrl, protocol, hostname } = req;
    const { userId } = session;

    if (!file) {
      return res
        .status(400)
        .json(createErrorObject(["Avatar field is required"]));
    }

    const { filename } = file;

    let files;
    var matches = filename.match(/^(.+?)_.+?\.(.+)$/i);

    if (matches) {
      files = _.map(["lg", "md", "sm"], function(size) {
        return matches[1] + "_" + size + "." + matches[2];
      });
    } else {
      files = [filename];
    }

    files = _.map(files, function(filename) {
      var port = app.get("port");
      var base = protocol + "://" + hostname + (port ? ":" + port : "");
      var url = path
        .join(baseUrl, filename)
        .replace(/[\\\/]+/g, "/")
        .replace(/^[\/]+/g, "");

      return (storage == "local" ? base : "") + "/" + url;
    });
    const user = await User.findById(userId);
    const { avatar } = user;
    if (avatar !== "default") {
      removeFile(avatar, next);
    }
    user
      .updateOne({ $set: { avatar: matches[1] } })
      .then(() =>
        res.status(200).json({ message: "success", location: matches[1] })
      )

      .catch(next);
  }
);

module.exports = router;
