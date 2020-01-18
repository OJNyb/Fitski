const UserExercise = require("../models/UserExercise");
const MuscleGroup = require("../models/MuscleGroup");

const createErrorObject = require("../utils/createErrorObject");

const StandardExerciseIds = [
  "5d406ab23beac01b7035c2aa",
  "5d406ab23beac01b7035c2ab",
  "5d406ab23beac01b7035c2ac",
  "5d406ab23beac01b7035c2ad",
  "5d406ab23beac01b7035c2ae",
  "5d406ab23beac01b7035c2af",
  "5d406ab23beac01b7035c2b0",
  "5d406ab23beac01b7035c2b1",
  "5d406ab23beac01b7035c2b2",
  "5d406ab23beac01b7035c2b6",
  "5d406ab23beac01b7035c2b7",
  "5d406ab23beac01b7035c2b8",
  "5d406ab23beac01b7035c2b9",
  "5d406ab23beac01b7035c2ba",
  "5d406ab23beac01b7035c2bb",
  "5d406ab23beac01b7035c2bc",
  "5d406ab23beac01b7035c2bd",
  "5d406ab23beac01b7035c2be",
  "5d406ab23beac01b7035c2bf",
  "5d406ab23beac01b7035c2c0",
  "5d406ab23beac01b7035c2c1",
  "5d406ab23beac01b7035c2c2",
  "5d406ab23beac01b7035c2c5",
  "5d406ab23beac01b7035c2c6",
  "5d406ab23beac01b7035c2c7",
  "5d406ab23beac01b7035c2c8",
  "5d406ab23beac01b7035c2c9",
  "5d406ab23beac01b7035c2ca",
  "5d406ab23beac01b7035c2cb",
  "5d406ab23beac01b7035c2cc",
  "5d406ab23beac01b7035c2cd",
  "5d406ab23beac01b7035c2ce",
  "5d406ab23beac01b7035c2cf",
  "5d406ab23beac01b7035c2d2",
  "5d406ab23beac01b7035c2d3",
  "5d406ab23beac01b7035c2d4",
  "5d406ab23beac01b7035c2d5",
  "5d406ab23beac01b7035c2d6",
  "5d406ab23beac01b7035c2d7",
  "5d406ab23beac01b7035c2d8",
  "5d406ab23beac01b7035c2d9",
  "5d406ab23beac01b7035c2da",
  "5d406ab23beac01b7035c2db",
  "5d406ab23beac01b7035c2dc",
  "5d406ab23beac01b7035c2dd",
  "5d406ab23beac01b7035c2de",
  "5d406ab23beac01b7035c2df",
  "5d406ab23beac01b7035c2e0",
  "5d406ab23beac01b7035c2e1",
  "5d406ab23beac01b7035c2e4",
  "5d406ab23beac01b7035c2e5",
  "5d406ab23beac01b7035c2e6",
  "5d406ab23beac01b7035c2e7",
  "5d406ab23beac01b7035c2e8",
  "5d406ab23beac01b7035c2e9",
  "5d406ab23beac01b7035c2ea",
  "5d406ab23beac01b7035c2eb",
  "5d406ab23beac01b7035c2ec",
  "5d406ab23beac01b7035c2ed",
  "5d406ab23beac01b7035c2f0",
  "5d406ab23beac01b7035c2f1",
  "5d406ab23beac01b7035c2f2",
  "5d406ab23beac01b7035c2f3",
  "5d406ab23beac01b7035c2f4",
  "5d406ab23beac01b7035c2f5",
  "5d406ab23beac01b7035c2f6",
  "5d406ab23beac01b7035c2f7"
];

const StandardMuscleGroupIds = [
  "5e1efe709ed6895950a94b88",
  "5e1efec21c9d440000a301f8",
  "5e1eff241c9d440000a301f9",
  "5e1eff431c9d440000a301fa",
  "5e1effe01c9d440000a301fb",
  "5e1f00201c9d440000a301fc",
  "5e1f005a1c9d440000a301fd",
  "5e1f03941c9d440000a301fe",
  "5e1f12311c9d440000a301ff"
];

async function validateExercise(req, res, next) {
  const { body, params, session } = req;
  const { userId } = session;
  const { exercise_id: exerciseId } = params;

  const exercise = await UserExercise.findById(exerciseId);

  if (!exercise) {
    return res
      .status(404)
      .json(createErrorObject(["No exercise with this ID"]));
  }

  if (userId !== exercise.user.toString()) {
    return res
      .status(403)
      .json(
        createErrorObject([
          "You do not have permission to make changes to this exercise"
        ])
      );
  }

  body.exercise = exercise;

  return next();
}

async function validateDeleteExercises(req, res, next) {
  const { body, session } = req;
  const { userId } = session;
  const { exerciseIds } = body;

  const defaultExercisesToDelete = [];
  const customExercisesToDelete = [];

  exerciseIds.forEach(x => {
    if (StandardExerciseIds.indexOf(x) === -1) {
      customExercisesToDelete.push(x);
    } else {
      defaultExercisesToDelete.push(x);
    }
  });

  if (customExercisesToDelete.length) {
    const exercises = await UserExercise.find({
      _id: { $in: customExercisesToDelete }
    });

    if (!exercises.length) {
      return res
        .status(404)
        .json(createErrorObject(["No exercises with these IDs"]));
    }

    for (let i = 0; i < exercises.length; i++) {
      if (userId !== exercises[i].user.toString()) {
        return res
          .status(403)
          .json(
            createErrorObject([
              "You do not have permission to make changes to this exercise"
            ])
          );
      }
    }
  }

  body.defaultExercisesToDelete = defaultExercisesToDelete;
  body.customExercisesToDelete = customExercisesToDelete;

  return next();
}

async function validateMuscleGroup(req, res, next) {
  const { body, params, session } = req;
  const { userId } = session;
  const { musclegroup_id: muscleGroupId } = params;

  const muscleGroup = await MuscleGroup.findById(muscleGroupId);

  if (!muscleGroup) {
    return res
      .status(404)
      .json(createErrorObject(["No muscle group with this ID"]));
  }

  if (userId !== muscleGroup.user.toString()) {
    return res
      .status(403)
      .json(
        createErrorObject([
          "You do not have permission to make changes to this muscle group"
        ])
      );
  }

  body.muscleGroup = muscleGroup;

  return next();
}

async function validateDeleteMuscleGroup(req, res, next) {
  const { body, params, session } = req;
  const { userId } = session;
  const { musclegroup_id: muscleGroupId } = params;

  if (StandardMuscleGroupIds.indexOf(muscleGroupId) > -1) {
    body.defaultMuscleGroupToDelete = muscleGroupId;
  } else {
    const muscleGroup = await MuscleGroup.findById(muscleGroupId);

    if (!muscleGroup) {
      return res
        .status(404)
        .json(createErrorObject(["No muscle group with this ID"]));
    }

    if (userId !== muscleGroup.user.toString()) {
      return res
        .status(403)
        .json(
          createErrorObject([
            "You do not have permission to make changes to this muscle group"
          ])
        );
    }
    body.customMuscleGroupToDelete = muscleGroupId;
  }

  return next();
}

module.exports = {
  validateExercise,
  validateDeleteExercises,
  validateMuscleGroup,
  validateDeleteMuscleGroup
};
