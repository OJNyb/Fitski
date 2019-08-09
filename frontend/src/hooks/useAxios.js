import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DATA = "SET_DATA";
const IS_PENDING = "IS_PENDING";
const IS_REJECTED = "IS_REJECTED";

const initialState = {
  data: null,
  error: null,
  isPending: false,
  isRejected: false
};

function fetchReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case IS_PENDING: {
      return {
        ...state,
        isPending: true,
        isRejected: false,
        error: null
      };
    }

    case IS_REJECTED: {
      return {
        ...state,
        isPending: false,
        isRejected: true,
        error: payload.error
      };
    }

    case SET_DATA: {
      return {
        ...state,
        isPending: false,
        isRejected: false,
        error: null,
        data: payload.data
      };
    }
    default:
      return state;
  }
}

const useAxios = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(url)
        .then(res => {
          if (!isCancelled) {
            const { data } = res;
            dispatch({ type: SET_DATA, payload: { data } });
          }
        })
        .catch(err => {
          if (!isCancelled) {
            dispatch({
              type: IS_REJECTED,
              payload: { error: err.data || err.response }
            });
          }
        });
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { state };
};

export { useAxios };
