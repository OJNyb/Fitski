const express = require("express");
const router = express.Router();

const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const { SESS_NAME } = require("../../config/keys");

const { ensureSignedIn, ensureSignedOut } = require("../../middlewares/auth");
const createMongoError = require("../../utils/createMongoError");
const createErrorObject = require("../../utils/createErrorObject");

// TODOS: Delete user, edit user, share user on nutulator & bitness

// Load User model
const User = require("../../models/User");

// @route POST api/user/register
// @desc Register user
// @access Public
router.post("/register", ensureSignedOut, validateRequest, (req, res) => {
  const { body } = req;
  const { name, email, username, password } = body;

  const avatar =
    "https://pbs.twimg.com/profile_images/971421611030171658/ldC9VK6w_400x400.jpg";

  const newUser = new User({
    name,
    email,
    avatar,
    username,
    password
  });

  newUser
    .save()
    .then(user => {
      delete user.password;
      return res.json({ message: "success" });
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).json(createMongoError(err));
      }
      // TODO: Handle her
      res.status(500).json({ message: "Something bad happened..." });
      console.log(err);
    });
});

// @route POST api/user/login
// @desc Login User
// @access Public
router.post("/login", ensureSignedOut, validateRequest, async (req, res) => {
  const { body, session } = req;
  const { email, password } = body;

  const user = await User.findOne({ email });

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

// @route POST api/user/edit
// @desc Edit User
// @access Private
router.post("/edit", ensureSignedIn, validateRequest, async (req, res) => {
  const { body, session } = req;

  const { userId } = session;
  const { name, email, username, password } = body;

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
  }
  User.findByIdAndUpdate(userId, {
    $set: { [field]: patch }
  })
    .then(() => res.json({ message: "success" }))

    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).json(createMongoError(err));
      }
      // TODO: Handle her
      res.status(500).json({ message: "Something bad happened..." });
      console.log(err);
    });
});

// @route POST api/user/logout
// @desc Logout User
// @access Private
router.get("/logout", ensureSignedIn, (req, res) => {
  // return res.json({ msg: "gay" });
  req.session.destroy(err => {
    if (err) console.log(err);

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

// Object.keys(errors).forEach(key => {

// });
