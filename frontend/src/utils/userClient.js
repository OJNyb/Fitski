import axios from "axios";
import {
  EDIT_USER,
  ACTIVATE_PLAN,
  DEACTIVATE_PLAN,
  REQUEST_FAILED
} from "../types/userTypes";
import { isSuccessful } from "../utils/errorHandling";
import { EDIT_PROFILE } from "../types/profileTypes";

function editUser(dispatch, profileDispatch, values) {
  const { avatar } = values;

  if (avatar) {
    let fD = new FormData();
    fD.append("avatar", avatar);
    axios
      .post("/api/image/avatar", fD)
      .then(res => {
        let isSucc = isSuccessful(res);

        if (!isSucc) {
          return dispatch({
            type: REQUEST_FAILED
          });
        }

        const {
          data: { location }
        } = res;
        const payload = { values: { avatar: location } };
        dispatch({
          type: EDIT_USER,
          payload
        });
        if (profileDispatch) {
          profileDispatch({
            type: EDIT_PROFILE,
            payload
          });
        }
      })
      .catch(err => console.log(err.response));
    delete values.avatar;
  }

  if (Object.keys(values).length === 0) return;

  const payload = { values };
  dispatch({
    type: EDIT_USER,
    payload
  });

  if (profileDispatch) {
    profileDispatch({
      type: EDIT_PROFILE,
      payload
    });
  }

  axios
    .post(`/api/user/edit`, {
      ...values
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        return dispatch({
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
