import axios from "axios";
import { isSuccessful } from "../utils/errorHandling";
import {
  ADD_PLAN,
  REMOVE_PLAN,
  REQUEST_FAILED
} from "../types/userAccessTypes";

function addPlan(dispatch, planId) {
  dispatch({
    type: ADD_PLAN,
    payload: { planId }
  });

  axios
    .post(`/user/access/${planId}`)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: REQUEST_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: REQUEST_FAILED,
        payload: { err }
      });
    });
}

function removePlan(dispatch, planId) {
  dispatch({
    type: REMOVE_PLAN,
    payload: { planId }
  });

  axios
    .delete(`/user/access/${planId}`)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: REQUEST_FAILED
        });
      }
    })
    .catch(err => {
      dispatch({
        type: REQUEST_FAILED,
        payload: { err }
      });
    });
}

export { addPlan, removePlan };
