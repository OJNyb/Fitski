import {
  IS_PENDING,
  IS_REJECTED,
  ADD_EXERCISE,
  EDIT_EXERCISE,
  SET_EXERCISES,
  GET_EXERCISES,
  DELETE_EXERCISE
} from "../types/exerciseTypes";

// TODO: If !week/day/woplan

function planReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: payload.error
      };
    }
    case IS_PENDING: {
      return {
        ...state,
        isPending: true,
        isRejected: false,
        error: null
      };
    }

    case SET_EXERCISES: {
      const { exercises } = payload;

      exercises.sort((a, b) => (a.name > b.name ? 1 : -1));

      return {
        ...state,
        exercises,
        isPending: false,
        getExercises: false
      };
    }

    case GET_EXERCISES: {
      return {
        ...state,
        getExercises: true
      };
    }

    case ADD_EXERCISE: {
      const { exercises } = state;
      const { name, category, exerciseId } = payload;

      let newExercise = {
        name,
        custom: true,
        _id: exerciseId,
        muscleGroup: category
      };

      exercises.push(newExercise);
      return {
        ...state,
        exercises
      };
    }

    case EDIT_EXERCISE: {
      const { exercises } = state;
      const { values, exerciseId } = payload;

      let exerciseIndex = exercises.map(x => x._id).indexOf(exerciseId);

      exercises[exerciseIndex] = {
        ...exercises[exerciseIndex],
        ...values
      };

      return {
        ...state,
        exercises
      };
    }

    case DELETE_EXERCISE: {
      const { exercises } = state;
      const { exerciseIds } = payload;

      const oldExerciseIds = exercises.map(x => x._id);

      exerciseIds.forEach(x => {
        const exerciseIndex = oldExerciseIds.indexOf(x);
        exercises.splice(exerciseIndex, 1);
      });

      return {
        ...state,
        exercises
      };
    }

    default:
      return state;
  }
}

export default planReducer;
