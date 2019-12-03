import {
  SET_USER,
  IS_PENDING,
  IS_REJECTED,
  EDIT_USER,
  ACTIVATE_PLAN,
  DEACTIVATE_PLAN
} from "../types/userTypes";

function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      const { error } = payload;
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error
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
    case SET_USER: {
      const { user } = payload;

      return {
        ...state,
        user,
        error: null,
        isPending: false
      };
    }
    case EDIT_USER: {
      const { values } = payload;
      const { user } = state;
      const newUser = {
        ...user,
        ...values
      };

      return {
        ...state,
        user: newUser
      };
    }

    case ACTIVATE_PLAN: {
      const { planId } = payload;
      const { user } = state;

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const newUser = {
        ...user,
        activeWOPlan: {
          woPlan: planId,
          startDate: new Date(),
          endDate: tomorrow
        }
      };

      return {
        ...state,
        user: newUser
      };
    }

    case DEACTIVATE_PLAN: {
      const { user } = state;

      let yestarday = new Date();
      yestarday.setDate(yestarday.getDate() - 1);
      const newUser = {
        ...user,
        activeWOPlan: {
          ...user.activeWOPlan,
          endDate: yestarday
        }
      };

      return {
        ...state,
        user: newUser
      };
    }

    default:
      return state;
  }
}

export default userReducer;
