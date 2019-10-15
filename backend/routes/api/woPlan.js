const express = require("express");
const router = express.Router();
const { Types } = require("mongoose");

// Model
const WOPlan = require("../../models/WOPlan");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const validateWOPlan = require("../../middlewares/validateWOPlan");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

function createDays() {
  let days = [];
  let dayIdArray = [];

  for (let i = 0; i < 7; i++) {
    const _id = Types.ObjectId();
    dayIdArray.push(_id);
    days.push({ restDay: false, _id });
  }
  return { days, dayIdArray };
}

function createWeek() {
  const _id = Types.ObjectId();
  const { days, dayIdArray } = createDays();
  return { _id, days, dayIdArray };
}

// TODOS:
// Error handling, scaling,  validation

// @route GET api/plan
// @desc Get current users workout plans
// @access Private
router.get("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  WOPlan.find({ user: userId })
    .populate("user")
    .then(woPlans => res.json(woPlans));
});

// @route GET api/plan/:plan_id
// @desc Get workout plan by id
// @access Private
// TODO: Extend to allow users who bought access/everyone if author wants
router.get(
  "/:plan_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res) => {
    //  const { woPlan } = body;
    const { plan_id } = req.params;
    const woPlan = await WOPlan.findById(plan_id).populate(
      "weeks.days.exercises.exercise user"
    );

    res.json(woPlan);
  }
);

// @route POST api/plan
// @desc Create workout plan
// @access Private
router.post("/", ensureSignedIn, validateRequest, async (req, res, next) => {
  const { body, session } = req;

  const _id = Types.ObjectId();

  const newWOPlan = new WOPlan({
    _id,
    user: session.userId,
    ...body
  });

  newWOPlan
    .save()
    .then(() => res.json({ _id, message: "success" }))
    .catch(next);
});

// @route POST api/plan/:plan_id
// @desc Edit workout plan
// @access Private
// Validation. How to check optional fields in joi?
router.post(
  "/:plan_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body } = req;

    const { name, description, categories, woPlan } = body;

    let field;
    let patch;

    if (name) {
      field = "name";
      patch = name;
    } else if (description) {
      field = "description";
      patch = description;
    } else if (categories) {
      field = "categories";
      patch = categories;
    }

    woPlan
      .updateOne({
        $set: { [`${field}`]: patch }
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

// @route DELETE api/plan/:plan_id
// @desc Delete workout plan
// @access Private

// TODO: Ensure id is objectId
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

    let { woPlan, numberOfWeeks } = body;

    let weekArray = [];

    numberOfWeeks = numberOfWeeks || 1;

    let newWeeks = [];

    for (let i = 0; i < numberOfWeeks; i++) {
      const { _id, days, dayIdArray } = createWeek();
      weekArray.push({ _id, dayIdArray });
      newWeeks.push({
        _id,
        days
      });
    }

    woPlan
      .updateOne({
        $push: { weeks: { $each: newWeeks } }
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
// @desc Edit week
// @access Private
// TODO: On copy change day id's?`
router.post(
  "/week/:plan_id/:week_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId } = params;

    const { repeat, woPlan, copyWeekId } = body;

    const { weeks } = woPlan;

    let field;
    let patch;

    if (repeat) {
      patch = repeat;
      field = "repeat";
    } else if (copyWeekId) {
      let copyWeek = weeks.find(x => x._id.toString() === copyWeekId);
      if (!copyWeek) {
        return res
          .status(404)
          .json(createErrorObject(["No week with this ID to copy"]));
      }

      patch = copyWeek.days;
      field = "days";
    }

    woPlan
      .updateOne(
        {
          $set: { [`weeks.$[w].${field}`]: patch }
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

// @route POST api/plan/day/:plan_id/:week_id/:day_id
// @desc Add muscle group
// @access Private
router.post(
  "/day/:plan_id/:week_id/:day_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId } = params;
    const { woPlan, muscleGroup } = body;

    woPlan
      .updateOne(
        { $push: { "weeks.$[w].days.$[d].muscleGroup": muscleGroup } },
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

// @route DELETE api/plan/day/:plan_id/:week_id/:day_id
// @desc Remove muscle group
// @access Private
router.delete(
  "/day/:plan_id/:week_id/:day_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId } = params;
    const { woPlan, muscleGroup } = body;

    woPlan
      .updateOne(
        { $pull: { "weeks.$[w].days.$[d].muscleGroup": muscleGroup } },
        {
          arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }]
        }
      )
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success", _id });
        } else {
          res.status(500).json(createErrorObject(["Couldn't apply update"]));
        }
      })
      .catch(next);
  }
);

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id
// @desc Add exercise to workout plan
// @access Private

// TODO: Better way to see if update failed?
router.post(
  "/exercise/:plan_id/:week_id/:day_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,
  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId } = params;
    const { woPlan } = body;

    // const _id = Types.ObjectId();

    woPlan
      .updateOne(
        { $push: { "weeks.$[w].days.$[d].exercises": { ...body } } },
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
// @desc Edit exercise sets/reps/rest
// @access Private
router.post(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateWOPlan,

  async (req, res, next) => {
    const { body, params } = req;

    const { week_id: weekId, day_id: dayId, exercise_id: exerciseId } = params;

    const { sets, reps, rest, woPlan } = body;

    let update = {};

    if (sets || sets === 0) {
      update["weeks.$[w].days.$[d].exercises.$[e].sets"] = sets;
    }

    if (reps || reps === 0) {
      update["weeks.$[w].days.$[d].exercises.$[e].reps"] = reps;
    }

    woPlan
      .updateOne(
        {
          $set: {
            ...update
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

module.exports = router;
