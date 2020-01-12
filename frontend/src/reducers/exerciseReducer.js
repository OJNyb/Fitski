import {
  IS_PENDING,
  IS_REJECTED,
  SET_EXERCISES,
  GET_EXERCISES,
  ADD_EXERCISE,
  ADD_EXERCISE_RETRY,
  ADD_EXERCISE_FAILED,
  ADD_EXERCISE_SUCCESS,
  EDIT_EXERCISE,
  EDIT_EXERCISE_RETRY,
  EDIT_EXERCISE_FAILED,
  EDIT_EXERCISE_SUCCESS,
  DELETE_EXERCISE,
  DELETE_EXERCISE_FAILED,
  DELETE_EXERCISE_SUCCESS
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
        muscleGroup: category,
        isPending: true
      };

      exercises.push(newExercise);
      return {
        ...state,
        exercises
      };
    }

    case ADD_EXERCISE_RETRY: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);
      exercise.isPending = true;
      exercise.isRejected = false;

      return {
        ...state,
        exercises
      };
    }

    case ADD_EXERCISE_SUCCESS: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);
      exercise.isPending = false;

      return {
        ...state,
        exercises
      };
    }

    case ADD_EXERCISE_FAILED: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);
      exercise.isPending = false;
      exercise.isRejected = true;
      exercise.request = "add";

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
        ...values,
        isPending: true
      };

      return {
        ...state,
        exercises
      };
    }

    case EDIT_EXERCISE_RETRY: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);
      exercise.isPending = true;
      exercise.isRejected = false;

      return {
        ...state,
        exercises
      };
    }

    case EDIT_EXERCISE_SUCCESS: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);
      exercise.isPending = false;

      return {
        ...state,
        exercises
      };
    }

    case EDIT_EXERCISE_FAILED: {
      const { exercises } = state;
      const { exerciseId } = payload;

      const exercise = exercises.find(x => x._id === exerciseId);

      exercise.isPending = false;
      exercise.isRejected = true;
      exercise.request = "edit";

      return {
        ...state,
        exercises
      };
    }

    case DELETE_EXERCISE: {
      const { exercises } = state;
      const { exerciseIds } = payload;

      exercises.forEach(x => {
        let index = exerciseIds.indexOf(x._id);
        if (index > -1) {
          x.isPending = true;
          x.isRejected = false;
        }
      });

      return {
        ...state,
        exercises
      };
    }

    case DELETE_EXERCISE_SUCCESS: {
      const { exercises } = state;
      const { exerciseIds } = payload;

      const newExercises = exercises.filter(
        x => exerciseIds.indexOf(x._id) === -1
      );

      return {
        ...state,
        exercises: newExercises
      };
    }

    case DELETE_EXERCISE_FAILED: {
      const { exercises } = state;
      const { exerciseIds } = payload;

      exercises.forEach(x => {
        let index = exerciseIds.indexOf(x._id);
        if (index > -1) {
          x.isPending = false;
          x.isRejected = true;
          x.request = "delete";
        }
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
