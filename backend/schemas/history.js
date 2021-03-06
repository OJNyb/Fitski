const Joi = require("./joi");

const _id = Joi.string().objectId();

const planId = _id.label("Workout plan ID");

const dayId = _id.label("Day ID");

const exerciseId = _id.label("Exercise ID");

const setId = _id.label("Set ID");

const note = Joi.string()
  .min(1)
  .max(9999)
  .label("Note");

const reps = Joi.number()
  .min(0)
  .max(9999)
  .integer()
  .label("Reps");

const rpe = Joi.number()
  .min(0)
  .max(10)
  .integer()
  .label("RPE");

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

const deactivatePlan = Joi.object().keys({
  plan_id: planId
});

const custom = Joi.boolean().label("custom");

const formattedDate = Joi.number()
  .integer()
  .min(20000101)
  .max(21000101)
  .required()
  .label("Formatted date");

const addDay = Joi.object()
  .keys({
    date,
    unit,
    reps,
    note,
    dayId,
    setId,
    exerciseId,
    exerId: exerciseId,
    date: date.label("Date"),
    custom
  })
  .or("note", "exerciseId")
  .and("exerciseId", "setId", "custom");

const editDay = Joi.object().keys({
  note: note.required(),
  dayId
});

const deleteDay = Joi.object().keys({
  day_id: dayId
});

const addExercise = Joi.object().keys({
  unit,
  reps,
  rpe,
  weight,
  day_id: dayId,
  exerId: exerciseId,
  exerciseId: exerciseId.required(),
  setId: setId.required(),
  custom: custom.required()
});

const reorderExercise = Joi.object().keys({
  day_id: dayId,
  exerId: exerciseId,
  to: Joi.number()
    .integer()
    .min(0)
    .required()
    .label("To")
    .disallow(Joi.ref("from")),
  from: Joi.number()
    .integer()
    .min(0)
    .required()
    .label("From")
});

const deleteExercise = Joi.object().keys({
  day_id: dayId,
  exercise_id: exerciseId
});

const deleteExercises = Joi.object().keys({
  day_id: dayId,
  exerciseIds: Joi.array().items(exerciseId)
});

const addSet = Joi.object().keys({
  unit,
  day_id: dayId,
  exercise_id: exerciseId,
  setId,
  reps,
  rpe,
  weight
});

const editSet = Joi.object()
  .keys({
    reps,
    weight,
    note,
    rpe,
    day_id: dayId,
    exercise_id: exerciseId,
    set_id: setId
  })
  .or("reps", "weight", "rpe");

const deleteSet = Joi.object().keys({
  day_id: dayId,
  exercise_id: exerciseId,
  set_id: setId
});

const copyDay = Joi.object().keys({
  formattedDate,
  dayToCopyId: dayId,
  newDayId: dayId,
  newIds: Joi.array().items({
    exerId: exerciseId,
    setIds: Joi.array().items(setId)
  })
});

module.exports = {
  "post/history/activate/:plan_id": activatePlan,
  "post/history/deactivate/:plan_id": deactivatePlan,
  "post/history": addDay,
  "patch/history": editDay,
  "delete/history/:day_id": deleteDay,
  "post/history/exercise/:day_id": addExercise,
  "patch/history/reorder/:day_id": reorderExercise,
  "delete/history/exercise/:day_id": deleteExercises,
  "delete/history/exercise/:day_id/:exercise_id": deleteExercise,
  "post/history/exercise/:day_id/:exercise_id": addSet,
  "post/history/exercise/:day_id/:exercise_id/:set_id": editSet,
  "delete/history/exercise/:day_id/:exercise_id/:set_id": deleteSet,
  "post/history/copy": copyDay
};
