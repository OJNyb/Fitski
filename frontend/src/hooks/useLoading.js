import { useReducer } from "react";

import loadingReducer from "../reducers/loadingReducer";

const initialState = {
  isLoading: true
};

function useLoading() {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return { state, dispatch };
}

export default useLoading;
