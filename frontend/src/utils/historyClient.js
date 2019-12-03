import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_DAY,
  DELETE_DAY,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  DELETE_EXERCISES,
  ADD_SET,
  EDIT_SET,
  DELETE_SET,
  COPY_DAY,
  REQUEST_FAILED
} from "../types/historyTypes";
import { isSuccessful } from "./errorHandling";
import { getNewExerciseIds } from "./historyUtils";

const { ObjectId } = Types;

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

function deleteDay(dispatch, dayId) {
  dispatch({
    type: DELETE_DAY,
    payload: { dayId }
  });

  axios
    .delete(`/history/${dayId}`)
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

function deleteExercise(dispatch, dayId, exerId) {
  dispatch({
    type: DELETE_EXERCISE,
    payload: { dayId, exerId }
  });

  axios
    .delete(`/history/exercise/${dayId}/${exerId}`)
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

function deleteExercises(dispatch, dayId, exerIds) {
  dispatch({
    type: DELETE_EXERCISES,
    payload: { dayId, exerIds }
  });

  axios
    .delete(`/history/exercise/${dayId}`, {
      data: { exerciseIds: exerIds }
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

function addSet(dispatch, values, dayId, exerId) {
  const setId = new ObjectId().toHexString();

  dispatch({
    type: ADD_SET,
    payload: { dayId, exerId, setId, ...values }
  });

  axios
    .post(`/history/exercise/${dayId}/${exerId}`, { setId, ...values })
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

function editSet(dispatch, values, dayId, exerId, setId) {
  const payload = { values, dayId, exerId, setId };
  dispatch({
    type: EDIT_SET,
    payload
  });

  axios
    .post(`/history/exercise/${dayId}/${exerId}/${setId}`, values)
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

function deleteSet(dispatch, dayId, exerId, setId) {
  dispatch({
    type: DELETE_SET,
    payload: { dayId, exerId, setId }
  });

  axios
    .delete(`/history/exercise/${dayId}/${exerId}/${setId}`)
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

function copyDay(dispatch, dayToCopy, formattedDate) {
  const { exercises } = dayToCopy;
  const newDayId = new ObjectId().toHexString();
  const newIds = getNewExerciseIds(exercises);

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
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  deleteExercises,
  addSet,
  editSet,
  deleteSet,
  copyDay
};
