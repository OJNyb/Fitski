const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

// Model
const WOPlan = require("../../models/WOPlan");
const User = require("../../models/User");
const PlanAccess = require("../../models/PlanAccess");
const UserAccess = require("../../models/UserAccess");
const PlanTrend = require("../../models/PlanTrend");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const validateWOPlan = require("../../middlewares/validateWOPlan");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

const {
  createDummyWeeks,
  createEmptyWeekArray
} = require("../../utils/planUtils");

const { formatHistoryDate } = require("../../utils/formatHistoryDate");

// @route GET api/plan
// @desc Get current users workout plans
// @access Private
router.get("/", ensureSignedIn, async (req, res, next) => {
  const { query, session } = req;
  const { skip } = query;
  const { userId } = session;
  UserAccess.findOne({ user: userId })
    .then(access => {
      const { plans } = access;
      const accessedPlansIds = plans.map(x => x.woPlan);
      WOPlan.find({
        $or: [{ user: userId }, { _id: { $in: accessedPlansIds } }]
      })
        .skip(Number(skip) || 0)
        .limit(40)
        .populate("user")
        .then(woPlans => res.json(woPlans))
        .catch(next);
    })
    .catch(next);
});

// @route GET api/plan/user/:username
// @desc Get user workout plans
// @access Private
router.get("/user/:username", ensureSignedIn, async (req, res, next) => {
  const { query, params } = req;
  const { skip } = query;
  const { username } = params;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json(createErrorObject(["No user with that username"]));
      }
      const { _id: userId } = user;
      WOPlan.find({ user: userId, access: { $in: ["public", "paywall"] } })
        .skip(Number(skip) || 0)
        .limit(40)
        .populate("user")
        .then(woPlans => {
          woPlans.forEach(
            x => (x.weeks = createEmptyWeekArray(x.weeks.length))
          );
          res.json(woPlans);
        })
        .catch(next);
    })
    .catch(next);
});

// @route GET api/plan/:plan_id
// @desc Get workout plan by id
// @access Private
router.get(
  "/:plan_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    //  const { woPlan } = body;
    const { session, params } = req;
    const { userId } = session;
    const { plan_id: planId } = params;

    try {
      var woPlan = await WOPlan.findById(planId).populate(
        "weeks.days.exercises.exercise user"
      );
      var planAccess = await PlanAccess.findOne({ woPlan: planId });
    } catch (err) {
      return next(err);
    }

    if (!woPlan) {
      return res
        .status(404)
        .json(createErrorObject(["No workout plan with this ID"]));
    }

    let hasAccess = true;

    const { user, access } = woPlan;

    let doc = { ...woPlan._doc };

    if (user._id.toString() !== userId) {
      if (
        planAccess.whitelist.map(x => x.user.toString()).indexOf(userId) === -1
      ) {
        if (access === "paywall") {
          doc.weeks = createDummyWeeks();
        }
        hasAccess = false;
      }

      if (woPlan.access === "private" && !hasAccess) {
        return res
          .status(403)
          .json(
            createErrorObject(["You are not authorized to view this plan"])
          );
      }
    }

    res.json({ woPlan: doc, hasAccess });
  }
);

// @route POST api/plan
// @desc Create workout plan
// @access Private
router.post("/", ensureSignedIn, validateRequest, async (req, res, next) => {
  const { body, session } = req;
  const { userId } = session;
  const { planId } = body;

  const _id = planId ? planId : Types.ObjectId();

  const newWOPlan = new WOPlan({
    _id,
    user: userId,
    ...body
  });

  const newPlanAccess = new PlanAccess({
    woPlan: _id
  });

  let newPlanTrend;
  if (body.access !== "private") {
    newPlanTrend = new PlanTrend({
      woPlan: _id,
      date: formatHistoryDate(new Date()),
      user: userId
    });
  }

  try {
    await newWOPlan.save();
    await newPlanAccess.save();
    if (newPlanTrend) newPlanTrend.save();
  } catch (err) {
    return next(err);
  }

  res.json({ message: "success" });
});

