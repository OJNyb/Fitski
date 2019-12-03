const express = require("express");
const router = express.Router();
// Model
const WOPlan = require("../../models/WOPlan");
const User = require("../../models/User");
const PlanAccess = require("../../models/PlanAccess");
const UserAccess = require("../../models/UserAccess");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
// const validateWOPlan = require("../../middlewares/validateWOPlan");
// const SchemaValidator = require("../../middlewares/SchemaValidator");
// const validateRequest = SchemaValidator(true);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
}

// @route GET api/explore/search
// @desc Search for user/workout plans
// @access Private
router.get("/search", ensureSignedIn, async (req, res, next) => {
  const {
    query: { query }
  } = req;

  let queryPlans;
  let users;
  let userPlans = [];

  const regex = new RegExp(escapeRegExp(query));
  try {
    users = await User.find({ username: { $regex: regex } });
    queryPlans = await WOPlan.find(
      { access: "public", $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .populate("user")
      .sort({ score: { $meta: "textScore" } });
    if (users) {
      userPlans = await WOPlan.find({
        access: "public",
        user: { $in: users.map(x => x._id) }
      }).populate("user");
    }
  } catch (e) {
    return next(e);
  }

  res.status(200).json({ results: [...queryPlans, ...userPlans] });
});

module.exports = router;
