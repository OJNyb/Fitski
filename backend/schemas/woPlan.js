const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

// AD

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

const planId = Joi.string()
  .objectId()
  .label("Workout plan ID");

const weekId = Joi.string()
  .objectId()
  .label("Week ID");

const dayId = Joi.string()
  .objectId()
  .label("Day ID");

const exerciseId = Joi.string()
  .objectId()
  .label("Exercise ID");

const sets = Joi.number()
  .min(1)
  .max(50)
  .label("Sets");

const reps = Joi.number()
  .min(1)
  .max(1000)
  .label("Reps");

const rest = Joi.number()
  .min(0)
  .max(99999);

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
    id: planId
  })
  .or("name", "description", "categories");

const addWeek = Joi.object().keys({
  planId,
  weekNumber: Joi.number()
    .min(1)
    .max(52)
});

const deleteWeek = Joi.object().keys({
  planId,
  weekId
});

const addExercise = Joi.object().keys({
  planId,
  weekId,
  dayId,
  exercise: exerciseId,
  sets,
  reps,
  rest
});

const editExercise = Joi.object()
  .keys({
    planId,
    weekId,
    dayId,
    exerciseId,
    sets,
    reps,
    rest
  })
  .or("sets", "reps", "rest");

const deleteExercise = Joi.object().keys({
  planId,
  weekId,
  dayId,
  exerciseId
});

const activatePlan = Joi.object().keys({
  planId,
  // date, date earlier than endDate,
  startDate: Joi.string()
});

// module.exports = {
//   '/people': personDataSchema,
//   '/auth/edit': authDataSchema,
//   '/fees/pay': feesDataSchema
// }

module.exports = {
  "post/plan": createWorkoutPlan,
  "post/plan/:id": editWorkoutPlan,
  "post/plan/week/:id": addWeek,
  "delete/plan/:plan_id/:week_id": deleteWeek,
  "post/plan/exercise/:plan_id/:week_id/:day_id": addExercise,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": editExercise,
  "delete/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": deleteExercise,
  "post/plan/activate": activatePlan
};
