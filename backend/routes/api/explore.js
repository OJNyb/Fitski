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

// @route GET api/plan/trending
// @desc Get trending workout plans
// @access Private
router.get("/trending/", ensureSignedIn, async (req, res, next) => {
  const { query } = req;
  const { skip } = query;

  PlanTrend.aggregate([
    { $group: { _id: "$woPlan", number: { $sum: 1 } } },
    { $sort: { number: -1 } },
    { $skip: Number(skip) || 0 },
    { $limit: 40 }
  ])
    .then(plans =>
      WOPlan.find({ _id: { $in: plans.map(x => x._id) } })
        .populate("user")
        .then(woPlans => res.json(woPlans))
        .catch(next)
    )
    .catch(next);
});

module.exports = router;
