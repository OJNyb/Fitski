import {
  SET_PLANS,
  ADD_PLAN,
  IS_PENDING,
  IS_REJECTED
} from "../types/plansTypes";

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
    case SET_PLANS: {
      const { woPlans } = state;
      const { woPlans: newPlans } = payload;
      return {
        ...state,
        woPlans: [...woPlans, ...newPlans],
        isPending: false
      };
    }

    case ADD_PLAN: {
      const { _id, values, user } = payload;
      const { woPlans } = state;

      const newPlan = {
        ...values,
        _id,
        user,
        weeks: []
      };

      woPlans.push(newPlan);
      return {
        ...state,
        woPlans
      };
    }

    default:
      return state;
  }
}

export default planReducer;
