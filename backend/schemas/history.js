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

const setId = Joi.string()
  .objectId()
  .label("Set ID");

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
    dayId,
    exerId: exerciseId,
    exerciseId,
    setId,
    date: date.label("Date")
  })
  .or("notes", "exerciseId")
  .and("exerciseId", "setId");

const deleteDay = Joi.object().keys({
  day_id: dayId
});

const addExercise = Joi.object().keys({
  unit,
  day_id: dayId,
  exerId: exerciseId,
  exerciseId: exerciseId.required(),
  setId: setId.required()
});

const deleteExercise = Joi.object().keys({
  day_id: dayId,
  exercise_id: exerciseId
});

const addSet = Joi.object().keys({
  unit,
  day_id: dayId,
  exercise_id: exerciseId,
  setId
});

const editSet = Joi.object()
  .keys({
    sets,
    reps,
    weight,
    unit,
    day_id: dayId,
    exercise_id: exerciseId,
    set_id: setId
  })
  .or("sets", "reps", "weight", "unit");

const deleteSet = Joi.object().keys({
  day_id: dayId,
  exercise_id: exerciseId,
  set_id: setId
});

module.exports = {
  "post/history/activate/:plan_id": activatePlan,
  "post/history": addDay,
  "delete/history/:day_id": deleteDay,
  "post/history/exercise/:day_id": addExercise,
  "delete/history/exercise/:day_id/:exercise_id": deleteExercise,
  "post/history/exercise/:day_id/:exercise_id": addSet,
  "post/history/exercise/:day_id/:exercise_id/:set_id": editSet,
  "delete/history/exercise/:day_id/:exercise_id/:set_id": deleteSet
};
