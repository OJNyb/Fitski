import { useEffect, useReducer } from "react";
import axios from "axios";

import planReducer from "../reducers/planReducer";
import { SET_PLAN, IS_PENDING, IS_REJECTED } from "../types/planTypes";

// TODO: If !week/day/woplan

const initialState = {
  woPlan: null,
  isPending: true,
  isRejected: false,
  error: null
};

const usePlan = planId => {
  const [state, dispatch] = useReducer(planReducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(`/api/plan/${planId}`)
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_PLAN, payload: { woPlan: res.data } });
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
  }, [planId]);

  return {
    state,
    dispatch
  };
};

export default usePlan;
