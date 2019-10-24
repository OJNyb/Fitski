import { SINGLE_NAV, DOUBLE_NAV } from "../types/navTypes";

function navReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SINGLE_NAV: {
      return {
        ...state,
        isDouble: false
      };
    }

    case DOUBLE_NAV: {
      return {
        ...state,
        isDouble: true
      };
    }

    default:
      return state;
  }
}

export default navReducer;
