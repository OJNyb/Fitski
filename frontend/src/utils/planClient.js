import axios from "axios";
import { Types } from "mongoose";
import { createWeek, createWeekIds, createWeekdayIds } from "./planUtils";
import { isSuccessful } from "../utils/errorHandling";
import {
  EDIT_PLAN,
  ADD_WEEK,
  COPY_WEEK,
  REPEAT_WEEK,
  DELETE_WEEK,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET,
  REQUEST_FAILED
} from "../types/planTypes";

const { ObjectId } = Types;

function editPlan(dispatch, planId, values) {
  dispatch({ type: EDIT_PLAN, payload: { planId, values } });

  axios
    .post(`/plan/${planId}`, values)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: REQUEST_FAILED
        });
      }
    })
    .catch(err => {
      console.log(err.response);
      // dispatch({
      //   type: REQUEST_FAILED,
      //   payload: { err }
      // });
    });
}

function addWeeks(dispatch, planId, numberOfWeeks = 1) {
  let weekArray = [];

  for (let i = 0; i < numberOfWeeks; i++) {
    const { _id, days } = createWeek();
    weekArray.push({
      _id,
      days
    });
  }

  dispatch({ type: ADD_WEEK, payload: { planId, weekArray } });

  axios
    .post(`/plan/week/${planId}`, { weekArray })
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

function copyWeek(dispatch, planId, weekId, copyWeek) {
  const newIds = createWeekdayIds(copyWeek);

  dispatch({ type: COPY_WEEK, payload: { newIds, weekId, copyWeek } });

  axios
    .post(`/plan/week/copy/${planId}/${weekId}`, {
      newIds,
      copyWeekId: copyWeek._id
    })
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

function repeatWeek(dispatch, planId, timesToRepeat, copyWeek) {
  const newIds = [];
  for (let i = 0; i < timesToRepeat; i++) {
    newIds.push(createWeekIds(copyWeek));
  }

  dispatch({ type: REPEAT_WEEK, payload: { newIds, copyWeek } });

  axios
    .post(`/plan/week/repeat/${planId}/${copyWeek._id}`, {
      newIds,
      copyWeekId: copyWeek._id
    })
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

function deleteWeek(dispatch, planId, weekId) {
  const payload = { weekId };
  dispatch({
    type: DELETE_WEEK,
    payload
  });

  axios
    .delete(`/plan/week/${planId}/${weekId}`)
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

function addExercise(dispatch, planId, weekId, dayId, exercise, reps) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();
  const custom = exercise.custom || false;

  dispatch({
    type: ADD_EXERCISE,
    payload: { exerId, weekId, dayId, exercise, setId, reps }
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}`, {
      exerciseId: exercise._id,
      exerId,
      setId,
      reps,
      custom
    })
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

function deleteExercise(dispatch, planId, weekId, dayId, exerId) {
  const payload = { weekId, dayId, exerId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`)
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

function addSet(dispatch, reps, planId, weekId, dayId, exerId) {
  const setId = new ObjectId().toHexString();

  const payload = { weekId, dayId, exerId, setId, reps };
  dispatch({
    type: ADD_SET,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`, {
      reps,
      setId
    })
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

function editSet(dispatch, reps, planId, weekId, dayId, exerId, setId) {
  const payload = { weekId, dayId, exerId, setId, reps };
  dispatch({
    type: EDIT_SET,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}/${setId}`, {
      reps
    })
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

function deleteSet(dispatch, planId, weekId, dayId, exerId, setId) {
  const payload = { weekId, dayId, exerId, setId };
  dispatch({
    type: DELETE_SET,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}/${setId}`)
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
export {
  editPlan,
  addWeeks,
  copyWeek,
  repeatWeek,
  deleteWeek,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet
};
