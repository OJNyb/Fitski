import {
  SET_ACCESS,
  IS_PENDING,
  IS_REJECTED,
  ADD_PLAN,
  REMOVE_PLAN
} from "../types/userAccessTypes";

function userAccessReducer(state, action) {
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
    case SET_ACCESS: {
      const { data } = payload;
      const { plans } = data;

      return {
        ...state,
        accessedPlans: plans.map(x => x.woPlan),
        isPending: false,
        error: null
      };
    }
    case ADD_PLAN: {
      const { planId } = payload;
      const { accessedPlans } = state;

      accessedPlans.push(planId);

      return {
        ...state,
        accessedPlans
      };
    }
    case REMOVE_PLAN: {
      const { planId } = payload;
      const { accessedPlans } = state;
      const index = accessedPlans.indexOf(planId);
      if (index > -1) {
        accessedPlans.splice(index, 1);
      }

      return {
        ...state,
        accessedPlans
      };
    }

    default:
      return state;
  }
}

export default userAccessReducer;
