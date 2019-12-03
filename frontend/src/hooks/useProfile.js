import { useEffect, useReducer } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";

import profileReducer from "../reducers/profileReducer";
import { SET_PROFILE, IS_PENDING, IS_REJECTED } from "../types/profileTypes";

// TODO: If !week/day/woplan

const initialState = {
  profile: null,
  isPending: true,
  isRejected: false,
  error: null
};

const useProfile = username => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const user = useUser();

  useEffect(() => {
    let isCancelled = false;

    function fetchData() {
      dispatch({ type: IS_PENDING });
      axios
        .get(`/user/user/${username}`)
        .then(res => {
          if (!isCancelled) {
            dispatch({ type: SET_PROFILE, payload: { profile: res.data } });
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

    if (username !== user.username) {
      fetchData();
    } else {
      dispatch({ type: SET_PROFILE, payload: { profile: user } });
    }

    return () => {
      isCancelled = true;
    };
  }, [user, username]);

  return {
    state,
    dispatch
  };
};

export default useProfile;
