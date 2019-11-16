const express = require("express");
const router = express.Router();

const createErrorObject = require("../../utils/createErrorObject");
const objectId = require("../../schemas/utils");

const Exercise = require("../../models/Exercise");
const UserExercise = require("../../models/UserExercise");
const DefaultExerciseDelete = require("../../models/DefaultExerciseDelete");

// Validation
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const {
  validateExercise,
  validateDeleteExercises
} = require("../../middlewares/validateExercise");

const { ensureSignedIn } = require("../../middlewares/auth");

// @route GET api/exercise
// @desc Get all exercises
// @access Private
router.get("/", async (req, res, next) => {
  const { session } = req;
  const { userId } = session;
  let exercises;
  try {
    const deletedDefaultExercises = await DefaultExerciseDelete.findOne({
      user: userId
    });
    const defExercises = await Exercise.find({});
    const ownExercises = await UserExercise.find({
      user: userId,
      isDeleted: false
    });

    const { exercises: ddExercises } = deletedDefaultExercises;
    const ddExerciseIds = ddExercises.map(x => x.exercise.toString());

    let defExercisesFiltered = defExercises.filter(
      x => !ddExerciseIds.includes(x._id.toString())
    );
    exercises = [...defExercisesFiltered, ...ownExercises];
  } catch (e) {
    return next(e);
  }

  return res.json(exercises);
});

// @route GET api/exercise/:id
// @desc Get exercise by id
// @access Private
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { error } = objectId.validate(id);

  if (error) {
    return res
      .status(404)
      .json(createErrorObject(["No exercise with this ID"]));
  }

  Exercise.find({ _id: id })
    .then(exercises => res.json(exercises))
    .catch(next);
});

// @route GET api/exercise
// @desc Create custom exercise
// @access Private
router.post(
  "/custom",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { body, session } = req;
    const { userId } = session;
    const { category, name, exerciseId } = body;

    const newExercise = new UserExercise({
      _id: exerciseId,
      name,
      muscleGroup: category,
      user: userId
    });

    newExercise
      .save()
      .then(reski => {
        res.json({ message: "success" });
        //   res.status(404).json(createErrorObject(["Couldn't apply update"]));
      })
      .catch(next);
  }
);

// @route GET api/exercise
// @desc Edit custom exercise
// @access Private
router.patch(
  "/custom/:exercise_id",
  ensureSignedIn,
  validateRequest,
  validateExercise,
  async (req, res, next) => {
    const { body } = req;
    const { name, category, exercise } = body;

    let field;
    let patch;
    let field2;
    let patch2;

    if (name && category) {
      patch = name;
      field = "name";
      patch2 = category;
      field2 = "category";
    } else if (name) {
      patch = name;
      field = "name";
    } else if (category) {
      patch = category;
      field = "category";
    }

    let newField = {
      [`${field}`]: patch
    };

    if (patch2) {
      newField[`${field2}`] = patch2;
    }

    exercise
      .updateOne({
        $set: { ...newField }
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

// // @route GET api/exercise
// // @desc Delete exercise
// // @access Private
// router.delete(
//   "/:exercise_id",
//   ensureSignedIn,
//   validateRequest,
//   validateDeleteExercise,
//   async (req, res, next) => {
//     const { body } = req;
//     const { exercise } = body;

//     if (exercise._id)
//       exercise
//         .updateOne({
//           $set: { isDeleted: true }
//         })
//         .then(reski => {
//           if (reski.nModified) {
//             res.json({ message: "success" });
//           } else {
//             res.status(404).json(createErrorObject(["Couldn't apply update"]));
//           }
//         })
//         .catch(next);
//   }
// );

// @route GET api/exercise
// @desc Delete custom exercises
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
          } else {
            res.status(404).json(createErrorObject(["Couldn't apply update"]));
          }
        })
        .catch(next);
    }

    if (customExercisesToDelete.length) {
      UserExercise.update(
        { _id: { $in: customExercisesToDelete } },
        {
          $set: { isDeleted: true }
        }
      )
        .then(reski => {
          if (!reski.nModified) {
          } else {
            res.status(404).json(createErrorObject(["Couldn't apply update"]));
          }
        })
        .catch(next);
    }
    return res.json({ message: "success" });
  }
);

module.exports = router;
