const History = require("../models/History");
const createErrorObject = require("../utils/createErrorObject");

async function validateWOPlan(req, res, next) {
  const { body, params, session } = req;

  const { userId } = session;
  const { day_id: dayId, exercise_id: exerciseId } = params;

  const history = await History.findOne({ user: userId });

  if (!history) {
    return next({});
  }

  body.history = history;

  console.log(dayId);

  const { days } = history;
  const dayIndex = days.map(x => x.id).indexOf(dayId);
  if (dayIndex === -1) {
    return res.status(404).json(createErrorObject(["No day with this ID"]));
  }

  if (!exerciseId) {
    return next();
  }

  const { exercises } = days[dayIndex];
  const exerciseIndex = exercises.map(x => x.id).indexOf(exerciseId);
  if (exerciseIndex === -1) {
    return res
      .status(404)
      .json(createErrorObject(["No exercise with this ID"]));
  }

  next();
}

module.exports = validateWOPlan;
