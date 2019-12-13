const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

const _id = Joi.string()
  .objectId()
  .required()
  .label("ID");

const exerciseId = _id.label("Exercise ID");

const name = Joi.string()
  .min(1)
  .max(20);

const category = Joi.string()
  .min(1)
  .max(20);

const addExercise = Joi.object().keys({
  name: name.required(),
  category: category.required(),
  exerciseId
});

const editExercise = Joi.object()
  .keys({
    name,
    category,
    exercise_id: exerciseId
  })
  .or("name", "category");

const deleteExercises = Joi.object().keys({
  exerciseIds: Joi.array()
    .items(exerciseId)
    .required()
    .label("Exercise IDs")
  // gay: Joi.string().required()
});

module.exports = {
  "delete/exercise": deleteExercises,
  "post/exercise/custom": addExercise,
  "patch/exercise/custom/:exercise_id": editExercise
};
