const UserExercise = require("../models/UserExercise");
const MuscleGroup = require("../models/MuscleGroup");
const Exercise = require("../models/Exercise");

const createErrorObject = require("../utils/createErrorObject");

let StandardExerciseIds;
(() => {
  Exercise.find({})
    .then(exercises => {
      StandardExerciseIds = exercises.map(x => x._id.toString());
    })
    .catch(e => {
      console.log(e);
    });
})();

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
