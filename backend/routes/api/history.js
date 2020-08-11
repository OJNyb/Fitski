const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");
const { ObjectId } = Types;

const {
  formatHistoryDate,
  reverseHistoryDate,
} = require("../../utils/formatHistoryDate");

// Models
const User = require("../../models/User");
const WOPlan = require("../../models/WOPlan");
const History = require("../../models/History");
const PlanAccess = require("../../models/PlanAccess");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const validateWOPlan = require("../../middlewares/validateWOPlan");
const validateHistory = require("../../middlewares/validateHistory");

const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

// @route GET api/history
// @desc Get current users history
// @access Private
router.get("/", ensureSignedIn, (req, res, next) => {
  const { session } = req;
  const { userId } = session;

  History.findOne({ user: userId })
    .populate({
      path: "days.exercises.exercise",
      populate: { path: "muscleGroup" },
    })
    .then((history) => {
      res.json(history);
    })
    .catch(next);
});

// @route POST api/history/activate/:plan_id
// @desc Activate workout plan
// @access Private
router.post(
  "/activate/:plan_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, params, session } = req;

    const { userId } = session;
    const { startDate } = body;
    const { plan_id: planId } = params;

    let history = await History.findOne({ user: userId });
    let woPlan = await WOPlan.findById(planId);
    if (!woPlan) {
      return res
        .status(404)
        .json(createErrorObject(["No workout plan with this ID"]));
    }

    const { user, weeks } = woPlan;

    if (user.toString() !== userId) {
      let planAccess = await PlanAccess.findOne({ woPlan: planId });

      let userIndex = planAccess.whitelist.map((x) => x.user).indexOf(userId);

      if (userIndex === -1) {
        return res
          .status(403)
          .json(createErrorObject(["You do not have access to this plan"]));
      }
    }

    let { days } = history;

    let newDays = [];

    let date = new Date(startDate);

    if (weeks.length === 0) {
      return res.status(200).json({ message: "success" });
    }

    weeks.forEach((week) =>
      week.days.forEach((day) => {
        const { exercises: dayExercises } = day;
        if (!dayExercises.length) {
          date.setDate(date.getDate() + 1);
          return;
        }

        let exercises = [];
        dayExercises.forEach((exercise) => {
          const { exercise: exerciseId, sets, onModel } = exercise;
          let setski = [];
          for (let i = 0; i < sets.length; i++) {
            const { reps, rpe } = sets[i];
            let setId = new ObjectId();
            setski.push({ _id: setId, reps, rpe, weight: 0 });
          }

          let exerId = new ObjectId();
          exercises.push({
            _id: exerId,
            exercise: exerciseId,
            sets: setski,
            onModel,
          });
        });

        let dayskiId = new ObjectId();

        const formattedDate = formatHistoryDate(date);
        newDays.push({
          exercises,
          _id: dayskiId,
          woPlan: planId,
          date: formattedDate,
        });

        date.setDate(date.getDate() + 1);
      })
    );

    if (newDays.length === 0) {
      return res.status(200).json({ message: "success" });
    }

    const formattedStartDate = formatHistoryDate(new Date(startDate));
    const endDate = reverseHistoryDate(newDays[newDays.length - 1].date);

    if (days.length && days[days.length - 1].date >= formattedStartDate) {
      let dates = days.map((x) => x.date);
      for (let i = 0; i < dates.length; i++) {
        if (dates[i] >= formattedStartDate) {
          days = days.slice(0, i);
          break;
        }
      }
    }

    newDays.forEach((x) => days.push(x));

    // push each
    //
    history
      .updateOne({
        $set: {
          days: days,
        },
      })
      .then(() => {
        User.findByIdAndUpdate(userId, {
          $set: {
            activeWOPlan: {
              woPlan: planId,
              startDate,
              endDate,
            },
          },
        })
          .then(() => {
            res.json({ message: "success" });
          })
          .catch(next);
      })
      .catch(next);
  }
);

// @route POST api/history/deactivate/:plan_id
// @desc Deactivate workout plan
// @access Private
router.post(
  "/deactivate/:plan_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { params, session } = req;
    const { userId } = session;
    const { plan_id: planId } = params;

    const history = await History.findOne({ user: userId });
    const date = new Date();
    const formattedDate = formatHistoryDate(date);
    const yestarday = new Date().setDate(date.getDate() - 1);

    const { days } = history;
    let dateFilter = {
      $gte: formattedDate,
    };
    let currentDayIndex = days.map((x) => x.date).indexOf(formattedDate);
    if (currentDayIndex > -1) {
      let x = days[currentDayIndex].exercises
        .map((x) => x.sets)
        .map((x) => x.map((x) => x.weight))
        .reduce((acc, curr) => acc.concat(curr), [])
        .reduce((acc, curr) => (acc += curr), 0);

      if (x > 0) {
        dateFilter = {
          $gt: formattedDate,
        };
      }
    }

    history
      .updateOne({
        $pull: {
          days: { date: dateFilter, woPlan: planId },
        },
      })
      .then(() => {
        User.findByIdAndUpdate(userId, {
          $set: {
            activeWOPlan: {
              woPlan: planId,
              endDate: yestarday,
            },
          },
        })
          .then(() => {
            res.json({ message: "success" });
          })
          .catch(next);
      })
      .catch(next);
  }
);

