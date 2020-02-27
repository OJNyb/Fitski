const express = require("express");
const router = express.Router();

const createErrorObject = require("../../utils/createErrorObject");

const Exercise = require("../../models/Exercise");
const UserExercise = require("../../models/UserExercise");
const DefaultExerciseDelete = require("../../models/DefaultExerciseDelete");
const MuscleGroup = require("../../models/MuscleGroup");
const DefaultMuscleGroupDelete = require("../../models/DefaultMuscleGroupDelete");

// Validation
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const {
  validateExercise,
  validateDeleteExercises,
  validateMuscleGroup,
  validateDeleteMuscleGroup
} = require("../../middlewares/validateExercise");

const { ensureSignedIn } = require("../../middlewares/auth");

// @route GET api/exercise
// @desc Get all exercises
// @access Private
router.get("/", ensureSignedIn, async (req, res, next) => {
  const { session } = req;
  const { userId } = session;
  let exercises;
  let muscleGroups;
  try {
    // Muscle Group
    const deletedDefaultMuscleGroups = await DefaultMuscleGroupDelete.findOne({
      user: userId
    });
    const muscleGroupskis = await MuscleGroup.find({
      $or: [{ custom: false }, { user: userId }],
      isDeleted: false
    });

    const ddIds = deletedDefaultMuscleGroups.muscleGroups.map(x =>
      x.muscleGroup.toString()
    );
    if (ddIds.length) {
      muscleGroups = muscleGroupskis.filter(x => {
        return ddIds.indexOf(x._id.toString()) === -1;
      });
    } else {
      muscleGroups = muscleGroupskis;
    }

    // Exercises
    const deletedDefaultExercises = await DefaultExerciseDelete.findOne({
      user: userId
    });
    const defExercises = await Exercise.find({}).populate("muscleGroup");
    const ownExercises = await UserExercise.find({
      user: userId,
      isDeleted: false
    }).populate("muscleGroup");

    const { exercises: ddExercises } = deletedDefaultExercises;
    const ddExerciseIds = ddExercises.map(x => x.exercise.toString());

    let defExercisesFiltered = defExercises.filter(
      x => !ddExerciseIds.includes(x._id.toString())
    );
    exercises = [...defExercisesFiltered, ...ownExercises];
  } catch (e) {
    return next(e);
  }

  return res.json({ exercises, muscleGroups });
});

// @route GET api/exercise/:id
// @desc Get exercise by id
// @access Private
router.get("/:id", validateRequest, async (req, res, next) => {
  Exercise.find({ _id: id })
    .then(exercise => res.json(exercise))
    .catch(next);
});

// @route POST api/exercise/custom
// @desc Create custom exercise
// @access Private
router.post(
  "/custom",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { muscleGroupId, name, exerciseId, unit } = body;

    const newExercise = new UserExercise({
      _id: exerciseId,
      name,
      unit,
      muscleGroup: muscleGroupId,
      user: userId
    });

    newExercise
      .save()
      .then(() => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route PATCH api/exercise/custom/:exercise_id
// @desc Edit custom exercise
// @access Private
router.patch(
  "/custom/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateExercise,
  async (req, res, next) => {
    const { body } = req;
    const { name, category, exercise, unit } = body;

    let patch = {};

    if (name) {
      patch.name = name;
    }
    if (category) {
      patch.muscleGroup = category;
    }
    if (unit) {
      patch.unit = unit;
    }

    exercise
      .updateOne({
        $set: { ...patch }
      })
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

// @route DELETE api/exercise
// @desc Delete exercises
// @access Private
router.delete(
  "/",
  ensureSignedIn,
  validateRequest,
  validateDeleteExercises,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { defaultExercisesToDelete, customExercisesToDelete } = body;

    if (defaultExercisesToDelete.length) {
      const newExercisesToDelete = defaultExercisesToDelete.map(x => {
        return {
          exercise: x
        };
      });
      DefaultExerciseDelete.updateOne(
        { user: userId },
        {
          $push: { exercises: { $each: newExercisesToDelete } }
        }
      )
        .then(reski => {
          if (!reski.nModified) {
            return res
              .status(404)
              .json(createErrorObject(["Couldn't apply update"]));
          }
        })
        .catch(next);
    }

    if (customExercisesToDelete.length) {
      UserExercise.updateOne(
        { _id: { $in: customExercisesToDelete } },
        {
          $set: { isDeleted: true }
        }
      )
        .then(reski => {
          if (!reski.nModified) {
            return res
              .status(404)
              .json(createErrorObject(["Couldn't apply update"]));
          }
        })
        .catch(next);
    }
    return res.json({ message: "success" });
  }
);

// @route POST api/exercise/musclegroup
// @desc Create custom muscle group
// @access Private
router.post(
  "/musclegroup",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { name, color, muscleGroupId } = body;

    const newMuscleGroup = new MuscleGroup({
      name,
      color,
      user: userId,
      _id: muscleGroupId
    });

    newMuscleGroup
      .save()
      .then(() => {
        res.json({ message: "success" });
      })
      .catch(next);
  }
);

// @route PATCH api/exercise/musclegroup/:musclegroup_id
// @desc Edit custom muscle group
// @access Private
router.patch(
  "/musclegroup/:musclegroup_id",
  ensureSignedIn,
  validateRequest,
  validateMuscleGroup,
  async (req, res, next) => {
    const { body } = req;
    const { name, color, muscleGroup } = body;

    let patch = {};

    if (name) {
      patch.name = name;
    }
    if (color) {
      patch.color = color;
    }

    muscleGroup
      .updateOne({
        $set: { ...patch }
      })
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

// @route DELETE api/exercise/musclegroup/:musclegroup_id
// @desc Delete muscle group
// @access Private
router.delete(
  "/musclegroup/:musclegroup_id",
  ensureSignedIn,
  validateRequest,
  validateDeleteMuscleGroup,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { defaultMuscleGroupToDelete, customMuscleGroupToDelete } = body;

    if (defaultMuscleGroupToDelete) {
      DefaultMuscleGroupDelete.findOneAndUpdate(
        { user: userId },
        {
          $push: { muscleGroups: { muscleGroup: defaultMuscleGroupToDelete } }
        }
      )
        .then(() => {
          return res.json({ message: "success" });
        })
        .catch(next);
    }

    if (customMuscleGroupToDelete) {
      MuscleGroup.updateOne(
        { _id: customMuscleGroupToDelete },
        {
          $set: { isDeleted: true }
        }
      )
        .then(reski => {
          UserExercise.updateMany(
            { muscleGroup: customMuscleGroupToDelete },
            {
              isDeleted: true
            }
          ).catch(next);
          if (!reski.nModified) {
            return res
              .status(404)
              .json(createErrorObject(["Couldn't apply update"]));
          }
          return res.json({ message: "success" });
        })
        .catch(next);
    }
  }
);

module.exports = router;
