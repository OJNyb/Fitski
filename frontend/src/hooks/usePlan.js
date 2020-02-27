import { useState, useEffect, useReducer } from "react";
import axios from "axios";

import planReducer from "../reducers/planReducer";
import { SET_PLAN, IS_PENDING, IS_REJECTED } from "../types/planTypes";

const initialState = {
  woPlan: null,
  isPending: true,
  isRejected: false,
  error: null
};

const usePlan = planId => {
  const [state, dispatch] = useReducer(planReducer, initialState);
  const [refresh, setRefresh] = useState(0);

  function refreshPlan() {
    setRefresh(refresh + 1);
  }

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(`/api/plan/${planId}`)
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_PLAN, payload: { data: res.data } });
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
  }, [planId, refresh]);

  return {
    state,
    dispatch,
    refreshPlan
  };
};

export default usePlan;
