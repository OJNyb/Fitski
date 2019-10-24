import { useReducer } from "react";

import navReducer from "../reducers/navReducer";

// TODO: If !week/day/woplan

const initialState = {
  isDouble: false
};

const useNav = () => {
  const [state, dispatch] = useReducer(navReducer, initialState);

  return {
    state,
    dispatch
  };
};

export default useNav;
