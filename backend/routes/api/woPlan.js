const express = require("express");
const router = express.Router();
const createErrorObject = require("../../utils/createErrorObject");
const { Types } = require("mongoose");

const objectId = require("../../schemas/utils");

const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const validateWOPlan = require("../../middlewares/validateWOPlan");

// TODOS:
// Error handling, scaling,  validation
// What validations can I do on mongoose?
// Week increment route + insert mid route??
// How to handle joi errors
// CATCH
// ObjectId has String as base, remove from places where I validate object??

const { ensureSignedIn } = require("../../middlewares/auth");

// Load workout plan model
const WOPlan = require("../../models/WOPlan");

// @route GET api/plan
// @desc Get current users workout plans
// @access Private
router.get("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  WOPlan.find({ user: userId }).then(woPlans => res.json(woPlans));
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
  (req, res) => {
    const { body } = req;
    const { woPlan } = body;

    woPlan.populate("weeks.days.exercises.exercise");

    res.json(woPlan);
  }
);

// @route POST api/plan
// @desc Create workout plan
// @access Private
router.post("/", ensureSignedIn, validateRequest, async (req, res) => {
  const { body, session } = req;

  const newWOPlan = new WOPlan({
    user: session.userId,
    ...body
  });

  newWOPlan.save().then(woPlan => res.json(woPlan));
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

    const { weekNumber, woPlan } = body;

    const { weeks } = woPlan;

    const weekNumbers = weeks.map(x => x.week);

    if (weekNumbers.indexOf(weekNumber) !== -1) {
      return res
        .status(400)
        .json(createErrorObject(["This week already exists"]));
    }

    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push({ restDay: false });
    }

    const _id = Types.ObjectId();

    const newWeek = { _id, week: weekNumber, days };

    woPlan
      .updateOne({
        $push: { weeks: newWeek }
      })
      .then(reski => {
        if (reski.nModified) {
          res.json({ message: "success", _id });
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
    const { params } = req;

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

    const _id = Types.ObjectId();

    woPlan
      .updateOne(
        { $push: { "weeks.$[w].days.$[d].exercises": { ...body, _id } } },
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

    let patch;

    let field;

    if (sets) {
      patch = sets;
      field = "sets";
    } else if (reps) {
      patch = reps;
      field = "reps";
    } else if (rest) {
      patch = rest;
      field = "sets";
    }

    woPlan
      .updateOne(
        {
          $set: {
            [`weeks.$[w].days.$[d].exercises.$[e].${field}`]: patch
          }
        },
        {
          arrayFilters: [
            { "w._id": weekId },
            { "d._id": dayId },
            { "e._id": exerciseId }
          ],
          new: true,
          lean: true
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
          arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }],
          new: true,
          lean: true
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

// @route POST api/plan/activate
// @desc Activate a workout plan
// @access Private
router.post(
  "/plan/activate",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;

    const { planId, startDate, endDate } = body;
    const { userId } = session;

    const activeWOPlan = {
      woPlan: planId,
      startDate,
      endDate
    };

    User.findOneAndUpdate(
      { _id: userId },
      { $set: { activeWOPlan } },
      {
        new: true,
        lean: true
      }
    )
      .then(() => res.json({ message: "success" }))
      .catch(err => next(err));
  }
);

module.exports = router;
