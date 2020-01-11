import { useEffect, useReducer } from "react";
import axios from "axios";

import exerciseReducer from "../reducers/exerciseReducer";
import { IS_PENDING, IS_REJECTED, SET_EXERCISES } from "../types/exerciseTypes";

const initialState = {
  error: null,
  exercises: null,
  isPending: false,
  isRejected: false,
  getExercises: true,
  defExercises: null
};

const useExercises = () => {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  const { getExercises } = state;

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      if (getExercises) {
        dispatch({ type: IS_PENDING });
        axios
          .get("/api/exercise")
          .then(res => {
            if (!isCancelled) {
              dispatch({
                type: SET_EXERCISES,
                payload: { exercises: res.data }
              });
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
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [getExercises]);

  return {
    state,
    dispatch
  };
};

export default useExercises;
