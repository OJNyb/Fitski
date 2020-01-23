import axios from "axios";
import {
  EDIT_USER,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESS,
  ACTIVATE_PLAN,
  DEACTIVATE_PLAN
} from "../types/userTypes";
import { isSuccessful } from "../utils/errorHandling";
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
  dispatch({
    type: ACTIVATE_PLAN,
    payload: { planId }
  });

  axios
    .post(`/api/history/activate/${planId}`, { startDate })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        axios.post("/feedback/plan/error", { res });
        window.location.reload(true);
      }
    })
    .catch(err => {
      // axios.post("/feedback/plan/error", { err });
      // window.location.reload(true);
    });
}

function deactivatePlan(dispatch, planId) {
  dispatch({
    type: DEACTIVATE_PLAN
  });

  axios
    .post(`/api/history/deactivate/${planId}`)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        axios.post("/feedback/plan/error", { res });
        window.location.reload(true);
      }
    })
    .catch(err => {
      axios.post("/feedback/plan/error", { err });
      window.location.reload(true);
    });
}

export { editUser, activatePlan, deactivatePlan };
