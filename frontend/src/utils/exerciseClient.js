import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_EXERCISE,
  EDIT_EXERCISE,
  DELETE_EXERCISE
} from "../types/exerciseTypes";

const { ObjectId } = Types;

function addExercise(dispatch, name, category) {
  const exerciseId = new ObjectId().toHexString();

  dispatch({
    type: ADD_EXERCISE,
    payload: { name, category, exerciseId }
  });

  axios
    .post("/exercise/custom", {
      name,
      category,
      exerciseId
    })
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_EXERCISE_FAILED",
          payload: { exerciseId }
        });
      }
    })
    .catch(err => console.error(err.response));
}

function editExercise(dispatch, exerciseId, values) {
  const payload = { values, exerciseId };
  dispatch({
    type: EDIT_EXERCISE,
    payload
  });

  axios
    .patch(`/exercise/custom/${exerciseId}`, {
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

function deleteExercise(dispatch, exerciseIds) {
  const payload = { exerciseIds };
  console.log(exerciseIds);
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete("/exercise", {
      data: { exerciseIds }
    })
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
