import { useEffect, useReducer } from "react";
import axios from "axios";

import plansReducer from "../reducers/plansReducer";
import { SET_PLANS, IS_PENDING, IS_REJECTED } from "../types/plansTypes";

const initialState = {
  woPlans: null,
  isPending: false,
  isRejected: false,
  error: null
};

const usePlans = () => {
  const [state, dispatch] = useReducer(plansReducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get("/plan")
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_PLANS, payload: { woPlans: res.data } });
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

export default usePlans;
