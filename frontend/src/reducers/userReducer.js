import {
  SET_USER,
  IS_PENDING,
  IS_REJECTED,
  EDIT_USER,
  ACTIVATE_PLAN,
  DEACTIVATE_PLAN,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED
} from "../types/userTypes";

function userReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      const { error } = payload;
      return {
        ...state,
        user: null,
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
      const { image } = payload;
      const { user } = state;
      const newUser = {
        ...user
      };
      if (image) {
        newUser.imagePending = true;
        newUser.imageRejected = false;
      } else {
        newUser.isPending = true;
        newUser.isRejected = false;
      }

      return {
        ...state,
        user: newUser
      };
    }

    case EDIT_USER_SUCCESS: {
      const { image, values } = payload;
      const { user } = state;
      const newUser = {
        ...user,
        ...values
      };

      if (image) {
        newUser.imagePending = false;
        newUser.imageRejected = false;
      } else {
        newUser.isPending = false;
        newUser.isRejected = false;
      }

      return {
        ...state,
        user: newUser
      };
    }

    case EDIT_USER_FAILED: {
      const { image } = payload;
      const { user } = state;
      const newUser = {
        ...user
      };

      if (image) {
        newUser.imagePending = false;
        newUser.imageRejected = true;
      } else {
        newUser.isPending = false;
        newUser.isRejected = true;
      }

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
