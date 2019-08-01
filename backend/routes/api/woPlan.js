const express = require("express");
const router = express.Router();
const Joi = require("joi");

const objectId = require("../../schemas/utils");

const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

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

function validateWOPlan(userId, weekId, dayId, woPlan) {
  let errors = {};

  const { user, weeks } = woPlan;

  if (user.toString() !== userId) {
    errors.notauthorized =
      "You do not have permission to make changes to this workout plan";
    return errors;
  }

  const weekIndex = weeks.map(x => x.id).indexOf(weekId);
  if (weekIndex === -1) {
    errors.noweek = "No day with this ID in workout plan";
    return errors;
  }

  const { days } = weeks[weekIndex];
  const dayIndex = days.map(x => x.id).indexOf(dayId);
  if (dayIndex === -1) {
    errors.noday = "No day with this ID in workout plan";
    return errors;
  }

  const weekIndex = weeks.map(x => x.id).indexOf(weekId);
  if (weekIndex === -1) {
    errors.noweek = "No day with this ID in workout plan";
    return errors;
  }

  const { days } = weeks[weekIndex];
  const dayIndex = days.map(x => x.id).indexOf(dayId);
  if (dayIndex === -1) {
    errors.noday = "No day with this ID in workout plan";
    return errors;
  }

  return { weekIndex, dayIndex };
}

// @route GET api/plan
// @desc Get current users workout plans
// @access Private
router.get("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  WOPlan.find({ user: userId }).then(woPlans => res.json(woPlans));
});

// @route GET api/plan/:id
// @desc Get workout plan by id
// @access Private
// TODO: Extend to allow users who bought access/everyone if author wants
router.get("/plan/:id", ensureSignedIn, (req, res) => {
  const { params, session } = req;
  const { id } = params;
  const { userId } = session;

  WOPlan.findById(id)
    .populate("weeks.days.exercises.exercise")
    .then(woPlan => {
      if (woPlan.user.toString() !== userId) {
        errors.notauthorized =
          "You do not have permission to view this workout plan.";
        return res.status(403).json(errors);
      }
      res.json(woPlan);
    });
});

// @route POST api/plan
// @desc Create workout plan
// @access Private
router.post("/", ensureSignedIn, validateRequest, async (req, res) => {
  const { body, session } = req;

  const { name, description, categories } = body;

  const newWOPlan = new WOPlan({
    user: session.userId,
    name,
    categories,
    description
  });

  newWOPlan.save().then(woPlan => res.json(woPlan));
});

// @route POST api/plan/:id
// @desc Edit workout plan
// @access Private
// Validation. How to check optional fields in joi?
router.post("/:id", ensureSignedIn, validateRequest, async (req, res) => {
  const { body, params } = req;

  const { id: planId } = params;
  const { name, description, categories } = body;

  const woPlan = await WOPlan.findById(planId);

  // check if owner

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

  WOPlan.findByIdAndUpdate(planId, {
    $set: { [`${field}`]: patch }
  })
    .then(() => res.json({ msg: "Success" }))
    .catch(err => console.log(err));
});

// @route DELETE api/plan/:id
// @desc Delete workout plan
// @access Private
router.delete("/:id", ensureSignedIn, async (req, res) => {
  const { params, session } = req;

  const { id } = params;

  WOPlan.findById(id)
    .then(woPlan => {
      if (!woPlan) {
        errors.nowoplan = "No workout plan with this ID";
        return res.status(404).json(errors);
      }

      const { user } = woPlan;
      const { userId } = session;

      if (user.toString() !== userId) {
        errors.notauthorized =
          "You do not have permission to make changes to this workout plan";
        return res.status(403).json(errors);
      }

      WOPlan.findByIdAndDelete(id)
        .then(() => res.json({ msg: "Success" }))
        .catch(() =>
          res.status(500).json({ servererror: "Internal server error" })
        );
    })
    .catch(err => res.status(500).json(err));
});

// @route POST api/plan/week/:id
// @desc Add week
// @access Private
router.post("/week/:id/", ensureSignedIn, validateRequest, async (req, res) => {
  const { body, params, session } = req;

  const { id: planId } = params;

  WOPlan.findById(planId).then(woPlan => {
    if (!woPlan) {
      return res.status(404).json({ noplan: "No workout plan with this ID" });
    }

    const { user, weeks } = woPlan;
    const { userId } = session;

    if (user.toString() !== userId) {
      return res.status(403).json({
        notauthorized: "You do not have permission to make changes to this plan"
      });
    }

    const { weekNumber } = body;

    const weekNumbers = weeks.map(x => x.week);

    if (weekNumber in weekNumbers) {
      return res.status(400).json({
        duplicate: "This week already exists"
      });
    }

    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push({ restDay: false });
    }
    const newWeek = { week: weekNumber, days };

    WOPlan.findOneAndUpdate(
      {
        _id: id
      },
      {
        $push: { weeks: newWeek }
      },
      {
        new: true,
        lean: true
      }
    ).then(woPlan => {
      let id = woPlan.weeks.find(x => x.week === weekNumber)._id;
      res.json({ msg: "Success", id });
    });
  });
});

