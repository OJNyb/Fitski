const express = require("express");
const router = express.Router();

const createErrorObject = require("../../utils/createErrorObject");
const objectId = require("../../schemas/utils");

const Exercise = require("../../models/Exercise");
const UserExercise = require("../../models/UserExercise");

// Validation
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);
const { ensureSignedIn } = require("../../middlewares/auth");

// @route GET api/exercise
// @desc Get all exercises
// @access Private
router.get("/", async (req, res, next) => {
  const { session } = req;
  const { userId } = session;
  let exercises;
  try {
    let preExercises = await Exercise.find({});
    let ownExercises = await UserExercise.find({ user: userId });
    exercises = [...preExercises, ...ownExercises];
  } catch (e) {
    next(e);
  }
  console.log("GAY \n", exercises);

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

    const newExercise = {
      name,
      _id: exerciseId,
      muscleGroup: category
    };

    console.log(newExercise);

    UserExercise.findOneAndUpdate(
      { user: userId },
      {
        $push: { exercises: newExercise }
      },
      {
        new: true
      }
    )
      .then(reski => {
        console.log(reski);
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
  async (req, res, next) => {
    const { body, params, session } = req;
    const { userId } = session;
    const { exercise_id: exerciseId } = params;
    const { name, category } = body;

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
      [`exercises.$[e].${field}`]: patch
    };

    if (patch2) {
      newField[`exercises.$[e].${field2}`] = patch2;
    }

    UserExercise.findOneAndUpdate(
      { user: userId },
      {
        $set: { ...newField }
      },
      {
        arrayFilters: [{ "e._id": exerciseId }]
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

// @route GET api/exercise
// @desc Delete custom exercise
// @access Private
router.delete(
  "/custom/:exercise_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
    const { params, session } = req;
    const { userId } = session;
    const { exercise_id: exerciseId } = params;

    UserExercise.findOneAndUpdate(
      { user: userId },
      {
        $pull: { exercises: { _id: exerciseId } }
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
module.exports = router;
