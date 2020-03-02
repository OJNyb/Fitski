import axios from "axios";
import { isSuccessful } from "../utils/errorHandling";
import {
  ADD_PLAN_SUCCESS,
  REMOVE_PLAN_SUCCESS
} from "../types/userAccessTypes";

import { getErrorMessage } from "../utils/errorHandling";

function addPlan(dispatch, planId) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/user/access/${planId}`)
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          reject("An error occured, please try again");
        } else {
          resolve();
          dispatch({
            type: ADD_PLAN_SUCCESS,
            payload: { planId }
          });
        }
      })
      .catch(err => {
        reject(getErrorMessage(err)[0].message);
      });
  });
}

function removePlan(dispatch, planId) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/user/access/${planId}`)
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          reject("An error occured, please try again");
        } else {
          dispatch({
            type: REMOVE_PLAN_SUCCESS,
            payload: { planId }
          });
          resolve();
        }
      })
      .catch(err => {
        reject(getErrorMessage(err)[0].message);
      });
  });
}

export { addPlan, removePlan };
