import {
  SET_PROFILE,
  IS_PENDING,
  IS_REJECTED,
  EDIT_PROFILE
} from "../types/profileTypes";

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
    case SET_PROFILE: {
      const { profile } = payload;
      return {
        ...state,
        profile,
        isPending: false,
        error: null
      };
    }

    case EDIT_PROFILE: {
      const { profile } = state;
      const { values } = payload;

      const newProfile = {
        ...profile,
        ...values
      };

      return {
        ...state,
        profile: newProfile,
        isPending: false,
        error: null
      };
    }

    default:
      return state;
  }
}

export default planReducer;
