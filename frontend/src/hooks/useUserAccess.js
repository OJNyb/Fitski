import { useRef, useEffect, useReducer } from "react";
import axios from "axios";

import userAccessReducer from "../reducers/userAccessReducer";
import { SET_ACCESS, IS_PENDING, IS_REJECTED } from "../types/userAccessTypes";
const initialState = {
  accessedPlans: null,
  isPending: true,
  isRejected: false,
  error: null
};

const useUserAccess = () => {
  const [state, dispatch] = useReducer(userAccessReducer, initialState);
  const timesTried = useRef(1);

  useEffect(() => {
    return () => {
      timesTried.current = 1;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get("/user/access")
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_ACCESS, payload: { data: res.data } });
          }
        })
        .catch(err => {
          if (!isCancelled) {
            if (timesTried.current < 3) {
              timesTried.current = timesTried.current + 1;
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
  }, []);

  return {
    state,
    dispatch
  };
};

export default useUserAccess;