// @route DELETE api/plan/:plan_id/:week_id
// @desc Delete week
// @access Private
router.delete(
  "/week/:plan_id/:week_id/",
  validateRequest,
  ensureSignedIn,
  async (req, res) => {
    const { params, session } = req;

    const { plan_id: planId, week_id: weekId } = params;

    WOPlan.findById(planId).then(woPlan => {
      if (!woPlan) {
        return res.status(404).json({ noplan: "No workout plan with this ID" });
      }

      const { user } = woPlan;
      const { userId } = session;

      if (user.toString() !== userId) {
        return res.status(403).json({
          notauthorized:
            "You do not have permission to make changes to this plan"
        });
      }

      WOPlan.findOneAndUpdate(
        {
          _id: planId
        },
        {
          $pull: { weeks: { _id: weekId } }
        },
        {
          new: true,
          lean: true
        }
      ).then(() => {
        res.json({ msg: "Success" });
      });
    });
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
  async (req, res) => {
    const { body, params, session } = req;

    const { plan_id: planId, week_id: weekId, day_id: dayId } = params;

    WOPlan.findById(planId)
      .then(woPlan => {
        if (!woPlan) {
          errors.nowoplan = "No workout plan with this ID";
          return res.status(404).json(errors);
        }

        // const { user, weeks } = woPlan;
        const { userId } = session;

        const { errors, weekIndex, dayIndex } = validateWOPlan(
          userId,
          weekId,
          dayId,
          woPlan
        );

        if (errors) {
          if (errors.notauthorized) {
            return res.status(403).json(errors);
          } else {
            return res.status(404).json(errors);
          }
        }

        const { exercise, sets, reps, rest } = body;
        let newExercise = {
          exercise,
          sets,
          reps,
          rest
        };

        WOPlan.findOneAndUpdate(
          { _id: planId },
          { $push: { "weeks.$[w].days.$[d].exercises": newExercise } },
          {
            arrayFilters: [{ "w._id": weekId }, { "d._id": dayId }],
            new: true,
            lean: true
          }
        )

          .then(woPlan => {
            const { _id: id } = woPlan.weeks[weekIndex].days[
              dayIndex
            ].exercises[exercises.length - 1];

            return res.json({ msg: "Success", id });
          })
          .catch(err => console.log(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id
// @desc Edit exercise sets/reps/rest
// @access Private
router.post(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  async (req, res) => {
    const { body, params, session } = req;

    const {
      plan_id: planId,
      week_id: weekId,
      day_id: dayId,
      exercise_id: exerciseId
    } = params;

    WOPlan.findById(planId)
      .then(woPlan => {
        if (!woPlan) {
          errors.nowoplan = "No workout plan with this ID";
          return res.status(404).json(errors);
        }

        // const { user, weeks } = woPlan;
        const { userId } = session;

        const { errors } = validateWOPlan(userId, weekId, dayId, woPlan);

        if (errors) {
          if (errors.notauthorized) {
            return res.status(403).json(errors);
          } else {
            return res.status(404).json(errors);
          }
        }

        const { sets, reps, rest } = body;

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

        WOPlan.findOneAndUpdate(
          { _id: planId },
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

          .then(() => {
            return res.json({ msg: "Success" });
          })
          .catch(err => console.log(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route DELETE api/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id
// @desc Delete exercise
// @access Private
router.delete(
  "/exercise/:plan_id/:week_id/:day_id/:exercise_id",
  ensureSignedIn,
  validateRequest,
  async (req, res) => {
    const { params, session } = req;

    const {
      plan_id: planId,
      week_id: weekId,
      day_id: dayId,
      exercise_id: exerciseId
    } = params;

    WOPlan.findById(planId)
      .then(woPlan => {
        if (!woPlan) {
          errors.nowoplan = "No workout plan with this ID";
          return res.status(404).json(errors);
        }

        // const { user, weeks } = woPlan;
        const { userId } = session;

        const { errors } = validateWOPlan(userId, weekId, dayId, woPlan);

        if (errors) {
          if (errors.notauthorized) {
            return res.status(403).json(errors);
          } else {
            return res.status(404).json(errors);
          }
        }

        WOPlan.findOneAndUpdate(
          { _id: planId },
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

          .then(() => {
            return res.json({ msg: "Success" });
          })
          .catch(err => console.log(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route POST api/plan/activate
// @desc Activate a workout plan
// @access Private
router.post(
  "/plan/activate",
  ensureSignedIn,
  validateRequest,
  async (req, res) => {
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
      .then(() => res.json({ msg: "Success" }))
      .catch(err => console.log(err));
  }
);

module.exports = router;
