const express = require("express");
const { Types } = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Models
const User = require("../../models/User");
const History = require("../../models/History");
const WOPlan = require("../../models/WOPlan");
const UserAccess = require("../../models/UserAccess");
const PlanAccess = require("../../models/PlanAccess");
const PlanTrend = require("../../models/PlanTrend");
const DefaultExerciseDelete = require("../../models/DefaultExerciseDelete");
const DefaultMuscleGroupDelete = require("../../models/DefaultMuscleGroupDelete");

const { formatHistoryDate } = require("../../utils/formatHistoryDate");

// Validation
const { ensureSignedIn, ensureSignedOut } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createMongoError = require("../../utils/createMongoError");
const createErrorObject = require("../../utils/createErrorObject");

const { SESS_NAME, MAILGUN_EMAIL, MAILGUN_PASSWORD } = process.env;

const router = express.Router();

// @route POST api/user/register
// @desc Register user
// @access Public
router.post("/register", ensureSignedOut, validateRequest, (req, res, next) => {
  const { body, session } = req;

  const _id = Types.ObjectId();

  const newUser = new User({
    _id,
    avatar: "default",
    ...body,
  });

  const newHistory = new History({
    user: _id,
  });

  const newDefaultExerciseDelete = new DefaultExerciseDelete({
    user: _id,
  });

  const newUserAccess = new UserAccess({
    user: _id,
  });

  const newMuscleGroupDelete = new DefaultMuscleGroupDelete({
    user: _id,
  });

  newUser
    .save()
    .then(async (user) => {
      try {
        await newHistory.save();
        await newDefaultExerciseDelete.save();
        await newUserAccess.save();
        await newMuscleGroupDelete.save();
      } catch (err) {
        try {
          newUser.remove();
        } catch (err) {
          return next(err);
        }
        return next(err);
      }

      delete user.password;
      session.userId = user.id;
      return res.json({ message: "success" });
    })
    .catch((err) => {
      const { name, error } = err;

      if (name === "ValidationError") {
        return res.status(400).json(createMongoError(err));
      } else if (name === "preSaveError") {
        res.status(409).json(createErrorObject([error]));
      } else {
        next(err);
      }
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

    const user = await User.findById(userId);

    if (!user) {
      return next("No user");
    }

    const newUser = {
      ...user,
      ...body,
    };

    newUser
      .save()
      .then(() => res.json({ message: "success" }))
      .catch((err) => {
        const { name, error } = err;
        if (name === "ValidationError") {
          return res.status(400).json(createMongoError(err));
        } else if (name === "preSaveError") {
          res.status(409).json(createErrorObject([error]));
        } else {
          next(err);
        }
      });
  }
);

// @route POST api/user/edit/email
// @desc Edit Email
// @access Private
router.post(
  "/edit/email",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;
    const { email, password } = body;
    const { userId } = session;

    const user = await User.findById(userId).select("password");

    if (!user) {
      return next("No user");
    }

    if (!(await user.matchesPassword(password))) {
      return res
        .status(401)
        .json(createErrorObject(["Incorrect password. Please try again"]));
    }

    user.email = email;

    user
      .save()
      .then(() => res.json({ message: "success" }))
      .catch((err) => {
        const { name, error } = err;
        if (name === "ValidationError") {
          return res.status(400).json(createMongoError(err));
        } else if (name === "preSaveError") {
          res.status(409).json(createErrorObject([error]));
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
    .then((reski) => {
      if (!reski.deletedCount) {
        return next(reski);
      }
      History.deleteOne({ user: userId }).then((reski) => {
        if (!reski.deletedCount) {
          reski.noRes = true;
          return next(reski);
        }
      });

      req.session.destroy((err) => {
        if (err) {
          return next(err);
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
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    return res.status(200).clearCookie(SESS_NAME).json({ message: "success" });
  });
});

// @route GET api/user/me
// @desc Returns current user
// @access Private
router.get("/me", ensureSignedIn, async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.status(500).json("Server error");
  }
  delete user.password;
  res.status(200).json(user);
});

// @route GET api/user/:username
// @desc Get user
// @access Private
router.get("/user/:username", ensureSignedIn, async (req, res) => {
  const { params } = req;
  const { username } = params;
  const user = await User.findOne({ username }, "avatar username email bio");
  if (!user) {
    return res
      .status(404)
      .json(createErrorObject(["No user with that username"]));
  }
  res.status(200).json(user);
});

// @route POST api/user/forgot
// @desc Forgot password
// @access Private
router.post(
  "/forgot",
  ensureSignedOut,
  validateRequest,
  async (req, res, next) => {
    const { body } = req;

    const { email } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(
          createErrorObject(["No account with that email address exists."])
        );
    }

    crypto.randomBytes(20, function (err, buf) {
      let token = buf.toString("hex");

      user
        .updateOne({
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
          },
        })
        .then(() => {
          const smtpTransport = nodemailer.createTransport({
            port: 587,
            host: "smtp.eu.mailgun.org",
            secure: false,
            auth: {
              user: MAILGUN_EMAIL,
              pass: MAILGUN_PASSWORD,
            },
          });
          const mailOptions = {
            to: user.email,
            from: "postmaster@mg.chadify.me",
            subject: "Chadify Password Reset",
            text: `Hello,\n\nWe've recieved a request to reset your password\n\nIf you didn't make the request, just ignore this message.\n\nOtherwise, you can reset your password clicking this link:\n\nhttp://localhost:3000/reset/${token}\n\nThanks,\nChad\n`,
          };
          smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
              return next(err);
            }
            res.status(200).json({ message: "success" });
          });
        })
        .catch(next);
    });
  }
);

