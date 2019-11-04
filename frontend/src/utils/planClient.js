import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET
} from "../types/planTypes";

const { ObjectId } = Types;

// TODO: What if it fails

function addExercise(dispatch, planId, weekId, dayId, exercise) {
  const _id = new ObjectId().toHexString();

  dispatch({
    type: ADD_EXERCISE,
    payload: { _id, weekId, dayId, exercise }
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}`, {
      exercise: exercise._id,
      _id
    })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_EXERCISE_FAILED",
          payload: { weekId, dayId, _id }
        });
      }
    })
    .catch(err => console.error(err.response));
}

// function editExercise(dispatch, values, planId, weekId, dayId, exerId) {
//   const payload = { weekId, dayId, exerId, values };
//   dispatch({
//     type: EDIT_EXERCISE,
//     payload
//   });

//   axios
//     .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`, {
//       ...values
//     })
//     .then(res => {
//       const { data } = res;
//       const { message } = data;
//       if (message !== "success") {
//         console.log("todo");
//       }
//     })
//     .catch(err => console.error(err.response));
// }

function deleteExercise(dispatch, planId, weekId, dayId, exerId) {
  const payload = { weekId, dayId, exerId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        console.log("todo");
      }
    })
    .catch(console.error);
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        console.log("todo");
      }
    })
    .catch(err => console.error(err.response));
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        console.log("todo");
      }
    })
    .catch(err => console.error(err.response));
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        console.log("todo");
      }
    })
    .catch(err => console.error(err.response));
}
export { addExercise, deleteExercise, addSet, editSet, deleteSet };
