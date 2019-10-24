import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_EXERCISE,
  EDIT_EXERCISE,
  DELETE_EXERCISE
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

function editExercise(dispatch, values, planId, weekId, dayId, exerciseId) {
  const payload = { weekId, dayId, exerciseId, values };
  dispatch({
    type: EDIT_EXERCISE,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerciseId}`, {
      ...values
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

function deleteExercise(dispatch, planId, weekId, dayId, exerciseId) {
  const payload = { weekId, dayId, exerciseId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerciseId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        console.log("todo");
      }
    })
    .catch(console.error);
}
export { addExercise, editExercise, deleteExercise };