// @route POST api/plan/:plan_id
// @desc Edit workout plan
// @access Private
router.post(
  "/:plan_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body } = req;

    const { name, goal, price, access, difficulty, description, woPlan } = body;

    if (name) {
      woPlan["name"] = name;
    }
    if (goal) {
      woPlan["goal"] = goal;
    }
    if (access) {
      woPlan["access"] = access;
    }
    if (description) {
      woPlan["description"] = description;
    }
    if (difficulty) {
      woPlan["difficulty"] = difficulty;
    }
    if (price) {
      woPlan["price"] = price;
    }

    woPlan
      .save()
      .then(() => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route DELETE api/plan/:plan_id
// @desc Delete workout plan
// @access Private
router.delete(
  "/:plan_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body } = req;
    const { woPlan } = body;

    woPlan
      .remove()
      .then(() => res.json({ message: "success" }))
      .catch(next);
  }
);

// @route POST api/plan/week/:plan_id
// @desc Add week
// @access Private
router.post(
  "/week/:plan_id/",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body } = req;

    let { woPlan, weekArray } = body;

    woPlan
      .updateOne({
        $push: { weeks: { $each: weekArray } }
      })
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success", weekArray });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/week/:plan_id/:week_id
// @desc Copy week
// @access Private
router.post(
  "/week/copy/:plan_id/:week_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;
    const { week_id: weekId } = params;
    const { woPlan, copyWeekId, newIds } = body;

    const { weeks } = woPlan;

    let copyWeek = weeks.find(x => x._id.toString() === copyWeekId);
    if (!copyWeek) {
      return res
        .status(404)
        .json(createErrorObject(["No week with this ID to copy"]));
    }

    const { days } = copyWeek;

    const newDays = [];

    for (let i = 0; i < days.length; i++) {
      const oldDay = days[i];
      const newDayIds = newIds[i];
      const { exercises: oldExercises } = oldDay;
      const { dayId: newDayId, exercises: newExercises } = newDayIds;
      const exercises = [];
      for (let i = 0; i < newExercises.length; i++) {
        const oldExercise = oldExercises[i];
        const newExerciseIds = newExercises[i];
        const { sets: oldSets, onModel, exercise } = oldExercise;
        const { exerId, setIds: newSetIds } = newExerciseIds;
        const newSets = [];
        for (let i = 0; i < newSetIds.length; i++) {
          const oldSet = oldSets[i];
          const newSetId = newSetIds[i];
          const { reps, rpe } = oldSet;

          newSets.push({ rpe, reps, _id: newSetId });
        }
        exercises.push({ onModel, exercise, _id: exerId, sets: newSets });
      }
      newDays.push({ _id: newDayId, exercises });
    }

    woPlan
      .updateOne(
        {
          $set: { [`weeks.$[w].days`]: newDays }
        },
        {
          arrayFilters: [{ "w._id": weekId }]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/week/:plan_id/:week_id
// @desc Repeat week
// @access Private
router.post(
  "/week/repeat/:plan_id/:week_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;
    const { week_id: weekId } = params;
    const { woPlan, newIds } = body;

    const { weeks } = woPlan;

    const copyWeekIndex = weeks.map(x => x._id.toString()).indexOf(weekId);
    const copyWeek = weeks[copyWeekIndex];
    if (!copyWeek) {
      return res
        .status(404)
        .json(createErrorObject(["No week with this ID to copy"]));
    }

    const { days } = copyWeek;

    const newWeeks = [];

    for (let i = 0; i < newIds.length; i++) {
      const newWeekIds = newIds[i];
      const { weekId, days: newDayIds } = newWeekIds;
      const newDays = [];

      for (let i = 0; i < days.length; i++) {
        const oldDay = days[i];
        const { exercises: oldExercises } = oldDay;
        const { dayId: newDayId, exercises: newExercises } = newDayIds[i];
        const exercises = [];
        for (let i = 0; i < newExercises.length; i++) {
          const oldExercise = oldExercises[i];
          const newExerciseIds = newExercises[i];
          const { sets: oldSets, onModel, exercise } = oldExercise;
          const { exerId, setIds: newSetIds } = newExerciseIds;
          const newSets = [];
          for (let i = 0; i < newSetIds.length; i++) {
            const oldSet = oldSets[i];
            const newSetId = newSetIds[i];
            const { rpe, reps } = oldSet;

            newSets.push({ rpe, reps, _id: newSetId });
          }
          exercises.push({ onModel, exercise, _id: exerId, sets: newSets });
        }
        newDays.push({ _id: newDayId, exercises });
      }
      newWeeks.push({ _id: weekId, days: newDays });
    }

    woPlan
      .updateOne({
        $push: {
          weeks: {
            $each: newWeeks,
            $position: copyWeekIndex + 1
          }
        }
      })
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route DELETE api/plan/week/:plan_id/:week_id
// @desc Delete week
// @access Private
router.delete(
  "/week/:plan_id/:week_id/",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId } = params;

    const { woPlan } = body;

    woPlan
      .updateOne({
        $pull: { weeks: { _id: weekId } }
      })
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// // @route POST api/plan/day/:plan_id/:week_id/:day_id
// // @desc Add muscle group
// // @access Private
// router.post(
//   "/day/:plan_id/:week_id/:day_id",
//   ensureSignedIn,
//   validateRequest,
//   validateWOPlan,
//   async (req, res, next) => {
//     const { body, params } = req;

//     const { week_id: weekId, day_id: dayId } = params;
//     const { woPlan, muscleGroup } = body;

//     woPlan
//       .updateOne(
//         { $push: { "weeks.$[w].days.$[d].muscleGroup": muscleGroup } },
//         {
//           arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }]
//         }
//       )
//       .then(reski => {
//         if (reski.nModified) {
//           res.json({ message: "success" });
//         } else {
//           res.status(500).json(createErrorObject(["Couldn't apply update"]));
//         }
//       })
//       .catch(next);
//   }
// );

// // @route DELETE api/plan/day/:plan_id/:week_id/:day_id
// // @desc Remove muscle group
// // @access Private
// router.delete(
//   "/day/:plan_id/:week_id/:day_id",
//   ensureSignedIn,
//   validateRequest,
//   validateWOPlan,
//   async (req, res, next) => {
//     const { body, params } = req;

//     const { week_id: weekId, day_id: dayId } = params;
//     const { woPlan, muscleGroup } = body;

//     woPlan
//       .updateOne(
//         { $pull: { "weeks.$[w].days.$[d].muscleGroup": muscleGroup } },
//         {
//           arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }]
//         }
//       )
//       .then(reski => {
//         if (reski.nModified) {
//           res.json({ message: "success", _id });
//         } else {
//           res.status(500).json(createErrorObject(["Couldn't apply update"]));
//         }
//       })
//       .catch(next);
//   }
// );

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id
// @desc Add exercise to workout plan
// @access Private
router.post(
  "/exercise/:plan_id/:week_id/:day_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId } = params;
    const { woPlan, exerId, setId, reps, exerciseId, custom, rpe } = body;

    const onModel = custom ? "userExercise" : "exercise";

    const newExer = {
      _id: exerId,
      exercise: exerciseId,
      onModel,
      sets: [
        {
          _id: setId,
          reps: reps || 0,
          rpe: rpe || 0
        }
      ]
    };

    woPlan
      .updateOne(
        { $push: { "weeks.$[w].days.$[d].exercises": newExer } },
        {
          arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route PATCH api/plan/exercise/reorder/:plan_id/:week_id/:day_id
// @desc  Reorder exercise
// @access Private
router.patch(
  "/exercise/reorder/:plan_id/:week_id/:day_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;
    const { week_id: weekId, day_id: dayId } = params;
    const { woPlan, to, from, exerId } = body;

    const { weeks } = woPlan;
    const week = weeks[weeks.map(x => x._id.toString()).indexOf(weekId)];
    if (!week) return next();

    const { days } = week;
    const day = days[days.map(x => x._id).indexOf(dayId)];
    if (!day) return next();

    const exercise = day.exercises[from];

    if (exercise._id.toString() !== exerId) {
      return res
        .status(404)
        .json(createErrorObject(["An error occured, please refresh the page"]));
    }

    day.exercises.splice(from, 1);
    day.exercises.splice(to, 0, exercise);

    woPlan
      .save()
      .then(() => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route DELETE api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id
// @desc Delete exercise
// @access Private
router.delete(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const {
      plan_id: planId,
      week_id: weekId,
      day_id: dayId,
      exercise_id: exerciseId
    } = params;

    const { woPlan } = body;

    woPlan
      .updateOne(
        {
          $pull: {
            "weeks.$[w].days.$[d].exercises": {
              _id: exerciseId
            }
          }
        },
        {
          arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id
// @desc Add set
// @access Private
router.post(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,

  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId, exercise_id: exerciseId } = params;

    const { rpe, reps, setId, woPlan } = body;

    const newSet = {
      reps: reps || 0,
      _id: setId,
      rpe: rpe || 0
    };

    woPlan
      .updateOne(
        {
          $push: {
            ["weeks.$[w].days.$[d].exercises.$[e].sets"]: newSet
          }
        },
        {
          arrayFilters: [
            { "w._id": weekId },
            { "d._id": dayId },
            { "e._id": exerciseId }
          ]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id
// @desc Edit set
// @access Private
router.post(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;
    const {
      week_id: weekId,
      day_id: dayId,
      exercise_id: exerciseId,
      set_id: setId
    } = params;

    const { reps, rpe, woPlan } = body;

    let update = {};
    if (reps) {
      update["weeks.$[w].days.$[d].exercises.$[e].sets.$[s].reps"] = reps;
    }
    if (rpe) {
      update["weeks.$[w].days.$[d].exercises.$[e].sets.$[s].rpe"] = rpe;
    }

    woPlan
      .updateOne(
        {
          $set: update
        },
        {
          arrayFilters: [
            { "w._id": weekId },
            { "d._id": dayId },
            { "e._id": exerciseId },
            { "s._id": setId }
          ]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id
// @desc Delete set
// @access Private
router.delete(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,

  async (req, res, next) => {
    const { body, params } = req;

    const {
      week_id: weekId,
      day_id: dayId,
      exercise_id: exerciseId,
      set_id: setId
    } = params;

    const { woPlan } = body;

    woPlan
      .updateOne(
        {
          $pull: {
            "weeks.$[w].days.$[d].exercises.$[e].sets": { _id: setId }
          }
        },
        {
          arrayFilters: [
            { "w._id": weekId },
            { "d._id": dayId },
            { "e._id": exerciseId }
          ]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

module.exports = router;
