import { useRef, useState, useEffect, useReducer } from "react";
import axios from "axios";

import userReducer from "../reducers/userReducer";
import { SET_USER, IS_PENDING, IS_REJECTED } from "../types/userTypes";
const initialState = {
  user: null,
  isPending: true,
  isRejected: false,
  error: null
};

const useUser = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [reload, setReload] = useState(0);
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
        .get(`/user/me`)
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_USER, payload: { user: res.data } });
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
  }, [reload]);

  return {
    state,
    dispatch,
    reload,
    setReload
  };
};

export default useUser;
