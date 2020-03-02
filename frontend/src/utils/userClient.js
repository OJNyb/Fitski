import axios from "axios";
import {
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
  ACTIVATE_PLAN_SUCCESS,
  DEACTIVATE_PLAN_SUCCESS
} from "../types/userTypes";
import { isSuccessful, getErrorMessage } from "../utils/errorHandling";
import { EDIT_PROFILE } from "../types/profileTypes";

function editUser(dispatch, profileDispatch, values) {
  return new Promise((resolve, reject) => {
    const { avatar } = values;
    if (avatar) {
      let fD = new FormData();
      fD.append("avatar", avatar);
      const payload = { image: true };

      dispatch({
        type: EDIT_USER,
        payload
      });

      axios
        .post("/api/image/avatar", fD)
        .then(res => {
          let isSucc = isSuccessful(res);

          if (!isSucc) {
            dispatch({
              type: EDIT_USER_FAILED
            });
            return reject();
          }

          const {
            data: { location }
          } = res;
          const payload = { values: { avatar: location }, image: true };
          dispatch({
            type: EDIT_USER_SUCCESS,
            payload
          });
          if (profileDispatch) {
            profileDispatch({
              type: EDIT_PROFILE,
              payload
            });
          }
          if (!values.bio) {
            return resolve();
          }
        })
        .catch(() => {
          dispatch({
            type: EDIT_USER_FAILED,
            payload
          });
          return reject();
        });
      delete values.avatar;
    }

    if (Object.keys(values).length > 0) {
      const payload = { values };
      dispatch({
        type: EDIT_USER,
        payload
      });

      axios
        .post(`/api/user/edit`, {
          ...values
        })
        .then(res => {
          let isSucc = isSuccessful(res);
          if (!isSucc) {
            dispatch({
              type: EDIT_USER_FAILED
            });
            return reject();
          }
          dispatch({
            type: EDIT_USER_SUCCESS,
            payload
          });
          if (profileDispatch) {
            profileDispatch({
              type: EDIT_PROFILE,
              payload
            });
          }
          resolve();
        })
        .catch(err => {
          dispatch({
            type: EDIT_USER_FAILED,
            payload: { err }
          });
          reject();
        });
    }
  });
}

function activatePlan(dispatch, planId, startDate) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/history/activate/${planId}`, { startDate })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          reject("Couldn't activate plan, please try again");
        } else {
          dispatch({
            type: ACTIVATE_PLAN_SUCCESS,
            payload: { planId }
          });
          resolve();
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function deactivatePlan(dispatch, planId) {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/history/deactivate/${planId}`)
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          reject("Couldn't deactivate plan, please try again");
        } else {
          dispatch({
            type: DEACTIVATE_PLAN_SUCCESS
          });
          resolve();
        }
      })
      .catch(err => {
        reject(getErrorMessage(err)[0].message);
      });
  });
}

export { editUser, activatePlan, deactivatePlan };
