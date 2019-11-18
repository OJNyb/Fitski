import {
  SET_PLANS,
  ADD_PLAN,
  IS_PENDING,
  IS_REJECTED,
  ACTIVATE_PLAN,
  DEACTIVATE_PLAN
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
      const { woPlans } = payload;
      return {
        ...state,
        woPlans,
        isPending: false
      };
    }

    case ACTIVATE_PLAN: {
      const { woPlans } = state;
      const { activeWOPlan } = payload;

      if (woPlans && activeWOPlan) {
        const { woPlan, endDate } = activeWOPlan;

        let woPlanIndex = woPlans.map(x => x._id).indexOf(woPlan);
        if (woPlanIndex > -1) {
          let activePlan = { ...woPlans[woPlanIndex] };
          if (new Date(endDate) > new Date()) {
            activePlan.active = true;
          } else {
            activePlan.active = false;
          }
          woPlans.splice(woPlanIndex, 1);
          woPlans.unshift(activePlan);
        }
      }

      return {
        ...state,
        woPlans
      };
    }

    case ADD_PLAN: {
      //
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
