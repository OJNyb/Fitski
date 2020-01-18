const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

const _id = Joi.string()
  .objectId()
  .required()
  .label("ID");

const exerciseId = _id.label("Exercise ID");
const muscleGroupId = _id.label("Muscle group ID");

const name = Joi.string()
  .min(1)
  .max(50)
  .label("Name");

const color = Joi.string()
  .regex(/^#[A-Fa-f0-9]{6}$/)
  .label("Color");

const getExercise = Joi.object().keys({
  _id: _id.label("Exercise ID")
});

const addExercise = Joi.object().keys({
  name: name.required(),
  muscleGroupId,
  exerciseId
});

const editExercise = Joi.object()
  .keys({
    name,
    muscleGroupId: Joi.string()
      .objectId()
      .label("Muscle Group ID"),
    exercise_id: exerciseId
  })
  .or("name", "muscleGroupId");

const deleteExercises = Joi.object().keys({
  exerciseIds: Joi.array()
    .items(exerciseId)
    .required()
    .label("Exercise IDs")
});

const addMuscleGroup = Joi.object().keys({
  muscleGroupId,
  name: name.required(),
  color: color.required()
});

const editMuscleGroup = Joi.object()
  .keys({
    name,
    color,
    musclegroup_id: muscleGroupId
  })
  .or("name", "color");

const deleteMuscleGroups = Joi.object().keys({
  musclegroup_id: muscleGroupId
});

module.exports = {
  "get/exercise": getExercise,
  "delete/exercise": deleteExercises,
  "post/exercise/custom": addExercise,
  "patch/exercise/custom/:exercise_id": editExercise,
  "post/exercise/musclegroup": addMuscleGroup,
  "patch/exercise/musclegroup/:musclegroup_id": editMuscleGroup,
  "delete/exercise/musclegroup/:musclegroup_id": deleteMuscleGroups
};
