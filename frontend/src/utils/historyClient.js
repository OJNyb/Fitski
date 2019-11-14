import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_DAY,
  DELETE_DAY,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET,
  COPY_DAY
} from "../types/historyTypes";

const { ObjectId } = Types;

function activatePlan(planId, startDate) {
  axios
    .post(`/history/activate/${planId}`, { startDate })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function addDay(dispatch, date, exercise, values) {
  const dayId = new ObjectId().toHexString();
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();

  const custom = exercise.custom || false;

  dispatch({
    type: ADD_DAY,
    payload: { date, exercise, dayId, exerId, setId, ...values }
  });

  axios
    .post("/history", {
      date,
      setId,
      dayId,
      exerId,
      custom,
      exerciseId: exercise._id,
      ...values
    })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_DAY_FAILED",
          payload: { dayId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "ADD_DAY_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function deleteDay(dispatch, dayId) {
  dispatch({
    type: DELETE_DAY,
    payload: { dayId }
  });

  axios
    .delete(`/history/${dayId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "DELETE_DAY_FAILED",
          payload: { dayId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "DELETE_DAY_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function addExercise(dispatch, dayId, exercise) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();

  const custom = exercise.custom || false;

  dispatch({
    type: ADD_EXERCISE,
    payload: { dayId, exerId, exercise, setId }
  });

  axios
    .post(`/history/exercise/${dayId}`, {
      setId,
      exerId,
      custom,
      exerciseId: exercise._id
    })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_EXERCISE_FAILED",
          payload: { dayId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "ADD_EXERCISE_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function deleteExercise(dispatch, dayId, exerId) {
  dispatch({
    type: DELETE_EXERCISE,
    payload: { dayId, exerId }
  });

  axios
    .delete(`/history/exercise/${dayId}/${exerId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        // throw
      }
    })
    .catch(err => {
      dispatch({
        type: "DELETE_DAY_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function addSet(dispatch, values, dayId, exerId) {
  const setId = new ObjectId().toHexString();

  dispatch({
    type: ADD_SET,
    payload: { dayId, exerId, setId, ...values }
  });

  axios
    .post(`/history/exercise/${dayId}/${exerId}`, { setId, ...values })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_SET_FAILED",
          payload: { dayId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "ADD_SET_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function editSet(dispatch, values, dayId, exerId, setId) {
  const payload = { values, dayId, exerId, setId };
  dispatch({
    type: EDIT_SET,
    payload
  });

  axios
    .post(`/history/exercise/${dayId}/${exerId}/${setId}`, values)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "EDIT_SET_FAILED",
          payload: { dayId, exerId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "EDIT_SET_FAILED",
        payload: { err, dayId, exerId }
      });
      console.error(err.response);
    });
}

function deleteSet(dispatch, dayId, exerId, setId) {
  dispatch({
    type: DELETE_SET,
    payload: { dayId, exerId, setId }
  });

  axios
    .delete(`/history/exercise/${dayId}/${exerId}/${setId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        // throw
      }
    })
    .catch(err => {
      dispatch({
        type: "DELETE_SET_FAILED",
        payload: { dayId }
      });
      console.error(err.response);
    });
}

function getNewExerciseIds(exercises) {
  const newIds = [];
  for (let i = 0; i < exercises.length; i++) {
    const exerId = new ObjectId().toHexString();
    const setIds = [];
    const { sets } = exercises[i];
    for (let i = 0; i < sets.length; i++) {
      setIds.push(new ObjectId().toHexString());
    }
    newIds.push({ exerId, setIds });
  }

  return newIds;
}

function copyDay(dispatch, dayToCopy, formattedDate) {
  const { exercises } = dayToCopy;
  const newDayId = new ObjectId().toHexString();
  const newIds = getNewExerciseIds(exercises);

  console.log(newIds);

  dispatch({
    type: COPY_DAY,
    payload: { dayToCopy, newDayId, newIds, formattedDate }
  });

  axios
    .post("/history/copy", {
      dayToCopyId: dayToCopy._id,
      newDayId,
      newIds,
      formattedDate
    })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "COPY_DAY_FAILED",
          payload: { newDayId }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: "COPY_DAY_FAILED",
        payload: { newDayId }
      });
      console.error(err.response);
    });
}

export {
  activatePlan,
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet,
  copyDay
};
