const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");
const { ObjectId } = Types;

const { formatHistoryDate } = require("../../utils/formatHistoryDate");

// Models
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

// TODO: Validatation, stadardize dates?

// @route GET api/history
// @desc Get current users history
// @access Private
router.get("/", ensureSignedIn, (req, res) => {
  const { session } = req;
  const { userId } = session;

  History.findOne({ user: userId })
    .populate("days.exercises.exercise")
    .then(history => res.json(history));
});

// @route POST api/history/activate/:plan_id
// @desc Activate workout plan
// @access Private

// If !history, create one, if !server error
// Ensure no duplicate days on update
// activate plan 1x
router.post(
  "/activate/:plan_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params, session } = req;

    const { userId } = session;
    const { startDate } = body;
    const { plan_id: planId } = params;

    let history = await History.findOne({ user: userId });
    let woPlan = await WOPlan.findById(planId);

    const { user, weeks } = woPlan;

    if (user.toString() !== userId) {
      let planAccess = await PlanAccess.findOne({ woPlan: planId });

      let userIndex = planAccess.whitelist.map(x => x.user).indexOf(userId);

      if (userIndex === -1) {
        return res
          .status(403)
          .json(createErrorObject(["You do not have access to this plan"]));
      }
    }

    let { days } = history;

    let newDays = [];

    let date = new Date(startDate);

    weeks.forEach(week =>
      week.days.forEach(day => {
        const { restDay, exercises: dayExercises } = day;
        if (restDay || !dayExercises.length) {
          date.setDate(date.getDate() + 1);
          return;
        }

        let exercises = [];
        dayExercises.forEach(exercise => {
          const { exercise: exerciseId, sets, reps } = exercise;
          let setski = [];
          for (let i = 0; i < sets; i++) {
            let repId = new ObjectId();
            setski.push({ _id: repId, reps });
          }

          let exerId = new ObjectId();
          exercises.push({ _id: exerId, exercise: exerciseId, sets: setski });
        });

        let dayskiId = new ObjectId();

        const formattedDate = formatHistoryDate(date);
        newDays.push({
          exercises,
          _id: dayskiId,
          woPlan: planId,
          date: formattedDate
        });

        date.setDate(date.getDate() + 1);
      })
    );

    let formattedStartDate = formatHistoryDate(new Date(startDate));

    if (days[days.length - 1].date >= formattedStartDate) {
      let dates = days.map(x => x.date);
      for (let i = 0; i < dates.length; i++) {
        if (dates[i] >= formattedStartDate) {
          days = days.slice(0, i);
          break;
        }
      }
    }

    newDays.forEach(x => days.push(x));

    // push each
    //
    history
      .updateOne({
        $set: {
          days: days
        }
      })
      .then(() => res.json({ message: "success" }))
      .catch(next);
  }
);

// @route POST api/history
// @desc  Add exercise/notes to new day
// @access Private

// TODO: Validation, see if date is already there
router.post("/", ensureSignedIn, validateRequest, async (req, res, next) => {
  const { body, session } = req;
  const { userId } = session;
  const { dayId, exerId, date, exerciseId, notes, setId, reps, weight } = body;

  const history = await History.findOne({ user: userId });

  const { days } = history;

  let dateObject = new Date(date);

  let formattedDate = formatHistoryDate(dateObject);

  let dates = days.map(x => x.date);

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
    newDay.exercises = [
      {
        _id: exerId,
        exercise: exerciseId,
        sets: [
          {
            _id: setId,
            weight: weight ? weight : 0,
            reps: reps ? reps : 0
          }
        ]
      }
    ];
  } else {
    newDay.notes = notes;
  }

  let update = {
    $each: [newDay]
  };

  if (insertIndex !== -1) {
    update.$position = insertIndex;
  }

  console.log(update);

  history
    .updateOne({ $push: { days: update } })
    .then(reski => {
      if (reski.nModified) {
        res.json({ message: "success" });
      } else {
        res.status(404).json(createErrorObject(["Couldn't apply update"]));
      }
    })
    .catch(next);
});

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

// @route POST api/history/exercise/:day_id
// @desc Add exercise
// @access Private

// TODO: Better way to see if update failed?
router.post(
  "/exercise/:day_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  (req, res, next) => {
    const { body, params } = req;
    const { day_id: dayId } = params;

    const { history, exerId, exerciseId, setId, reps, weight } = body;

    const newExercise = {
      _id: exerId,
      exercise: exerciseId,
      sets: [
        {
          _id: setId,
          reps: reps ? reps : 0,
          weight: weight ? weight : 0
        }
      ]
    };

    history
      .updateOne(
        { $push: { "days.$[d].exercises": newExercise } },
        {
          arrayFilters: [{ "d._id": dayId }]
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
              _id: exerciseId
            }
          }
        },
        {
          arrayFilters: [{ "d._id": dayId }]
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

// TODO: Better way to see if update failed?
router.post(
  "/exercise/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  (req, res, next) => {
    const { body, params } = req;
    const { day_id: dayId, exercise_id: exerciseId } = params;

    const { setId, reps, weight, history } = body;

    const newSet = {
      _id: setId
    };

    newSet.weight = weight ? weight : 0;
    newSet.reps = reps ? reps : 0;

    console.log(newSet);

    history
      .updateOne(
        { $push: { "days.$[d].exercises.$[e].sets": newSet } },
        {
          arrayFilters: [{ "d._id": dayId }, { "e._id": exerciseId }]
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

// @route POST api/history/exercise/:day_id/:exercise_id/:set_id
// @desc Edit set
// @access Private

// TODO: Validation, replace dates if already in
router.post(
  "/exercise/:day_id/:exercise_id/:set_id",
  ensureSignedIn,
  validateRequest,
  validateHistory,
  async (req, res, next) => {
    const { body, params } = req;

    const { reps, weight, history } = body;
    const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;

    let patch;
    let patch2;

    let field;
    let field2;

    if (reps && weight) {
      patch = weight;
      field = "weight";
      patch2 = reps;
      field2 = "reps";
    } else if (weight) {
      patch = weight;
      field = "weight";
    } else if (reps) {
      patch = reps;
      field = "reps";
    }
    let newField = {
      [`days.$[d].exercises.$[e].sets.$[s].${field}`]: patch
    };

    if (patch2) {
      newField[`days.$[d].exercises.$[e].sets.$[s].${field2}`] = patch2;
    }

    history
      .updateOne(
        {
          $set: { ...newField }
        },
        {
          arrayFilters: [
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
              _id: setId
            }
          }
        },
        {
          arrayFilters: [{ "d._id": dayId }, { "e._id": exerciseId }]
        }
      )
      .then(() => {
        return res.json({ message: "success" });
      })

      .catch(next);
  }
);

module.exports = router;
