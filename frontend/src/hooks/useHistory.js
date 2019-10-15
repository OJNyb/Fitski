import { useEffect, useReducer } from "react";
import axios from "axios";

import historyReducer from "../reducers/historyReducer";
import { SET_HISTORY, IS_PENDING, IS_REJECTED } from "../reducers/historyTypes";

// TODO: If !week/day/woplan

const initialState = {
  history: null,
  isPending: true,
  isRejected: false,
  error: null
};

const useHistory = () => {
  const [state, dispatch] = useReducer(historyReducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get("/history")
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_HISTORY, payload: { history: res.data } });
          }
        })
        .catch(err => {
          if (!isCancelled) {
            dispatch({
              type: IS_REJECTED,
              payload: { error: err.response }
            });
          }
        });
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    state,
    dispatch
  };
};

export default useHistory;
