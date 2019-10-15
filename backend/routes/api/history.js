const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

// TODO: Weights

// Models
const WOPlan = require("../../models/WOPlan");
const History = require("../../models/History");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const validateWOPlan = require("../../middlewares/validateWOPlan");
const validateHistory = require("../../middlewares/validateHistory");

const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

function formatHistoryDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  return year * 10000 + month * 100 + day;
}

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
    const { unit = "kg", startDate } = body;
    const { plan_id: planId } = params;

    let history = await History.findOne({ user: userId });
    let woPlan = await WOPlan.findById(planId);

    let { days } = history;

    const { weeks } = woPlan;

    let newDays = [];

    let date = new Date(startDate);

    weeks.forEach(week =>
      week.days.forEach(day => {
        const { restDay, exercises: dayExercises } = day;
        if (restDay || !dayExercises.length) {
          date.setDate(myDate.getDate() + 1);
          return;
        }

        let exercises = [];
        dayExercises.forEach(exercise => {
          const { exercise: exerciseId, sets, reps } = exercise;
          let setski = [];
          for (let i = 0; i < sets; i++) {
            setski.push({ reps });
          }

          exercises.push({ exercise: exerciseId, sets: setski, reps, unit });
        });

        const formattedDate = formatHistoryDate(date);
        newDays.push({
          exercises,
          date: formattedDate,
          woPlan: planId
        });

        date.setDate(myDate.getDate() + 1);
      })
    );

    let formattedStartDate = formatHistoryDate(startDate);

    if (days[days.length - 1].date >= formattedStartDate) {
      let dates = days.map(x => x.date);
      for (let i = 0; i < dates.length; i++) {
        if (date >= formattedCurrentDate) {
          days = days.slice(0, i);
          return;
        }
      }
    }

    days.push(newDays);

    history
      .updateOne({
        $set: {
          days
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
  const { dayId, exerId, date, exerciseId, notes, setId } = body;

  const history = await History.findOne({ user: userId });

  const { days } = history;

  let dateObject = new Date(date);

  let formattedDate = formatHistoryDate(dateObject);

  let dates = days.map(x => x.date);

  let insertIndex;

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
            _id: setId
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

  if (insertIndex) {
    update.$position = insertIndex;
  }

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

    const { history, exerId, exerciseId, setId } = body;

    const newExercise = {
      _id: exerId,
      exercise: exerciseId,
      sets: [
        {
          _id: setId
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

    const { history, setId } = body;

    const newSet = {
      _id: setId
    };

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

    const { reps, unit, weight, history } = body;
    const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;

    let patch;

    let field;

    if (reps) {
      patch = reps;
      field = "reps";
    } else if (weight) {
      patch = weight;
      field = "weight";
    } else if (unit) {
      patch = unit;
      field = "unit";
    }

    history
      .updateOne(
        {
          $set: {
            [`days.$[d].exercises.$[e].sets.$[s].${field}`]: patch
          }
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