// @route POST api/history
// @desc  Add exercise/note to new day
// @access Private
router.post("/", ensureSignedIn, validateRequest, async (req, res, next) => {
  const { body, session } = req;
  const { userId } = session;
  const {
    dayId,
    exerId,
    date,
    exerciseId,
    note,
    setId,
    reps,
    rpe,
    weight,
    custom,
  } = body;

  const history = await History.findOne({ user: userId });

  const { days } = history;

  let dateObject = new Date(date);

  let formattedDate = formatHistoryDate(dateObject);

  let dates = days.map((x) => x.date);

  let insertIndex = -1;

  for (let i = dates.length - 1; i >= 0; i--) {
    if (dates[i] === formattedDate) {
      return res.status(400).json(createErrorObject(["Date already exists"]));
    }
    if (dates[i] > formattedDate) {
      insertIndex = i;
    }
  }

  let newDay = { _id: dayId, date: formattedDate };

  if (exerciseId) {
    const onModel = custom ? "userExercise" : "exercise";
    newDay.exercises = [
      {
        _id: exerId,
        exercise: exerciseId,
        onModel,
        sets: [
          {
            _id: setId,
            weight: weight ? weight : 0,
            reps: reps ? reps : 0,
            rpe: rpe ? rpe : 0,
          },
        ],
      },
    ];
  } else {
    newDay.note = note;
  }

  let update = {
    $each: [newDay],
  };

  if (insertIndex !== -1) {
    update.$position = insertIndex;
  }

  history
    .updateOne({ $push: { days: update } })
    .then((reski) => {
      if (reski.nModified) {
        res.json({ message: "success" });
      } else {
        res.status(404).json(createErrorObject(["Couldn't apply update"]));
      }
    })
    .catch(next);
});

// @route POST api/history
// @desc  Edit day
// @access Private
router.patch("/", ensureSignedIn, validateRequest, async (req, res, next) => {
  const { body, session } = req;
  const { userId } = session;
  const { dayId, note } = body;

  const history = await History.findOne({ user: userId });
  const { days } = history;
  const dayIndex = days.map((x) => x._id.toString()).indexOf(dayId);

  if (dayIndex === -1) {
    return res.status(404).json(createErrorObject["No day with this ID"]);
  }

  days[dayIndex].note = note;

  history
    .save()
    .then(() => {
      res.json({ message: "success" });
    })
    .catch(next);
});

