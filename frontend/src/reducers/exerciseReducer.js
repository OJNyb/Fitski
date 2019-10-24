import {
  IS_PENDING,
  IS_REJECTED,
  SET_EXERCISES,
  GET_EXERCISES
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

    default:
      return state;
  }
}

export default planReducer;
