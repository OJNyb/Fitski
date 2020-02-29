import { useReducer } from "react";

import navReducer from "../reducers/navReducer";

const initialState = {
  showNone: false,
  backLink: null,
  showDehaze: true,
  search: null
};

const useNav = () => {
  const [state, dispatch] = useReducer(navReducer, initialState);

  return {
    state,
    dispatch
  };
};

export default useNav;
