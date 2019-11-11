const UserExercise = require("../models/UserExercise");
const createErrorObject = require("../utils/createErrorObject");

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

module.exports = validateExercise;
