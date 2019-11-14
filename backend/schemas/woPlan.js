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

const exerId = _id.label("Exer ID");

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
  .integer()
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

const custom = Joi.boolean()
  .required()
  .label("custom");

const addWeek = Joi.object().keys({
  plan_id: planId,
  weekArray: Joi.array().items({
    _id: weekId,
    days: Joi.array().items({
      _id: dayId
    })
  })
});

const copyWeek = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  newIds: Joi.array().items({
    dayId,
    exercises: Joi.array().items({
      exerId,
      setIds: Joi.array().items(setId)
    })
  })
});

const repeatWeek = Joi.object().keys({
  plan_id: planId,
  week_id: weekId,
  newIds: Joi.array().items({
    weekId,
    days: Joi.array().items({
      dayId,
      exercises: Joi.array().items({
        exerId,
        setIds: Joi.array().items(setId)
      })
    })
  })
});

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
  exerciseId: exerciseId.required(),
  exerId,
  setId,
  reps,
  custom
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
  "post/plan/week/copy/:plan_id/:week_id": copyWeek,
  "post/plan/week/repeat/:plan_id/:week_id": repeatWeek,
  "delete/plan/:plan_id/:week_id": deleteWeek,
  "post/plan/day/:plan_id/:week_id/:day_id": editDay,
  "delete/plan/day/:plan_id/:week_id/:day_id": clearDay,
  "delete/plan/day/clear/:plan_id/:week_id/:day_id": clearDay,
  "post/plan/exercise/:plan_id/:week_id/:day_id": addExercise,
  "delete/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": deleteExercise,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id": addSet,
  "post/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id": editSet,
  "delete/plan/exercise/:plan_id/:week_id/:day_id/:exercise_id/:set_id": deleteSet,
  "post/plan/activate": activatePlan
};
