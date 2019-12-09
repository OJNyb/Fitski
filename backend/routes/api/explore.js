const express = require("express");
const router = express.Router();
var CronJob = require("cron").CronJob;
const { formatHistoryDate } = require("../../utils/formatHistoryDate");

// Model
const WOPlan = require("../../models/WOPlan");
const User = require("../../models/User");
const PlanTrend = require("../../models/PlanTrend");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

new CronJob(
  "5 0 * * * *",
  function() {
    console.log("You will see this message every day ") + new Date();
    PlanTrend.deleteMany({
      date: {
        $lt: formatHistoryDate(
          new Date(new Date().setMonth(new Date().getMonth() - 1))
        )
      }
    }).catch(err => console.error(err));
  },
  null,
  true,
  "Europe/Oslo"
);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
}

// @route GET api/explore/search
// @desc Search for user/workout plans
// @access Private
router.get(
  "/search",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const {
      query: { skip, search }
    } = req;

    let queryPlans;

    try {
      queryPlans = await WOPlan.find(
        { access: "public", $text: { $search: search } },
        { score: { $meta: "textScore" } }
      )
        .populate("user")
        .sort({ score: { $meta: "textScore" } })
        .skip(Number(skip))
        .limit(40)
        .limit(40);
    } catch (e) {
      return next(e);
    }

    res.status(200).json({ results: queryPlans });
  }
);

// @route GET api/explore/trending
// @desc Get trending workout plans
// @access Private
router.get(
  "/trending",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { query } = req;
    const { skip } = query;
    // console.log(goal, length);
    // const match = {};
    // const regex = new RegExp(escapeRegExp(goal));

    // if (goal.length) {
    //   match.goal = { $regex: regex };
    // }
    // if (length[0] > 0 || length[1] < 50) {
    //   match.weeks = {
    //     $where: `this.weeks.length>=${length[0]}`,
    //     $where: `this.weeks.length<=${length[1]}`
    //   };
    // }

    PlanTrend.aggregate([
      { $group: { _id: "$woPlan", number: { $sum: 1 } } },
      { $sort: { number: -1 } },
      { $skip: Number(skip) || 0 },
      { $limit: 40 }
    ])
      .then(plans =>
        WOPlan.find({ _id: { $in: plans.map(x => x._id) } })
          .populate("user")
          .then(woPlans => res.json({ results: woPlans }))
          .catch(next)
      )
      .catch(next);
  }
);

// @route GET api/explore/users/search
// @desc Search for users by username
// @access Private
router.get(
  "/users/search",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const {
      query: { skip, username }
    } = req;

    console.log(username);
    console.log(skip);
    let users;

    const regex = new RegExp(escapeRegExp(username));
    try {
      users = await User.find({ username: { $regex: regex } })
        .skip(Number(skip))
        .limit(40);
    } catch (err) {
      next(err);
    }

    console.log(users);
    return res.status(200).json({ results: users });
  }
);
module.exports = router;
