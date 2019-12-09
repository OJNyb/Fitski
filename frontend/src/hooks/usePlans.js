import { useRef, useEffect, useReducer } from "react";
import axios from "axios";
import useSkip from "./useSkip";
import plansReducer from "../reducers/plansReducer";
import { SET_PLANS, IS_PENDING, IS_REJECTED } from "../types/plansTypes";

const initialState = {
  woPlans: [],
  isPending: true,
  isRejected: false,
  error: null
};

const usePlans = () => {
  const [state, dispatch] = useReducer(plansReducer, initialState);
  const timesTried = useRef(1);
  const { isPending } = state;
  const { skip } = useSkip(isPending);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(`/plan?skip=${skip}`)
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_PLANS, payload: { woPlans: res.data } });
          }
        })
        .catch(err => {
          if (!isCancelled) {
            if (err.status <= 500) {
              timesTried.current = 3;
            }
            if (timesTried.current < 3) {
              timesTried.current += 1;
              fetchData();
            } else {
              dispatch({
                type: IS_REJECTED,
                payload: { error: err.response }
              });
            }
          }
        });
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [skip]);

  return {
    state,
    dispatch
  };
};

export default usePlans;
