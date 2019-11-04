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

const setId = _id.label("Set ID");

const exerciseId = _id.label("Exercise ID");

const name = Joi.string()
  .min(1)
  .max(30)
  .label("Name");
const description = Joi.string()
  .allow("")
  .max(1000)
  .label("Description");

const goals = Joi.array()
  .max(3)
  .unique()
  .items(
    Joi.string()
      .regex(/Gain strength|Gain muscle|Lose weight/)
      .label("Goal")
  )
  .label("Goals");

const difficulty = Joi.string()
  .regex(/Beginner|Intermediate|Advanced/)
  .label("Difficulty");

const reps = Joi.number()
  .min(0)
  .max(9999)
  .label("Reps");

const getWorkoutPlan = Joi.object().keys({
  plan_id: planId
});

const createWorkoutPlan = Joi.object().keys({
  name: name.required(),
  goals,
  planId,
  difficulty,
  description
});

const editWorkoutPlan = Joi.object()
  .keys({
    name,
    goals,
    difficulty,
    description,
    plan_id: planId
  })
  .or("name", "goals", "description", "difficulty");

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
  reps
});

const deleteExercise = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise_id: exerciseId
});

const addSet = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise_id: exerciseId,
  setId,
  reps
});

const editSet = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise_id: exerciseId,
  set_id: setId,
  reps
});

const deleteSet = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  day_id: dayId,
  exercise_id: exerciseId,
  set_id: setId
});

const activatePlan = Joi.object().keys({
  plan_id: planId,
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
  "delete/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": deleteExercise,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": addSet,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id": editSet,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id": deleteSet,
  "post/plan/activate": activatePlan
};
