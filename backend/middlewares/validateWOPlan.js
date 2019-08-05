const createErrorObject = require("../utils/createErrorObject");
const WOPlan = require("../models/WOPlan");

async function validateWOPlan(req, res, next) {
  const { body, params, session } = req;

  const { userId } = session;
  const {
    plan_id: planId,
    week_id: weekId,
    day_id: dayId,
    exercise_id: exerciseId
  } = params;

  const woPlan = await WOPlan.findById(planId);

  if (!woPlan) {
    return res
      .status(404)
      .json(createErrorObject(["No workout plan with this ID"]));
  }

  if (!(await woPlan.isOwner(userId))) {
    return res
      .status(403)
      .json(
        createErrorObject([
          "You do not have permission to make changes to this workout plan"
        ])
      );
  }

  body.woPlan = woPlan;

  if (!weekId) return next();

  const { weeks } = woPlan;

  const weekIndex = weeks.map(x => x.id).indexOf(weekId);
  if (weekIndex === -1) {
    return res
      .status(404)
      .json(createErrorObject(["No week with this ID in workout plan"]));
  }

  if (!dayId) return next();

  const { days } = weeks[weekIndex];
  const dayIndex = days.map(x => x.id).indexOf(dayId);
  if (dayIndex === -1) {
    return res
      .status(404)
      .json(createErrorObject(["No day with this ID in workout plan"]));
  }

  if (!exerciseId) return next();

  const { exercises } = days[dayIndex];
  const exerciseIndex = exercises.map(x => x.id).indexOf(exerciseId);
  if (exerciseIndex === -1) {
    return res
      .status(404)
      .json(createErrorObject(["No exercise with this ID in workout plan"]));
  }

  next();
}

module.exports = validateWOPlan;
