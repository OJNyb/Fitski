import {
  SHOW_NONE,
  SHOW,
  SHOW_BACK,
  SHOW_DEHAZE,
  CLEAN_STATE,
  SET_PLAN_BACKLINK
} from "../types/navTypes";

function navReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
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

    case SET_PLAN_BACKLINK: {
      return {
        ...state,
        ...payload
      };
    }

    case CLEAN_STATE: {
      const { showNone, backLink, showDehaze } = state;
      return {
        showNone,
        backLink,
        showDehaze,
        search: null
      };
    }

    default:
      return state;
  }
}

export default navReducer;
