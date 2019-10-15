const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

const { SESS_NAME } = require("../../config/keys");

// Models
const User = require("../../models/User");
const History = require("../../models/History");

// Validation
const { ensureSignedIn, ensureSignedOut } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createMongoError = require("../../utils/createMongoError");
const createErrorObject = require("../../utils/createErrorObject");

// TODOS: Delete user, share user on nutulator & bitness

// @route POST api/user/register
// @desc Register user
// @access Public
// TODO: Avatar

router.post("/register", ensureSignedOut, validateRequest, (req, res, next) => {
  const { body } = req;

  const avatar =
    "https://pbs.twimg.com/profile_images/971421611030171658/ldC9VK6w_400x400.jpg";

  const _id = Types.ObjectId();

  const newUser = new User({
    _id,
    avatar,
    ...body
  });

  let newHistory = new History({
    user: _id
  });

  newUser
    .save()
    .then(user => {
      newHistory.save().catch(next);
      delete user.password;
      return res.json({ message: "success" });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).json(createMongoError(err));
      }
      next(err);
    });
});

// @route POST api/user/edit
// @desc Edit User
// @access Private
router.post(
  "/edit",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;

    const { userId } = session;
    const { name, email, username, password, defaultUnit } = body;

    let field;
    let patch;

    if (name) {
      field = "name";
      patch = name;
    } else if (email) {
      field = "email";
      patch = email;
    } else if (username) {
      field = "username";
      patch = username;
    } else if (password) {
      field = "password";
      patch = password;
    } else if (defaultUnit) {
      field = "defaultUnit";
      patch = defaultUnit;
    }
    User.findByIdAndUpdate(userId, {
      $set: { [field]: patch }
    })
      .then(() => res.json({ message: "success" }))
      .catch(err => {
        if (err.name === "ValidationError") {
          return res.status(400).json(createMongoError(err));
        } else {
          next(err);
        }
      });
  }
);

// @route POST api/user/edit
// @desc Delete User
// @access Private
router.delete("/", ensureSignedIn, async (req, res, next) => {
  const { session } = req;
  const { userId } = session;

  // delete history/plans associated with user
  User.deleteOne({ _id: userId })
    .then(reski => {
      if (!reski.deletedCount) {
        return next(reski);
      }
      History.deleteOne({ user: userId }).then(reski => {
        if (!reski.deletedCount) {
          reski.noRes = true;
          return next(reski);
        }
      });

      req.session.destroy(err => {
        if (err) {
          next(err);
        }

        return res
          .clearCookie(SESS_NAME)
          .status(200)
          .json({ message: "success" });
      });
    })
    .catch(next);
});

// @route POST api/user/login
// @desc Login User
// @access Public
router.post("/login", ensureSignedOut, validateRequest, async (req, res) => {
  const { body, session } = req;
  const { email, password } = body;

  const user = await User.findOne({ email }).select("_id password");

  if (!user || !(await user.matchesPassword(password))) {
    return res
      .status(404)
      .json(
        createErrorObject(["Incorrect email or password. Please try again"])
      );
  }

  session.userId = user.id;

  return res.json({ message: "success" });
});

// @route POST api/user/logout
// @desc Logout User
// @access Private
router.get("/logout", ensureSignedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }

    return res
      .status(200)
      .clearCookie(SESS_NAME)
      .json({ message: "success" });
  });
});

// @route GET api/user/me
// @desc Returns current user
// @access Private
router.get("/me", ensureSignedIn, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) {
    res.status(500).json("Server error");
  }
  delete user.password;
  res.status(200).json(user);
});

module.exports = router;
