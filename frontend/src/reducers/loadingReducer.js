import { IS_LOADING, IS_SETTLED } from "../types/loadingTypes";

function loadingReducer(state, action) {
  const { type } = action;

  switch (type) {
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case IS_SETTLED: {
      return {
        ...state,
        isLoading: false
      };
    }

    default:
      return state;
  }
}

export default loadingReducer;