// @route PATCH api/history/reorder/:day_id
// @desc  Reorder exercise
// @access Private
router.patch(
  "/reorder/:day_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, params, session } = req;
    const { userId } = session;
    const { day_id: dayId } = params;
    const { to, from, exerId } = body;

    const history = await History.findOne({ user: userId });

    const { days } = history;
    const dayIndex = days.map((x) => x._id).indexOf(dayId);
    if (dayIndex !== 0 && !dayIndex) return next();
    const day = days[dayIndex];

    const exercise = day.exercises[from];

    if (exercise._id.toString() !== exerId) {
      return res
        .status(404)
        .json(createErrorObject(["An error occured, please refresh the page"]));
    }

    day.exercises.splice(from, 1);
    day.exercises.splice(to, 0, exercise);

    history
      .save()
      .then(() => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route DELETE api/history/:day_id
// @desc  Delete day
// @access Private
// TOD
router.delete(
  "/:day_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;

    const { day_id: dayId } = params;

    const { history } = body;

    history
      .updateOne({ $pull: { days: { _id: dayId } } })
      .then((reski) => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/history/exercise/:day_id
// @desc Add exercise
// @access Private
router.post(
  "/exercise/:day_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  (req, res, next) => {
    const { body, params } = req;
    const { day_id: dayId } = params;

    const {
      history,
      exerId,
      exerciseId,
      setId,
      reps,
      rpe,
      weight,
      custom,
    } = body;

    const onModel = custom ? "userExercise" : "exercise";

    const newExercise = {
      _id: exerId,
      exercise: exerciseId,
      onModel,
      sets: [
        {
          _id: setId,
          reps: reps ? reps : 0,
          weight: weight ? weight : 0,
          rpe: rpe ? rpe : 0,
        },
      ],
    };

    history
      .updateOne(
        { $push: { "days.$[d].exercises": newExercise } },
        {
          arrayFilters: [{ "d._id": dayId }],
        }
      )
      .then((reski) => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route DELETE api/history/exercise/:day_id/:exercise_id
// @desc Delete exercise
// @access Private
router.delete(
  "/exercise/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;
    const { history } = body;
    const { day_id: dayId, exercise_id: exerciseId } = params;

    history
      .updateOne(
        {
          $pull: {
            "days.$[d].exercises": {
              _id: exerciseId,
            },
          },
        },
        {
          arrayFilters: [{ "d._id": dayId }],
        }
      )
      .then(() => {
        return res.json({ message: "success" });
      })

      .catch(next);
  }
);

// @route DELETE api/history/exercise/:day_id/
// @desc Delete exercises
// @access Private
router.delete(
  "/exercise/:day_id/",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;
    const { history, exerciseIds } = body;
    const { day_id: dayId } = params;

    history
      .updateOne(
        {
          $pull: {
            "days.$[d].exercises": {
              _id: { $in: exerciseIds },
            },
          },
        },
        {
          arrayFilters: [{ "d._id": dayId }],
          multi: true,
        }
      )
      .then(() => {
        return res.json({ message: "success" });
      })

      .catch(next);
  }
);

// @route POST api/history/exercise/:day_id/:exercise_id
// @desc Add set
// @access Private
router.post(
  "/exercise/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  (req, res, next) => {
    const { body, params } = req;
    const { day_id: dayId, exercise_id: exerciseId } = params;

    const { setId, reps, rpe, weight, history } = body;

    const newSet = {
      _id: setId,
    };

    newSet.weight = weight ? weight : 0;
    newSet.reps = reps ? reps : 0;
    newSet.rpe = rpe ? rpe : 0;

    history
      .updateOne(
        { $push: { "days.$[d].exercises.$[e].sets": newSet } },
        {
          arrayFilters: [{ "d._id": dayId }, { "e._id": exerciseId }],
        }
      )
      .then((reski) => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/history/exercise/:day_id/:exercise_id/:set_id
// @desc Edit set
// @access Private
router.post(
  "/exercise/:day_id/:exercise_id/:set_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;

    const { rpe, reps, weight, history } = body;
    const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;

    let update = {};
    const base = "days.$[d].exercises.$[e].sets.$[s].";
    if (weight || weight === 0) {
      update[`${base}weight`] = weight;
    }
    if (reps || reps === 0) {
      update[`${base}reps`] = reps;
    }
    if (rpe || rpe === 0) {
      update[`${base}rpe`] = rpe;
    }

    history
      .updateOne(
        {
          $set: update,
        },
        {
          arrayFilters: [
            { "d._id": dayId },
            { "e._id": exerciseId },
            { "s._id": setId },
          ],
        }
      )
      .then((reski) => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route DELETE api/history/exercise/:day_id/:exercise_id/:set_id
// @desc Delete set
// @access Private
router.delete(
  "/exercise/:day_id/:exercise_id/:set_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;
    const { history } = body;
    const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;

    history
      .updateOne(
        {
          $pull: {
            "days.$[d].exercises.$[e].sets": {
              _id: setId,
            },
          },
        },
        {
          arrayFilters: [{ "d._id": dayId }, { "e._id": exerciseId }],
        }
      )
      .then(() => {
        return res.json({ message: "success" });
      })

      .catch(next);
  }
);

// @route POST api/history
// @desc  Copy previous day
// @access Private
router.post(
  "/copy",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { dayToCopyId, newDayId, newIds, formattedDate } = body;

    const history = await History.findOne({ user: userId });
    const { days } = history;
    let dates = days.map((x) => x.date);
    let insertIndex = -1;

    for (let i = dates.length - 1; i >= 0; i--) {
      if (dates[i] === formattedDate) {
        return res.status(400).json(createErrorObject(["Date already exists"]));
      }
      if (dates[i] > formattedDate) {
        insertIndex = i;
      }
    }

    const dayToCopy = days[days.map((x) => x._id).indexOf(dayToCopyId)];

    const { exercises } = dayToCopy;

    const newExercises = [];

    for (let i = 0; i < exercises.length; i++) {
      const { sets } = exercises[i];
      const ids = newIds[i];
      const { exerId, setIds } = ids;
      const newSets = [];
      for (let i = 0; i < sets.length; i++) {
        newSets.push({ ...sets[i], _id: setIds[i] });
      }
      newExercises.push({
        ...exercises[i],
        _id: exerId,
        sets: newSets,
      });
    }

    const newDay = { _id: newDayId, date: formattedDate, exercises };

    const update = {
      $each: [newDay],
    };

    if (insertIndex !== -1) {
      update.$position = insertIndex;
    }

    history
      .updateOne({ $push: { days: update } })
      .then((reski) => {
        if (reski.nModified) {
          res.json({ message: "success" });
        } else {
          res.status(404).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

module.exports = router;
