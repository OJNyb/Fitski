const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

// AD

const planId = Joi.string()
  .objectId()
  .label("Workout plan ID");

const dayId = Joi.string()
  .objectId()
  .label("Day ID");

const exerciseId = Joi.string()
  .objectId()
  .label("Exercise ID");

const notes = Joi.string()
  .min(1)
  .max(9999)
  .label("Notes");

const sets = Joi.number()
  .min(1)
  .max(50)
  .label("Sets");

const reps = Joi.number()
  .min(1)
  .max(1000)
  .label("Reps");

const weight = Joi.number()
  .min(0)
  .max(9999999)
  .label("Weight");

const unit = Joi.string()
  .min(0)
  .max(20)
  .label("Unit");

const date = Joi.string()
  .isoDate()
  .required();

const activatePlan = Joi.object().keys({
  unit,
  plan_id: planId,
  startDate: date.label("Start date")
});

const addDay = Joi.object()
  .keys({
    date,
    unit,
    notes,
    exerciseId,
    date: date.label("Date")
  })
  .or("notes", "exerciseId");

const deleteDay = Joi.object().keys({
  day_id: dayId
});

const addExercise = Joi.object().keys({
  unit,
  day_id: dayId,
  exerciseId: exerciseId.required()
});

const editExercise = Joi.object()
  .keys({
    sets,
    reps,
    weight,
    unit,
    day_id: dayId,
    exercise_id: exerciseId
  })
  .or("sets", "reps", "weight", "unit");

const deleteExercise = Joi.object().keys({
  day_id: dayId,
  exercise_id: exerciseId
});

module.exports = {
  "post/history/activate/:plan_id": activatePlan,
  "post/history": addDay,
  "delete/history/:day_id": deleteDay,
  "post/history/exercise/:day_id": addExercise,
  "post/history/exercise/:day_id/:exercise_id": editExercise,
  "delete/history/exercise/:day_id/:exercise_id": deleteExercise
};
