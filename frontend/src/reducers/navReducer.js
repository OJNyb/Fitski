import {
  SINGLE_NAV,
  DOUBLE_NAV,
  IS_WHITE,
  IS_RED,
  SHOW_BACK,
  SHOW_DEHAZE
} from "../types/navTypes";

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

    case IS_WHITE: {
      return {
        ...state,
        isWhite: true
      };
    }

    case IS_RED: {
      return {
        ...state,
        isWhite: false
      };
    }

    case SHOW_DEHAZE: {
      return {
        ...state,
        showDehaze: true,
        backLink: null
      };
    }

    case SHOW_BACK: {
      return {
        ...state,
        showDehaze: false,
        backLink: payload.backLink
      };
    }

    default:
      return state;
  }
}

export default navReducer;
