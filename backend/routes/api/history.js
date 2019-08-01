const express = require("express");
const router = express.Router();

const WOPlan = require("../../models/WOPlan");
const { ensureSignedIn } = require("../../middlewares/auth");

// TODO: Validatuion

// @route GET api/history
// @desc Get current users history
// @access Private
router.get("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  History.find({ user: userId }).then(history => res.json(history));
});

// @route POST api/history
// @desc Activate workout plan
// @access Private

// TODO: Validation, replace dates if already in, push array into array of objects?????
router.post("/activate", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  History.find({ user: userId }).then(async history => {
    const { planId, startDate } = req.body;
    let woPlan = await WOPlan.findById(planId);
    const { weeks } = woPlan;

    let newDays = [];

    weeks.forEach(week =>
      week.days.forEach(day => {
        if (day.restDay) {
          // date ++
          // return
        }

        let exercises = [];
        day.exercises.forEach(exercise => {
          const { exercise: exerciseId, sets, reps, rest } = exercise;

          exercises.push({ exercise: exerciseId, sets, reps, rest });
        });
        newDays.push({ exercises, date, woPlan: planId });

        // date ++
      })
    );

    History.findOneAndUpdate(
      { user: userId },
      { $push: { days: newDays } },
      { new: true, lean: true }
    ).then(() => res.json({ msg: "Success" }));
  });
});

// @route POST api/history
// @desc  Add exercise/notes to new day
// @access Private

// TODO: Validation, see if date is already there
router.post("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  History.find({ user: userId }).then(async history => {
    const { date, exercise, notes } = req.body;

    let newDate = { date };

    if (exercise) {
      newDate.exercises = [{ exercise }];
    } else if (notes) {
      newDate.notes = notes;
    } else {
      return res
        .status(404)
        .json({ nodata: "Must provide either exercise or note" });
    }

    History.findOneAndUpdate(
      { user: userId },
      { $push: { days: newDay } },
      { new: true, lean: true }
    ).then(() => res.json({ msg: "Success" }));
  });
});

// @route DELETE api/history
// @desc  Delete day
// @access Private

// TODO: Validation, see if date is already there
router.delete("/", ensureSignedIn, (req, res) => {
  const { userId } = req.session;
  History.find({ user: userId }).then(async history => {
    const { _id } = req.body;

    History.findOneAndUpdate(
      { user: userId },
      { $pull: { days: _id } },
      { new: true, lean: true }
    ).then(() => res.json({ msg: "Success" }));
  });
});

// @route POST api/plan/exercise/:plan_id/:week_id/:day_id
// @desc Add exercise
// @access Private

// TODO: Better way to see if update failed?
router.post("/exercise/:day_id", ensureSignedIn, (req, res) => {
  const { day_id: dayId } = req.params;
  const { userId } = req.session;

  History.find({ user: userId })
    .then(history => {
      const { exercise } = req.body;

      History.findOneAndUpdate(
        { _id: planId },
        { $push: { "days.$[d].exercises": { exercise } } },
        {
          arrayFilters: [{ "d._id": dayId }],
          new: true,
          lean: true
        }
      )

        .then(history => {
          // What if user updates thingy in meantime?
          const { _id: id } = history.days[dayIndex].exercises[
            exercises.length - 1
          ];

          return res.json({ msg: "Success", id });
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).json(err));
});

// @route POST api/history/exercise/:day_id/:exercise_id
// @desc Change weight/reps/sets
// @access Private

// TODO: Validation, replace dates if already in
router.post("/exercise/:day_id/:exercise_id", ensureSignedIn, (req, res) => {
  const { day_id: dayId, exercise_id: exerciseId } = req.params;

  const { userId } = req.session;
  History.find({ user: userId })
    .then(history => {
      const { sets, reps, rest } = req.body;

      let patch;

      let type;

      if (sets) {
        patch = sets;
        type = "sets";
      } else if (reps) {
        patch = reps;
        type = "reps";
      } else if (rest) {
        patch = rest;
        type = "sets";
      }

      History.findOneAndUpdate(
        { _id: planId },
        {
          $set: {
            [`days.$[d].exercises.$[e].${type}`]: patch
          }
        },
        {
          arrayFilters: [{ "d._id": dayId }, { "e._id": exerciseId }],
          new: true,
          lean: true
        }
      ).then(() => {
        return res.json({ msg: "Success" });
      });
    })
    .catch(err => res.status(500).json(err));
});

// @route DELETE api/history/exercise/:day_id/:exercise_id
// @desc Delete exercise
// @access Private
router.delete("/exercise/:day_id/:exercise_id", ensureSignedIn, (req, res) => {
  const { day_id: dayId, exercise_id: exerciseId } = req.params;
  const { userId } = req.session;

  History.find({ user: userId })
    .then(history => {
      History.findOneAndUpdate(
        { _id: planId },
        {
          $pull: {
            "days.$[d].exercises": {
              _id: exerciseId
            }
          }
        },
        {
          arrayFilters: [{ "d._id": dayId }],
          new: true,
          lean: true
        }
      ).then(() => {
        return res.json({ msg: "Success" });
      });
    })
    .catch(err => res.status(500).json(err));
});

// @route DELETE api/history/postpone/:day_id
// @desc Delete exercise
// @access Private
router.post("/postpone/:day_id/", ensureSignedIn, (req, res) => {
  const { day_id: dayId, exercise_id: exerciseId } = req.params;
  const { userId } = req.session;

  // Way to to it atomically?

  History.find({ user: userId })
    .then(history => {
      History.findOneAndUpdate(
        { _id: planId },
        {
          $pull: {
            "days.$[d].exercises": {
              _id: exerciseId
            }
          }
        },
        {
          arrayFilters: [{ "d._id": dayId }],
          new: true,
          lean: true
        }
      ).then(() => {
        return res.json({ msg: "Success" });
      });
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
