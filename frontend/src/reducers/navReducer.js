import {
  SHOW_NONE,
  IS_WHITE,
  IS_RED,
  SHOW,
  SHOW_BACK,
  SHOW_DEHAZE
} from "../types/navTypes";

function navReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
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
        showNone: false,
        showDehaze: true,
        backLink: null
      };
    }

    case SHOW_BACK: {
      const { backLink } = payload;
      return {
        ...state,
        showNone: false,
        backLink,
        showDehaze: false
      };
    }

    case SHOW_NONE: {
      return {
        ...state,
        showNone: true
      };
    }

    case SHOW: {
      return {
        ...state,
        showNone: false
      };
    }

    default:
      return state;
  }
}

export default navReducer;
