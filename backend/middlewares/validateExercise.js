const Exercise = require("../models/Exercise");
const UserExercise = require("../models/UserExercise");

const createErrorObject = require("../utils/createErrorObject");

let StandardExercises;
let StandardExerciseIds;
(async () => {
  StandardExercises = await Exercise.find({});
  StandardExerciseIds = StandardExercises.map(x => x._id.toString());
})();

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
  const { body, params, session } = req;
  const { userId } = session;
  const { exerciseIds } = body;

  const defaultExercisesToDelete = [];
  const customExercisesToDelete = [];

  exerciseIds.forEach((x, y) => {
    console.log(StandardExerciseIds.indexOf(x));
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

    console.log(customExercisesToDelete);
    console.log(exercises);

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

module.exports = { validateExercise, validateDeleteExercises };
