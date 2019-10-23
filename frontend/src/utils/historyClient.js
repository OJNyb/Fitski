import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_DAY,
  DELETE_DAY,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET
} from "../reducers/historyTypes";

const { ObjectId } = Types;

// @route POST api/history/activate/:plan_id
// @desc Activate workout plan
// @access Private

// const { startDate } = body;
// const { plan_id: planId } = params;

function activatePlan(planId, startDate) {
  console.log("gay");
  axios
    .post(`/history/activate/${planId}`, { startDate })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

// @route POST api/history
// @desc  Add exercise/notes to new day
// const { unit = "kg", date, exerciseId, notes } = body;
function addDay(dispatch, date, exercise) {
  const dayId = new ObjectId().toHexString();
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();

  dispatch({
    type: ADD_DAY,
    payload: { date, exercise, dayId, exerId, setId }
  });

  axios
    .post("/history", { date, setId, dayId, exerId, exerciseId: exercise._id })
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

// @route DELETE api/history/:day_id
// @desc  Delete day
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

// @route POST api/plan/exercise/:day_id
// @desc Add exercise
// const { unit = "kg", exerId,  exerciseId } = body;
function addExercise(dispatch, dayId, exercise) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();
  //

  dispatch({
    type: ADD_EXERCISE,
    payload: { dayId, exerId, exercise, setId }
  });

  axios
    .post(`/history/exercise/${dayId}`, {
      setId,
      exerId,
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

// @route DELETE api/history/exercise/:day_id/:exercise_id
// @desc Delete exercise

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

// add set
// @route POST api/history/exercise/:day_id/:exercise_id
function addSet(dispatch, dayId, exerId) {
  const setId = new ObjectId().toHexString();

  dispatch({
    type: ADD_SET,
    payload: { dayId, exerId, setId }
  });

  axios
    .post(`/history/exercise/${dayId}/${exerId}`, { setId })
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

// edit
// @route POST api/history/exercise/:day_id/:exercise_id/:set_id
// const { reps, unit, weight, history } = body;
// const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;
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

// delete set
// @route DELETE api/history/exercise/:day_id/:exercise_id/:set_id
// const { day_id: dayId, exercise_id: exerciseId, set_id: setId } = params;
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

export {
  activatePlan,
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet
};
