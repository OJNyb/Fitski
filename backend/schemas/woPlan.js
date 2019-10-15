const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

// AD

const _id = Joi.string()
  .objectId()
  .required()
  .label("ID");

const planId = _id.label("Workout plan ID");

const weekId = _id.label("Week ID");

const dayId = _id.label("Day ID");

const exerciseId = _id.label("Exercise ID");

const name = Joi.string()
  .min(1)
  .max(30)
  .label("Name");
const description = Joi.string()
  .max(1000)
  .label("Description");

const categories = Joi.array()
  .max(30)
  .unique()
  .items(
    Joi.string()
      .objectId()
      .label("Category")
  )
  .label("Categories");

const sets = Joi.number()
  .min(0)
  .max(999999)
  .label("Sets");

const reps = Joi.number()
  .min(0)
  .max(999999)
  .label("Reps");

const getWorkoutPlan = Joi.object().keys({
  plan_id: planId
});

const createWorkoutPlan = Joi.object().keys({
  name: name.required(),
  description,
  categories
});

const editWorkoutPlan = Joi.object()
  .keys({
    name,
    categories,
    description,
    plan_id: planId
  })
  .or("name", "description", "categories");

const deleteWorkoutPlan = Joi.object().keys({
  plan_id: planId
});

const addWeek = Joi.object().keys({
  plan_id: planId,
  numberOfWeeks: Joi.number()
    .min(1)
    .max(999)
    .label("Number of weeks")
});

const editWeek = Joi.object()
  .keys({
    plan_id: planId,
    week_id: weekId,
    repeat: Joi.number()
      .min(1)
      .max(100)
      .label("Repeat"),
    copyWeekId: Joi.string()
      .objectId()
      .not(Joi.ref("week_id"))
      .label("Copy week ID")
  })
  .or("repeat", "copyWeekId");

const deleteWeek = Joi.object().keys({
  plan_id: planId,
  week_id: weekId
});

const editDay = Joi.object().keys({
  muscleGroup: Joi.string()
    .min(1)
    .max(30)
    .required()
    .label("Muscle group")
});

const clearDay = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId
});

const addExercise = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise: exerciseId.required(),
  _id,
  sets,
  reps
});

const editExercise = Joi.object()
  .keys({
    plan_id: planId,
    week_id: weekId,
    day_id: dayId,
    exercise_id: exerciseId,
    sets,
    reps
  })
  .or("sets", "reps");

const deleteExercise = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise_id: exerciseId
});

const activatePlan = Joi.object().keys({
  plan_id: planId,
  // date, date earlier than endDate,
  startDate: Joi.string()
});

module.exports = {
  "get/plan/:plan_id": getWorkoutPlan,
  "post/plan": createWorkoutPlan,
  "delete/plan/:plan_id": deleteWorkoutPlan,
  "post/plan/:plan_id": editWorkoutPlan,
  "post/plan/week/:plan_id": addWeek,
  "post/plan/week/:plan_id/:week_id": editWeek,
  "delete/plan/:plan_id/:week_id": deleteWeek,
  "post/plan/day/:plan_id/:week_id/:day_id": editDay,
  "delete/plan/day/:plan_id/:week_id/:day_id": clearDay,
  "delete/plan/day/clear/:plan_id/:week_id/:day_id": clearDay,
  "post/plan/exercise/:plan_id/:week_id/:day_id": addExercise,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": editExercise,
  "delete/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": deleteExercise,
  "post/plan/activate": activatePlan
};