// @route POST api/user/reset/:token
// @desc Reset password
// @access Private
router.post(
  "/reset/:token",
  ensureSignedOut,
  validateRequest,
  async (req, res) => {
    const { body, params } = req;
    const { token } = params;
    const { password } = body;

    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .json(
          createErrorObject(["Password reset token is invalid or has expired."])
        );
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = password;

    user.save().then(() => {
      const smtpTransport = nodemailer.createTransport({
        port: 587,
        host: "smtp.eu.mailgun.org",
        secure: false,
        auth: {
          user: MAILGUN_EMAIL,
          pass: MAILGUN_PASSWORD,
        },
      });
      const mailOptions = {
        to: user.email,
        from: "Chadify",
        subject: "Your password has been changed",
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (err) {
          return res
            .status(500)
            .json(
              createErrorObject(["Something went wrong, please try again"])
            );
        }
        res.status(200).json({ message: "success" });
      });
    });
  }
);

// @route POST api/user/password/set
// @desc Set password
// @access Private
router.post(
  "/password/set",
  ensureSignedIn,
  validateRequest,
  async (req, res) => {
    const { body, session } = req;
    const { userId } = session;
    const { oldPassword, newPassword } = body;

    const user = await User.findById(userId).select("email password");

    if (!user) {
      return next("No user");
    }

    if (!(await user.matchesPassword(oldPassword))) {
      return res
        .status(401)
        .json(createErrorObject(["Incorrect password. Please try again"]));
    }

    user.password = newPassword;

    user.save().then((user) => {
      const smtpTransport = nodemailer.createTransport({
        port: 587,
        host: "smtp.eu.mailgun.org",
        secure: false,
        auth: {
          user: MAILGUN_EMAIL,
          pass: MAILGUN_PASSWORD,
        },
      });
      const mailOptions = {
        to: user.email,
        from: "Chadify",
        subject: "Your password has been changed",
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json(
              createErrorObject(["Something went wrong, please try again"])
            );
        }
        res.status(200).json({ message: "success" });
      });
    });
  }
);

// @route GET api/user/access
// @desc Get user accessed plans
// @access Private
router.get("/access", ensureSignedIn, async (req, res, next) => {
  const { session } = req;
  const { userId } = session;
  UserAccess.findOne({ user: userId })
    .then((access) => {
      res.json(access);
    })
    .catch(next);
});

// @route GET api/user/access/:plan_id
// @desc Add plan to user access
// @access Private
router.post(
  "/access/:plan_id",
  ensureSignedIn,
  validateRequest,
  (req, res, next) => {
    const { params, session } = req;
    const { plan_id: planId } = params;
    const { userId } = session;

    WOPlan.findById(planId)
      .then(async (plan) => {
        if (!plan) {
          return res
            .status(404)
            .json(createErrorObject(["No plan with this ID"]));
        }
        if (plan.access !== "public") {
          return res
            .status(403)
            .json(createErrorObject(["You don't have access to this plan"]));
        }

        let newPlanTrend = new PlanTrend({
          woPlan: planId,
          date: formatHistoryDate(new Date()),
          user: userId,
        });

        try {
          await UserAccess.updateOne(
            { user: userId },
            { $push: { plans: { woPlan: planId } } }
          );
          await PlanAccess.updateOne(
            { woPlan: planId },
            { $push: { whitelist: { user: userId } } }
          );

          await newPlanTrend.save();
        } catch (e) {
          next(e);
        }

        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route GET api/user/access/:plan_id
// @desc Remove plan from user access
// @access Private
router.delete(
  "/access/:plan_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { params, session } = req;
    const { plan_id: planId } = params;
    const { userId } = session;

    try {
      await PlanAccess.updateOne(
        { woPlan: planId },
        {
          $pull: { whitelist: { user: userId } },
        }
      );
      await UserAccess.updateOne(
        { user: userId },
        { $pull: { plans: { woPlan: planId } } }
      );
      await PlanTrend.deleteOne({ user: userId, woPlan: planId });
    } catch (e) {
      next(e);
    }

    res.json({ message: "success" });
  }
);

module.exports = router;
