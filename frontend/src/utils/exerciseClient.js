import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_EXERCISE,
  EDIT_EXERCISE,
  DELETE_EXERCISE
} from "../types/exerciseTypes";

const { ObjectId } = Types;

// @route GET api/exercise
// @desc Create custom exercise
// @access Private
// router.post(
//   "/custom",
//     const { category, name, exerciseId } = body;

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

// @route GET api/exercise
// @desc Edit custom exercise
// @access Private
// router.patch(
//   "/custom/:exercise_id",
//     const { exercise_id: exerciseId } = params;
//     const { name, category } = body;
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

// @route GET api/exercise
// @desc Delete custom exercise
// @access Private
// router.delete(
//   "/custom/:exercise_id",
//     const { exercise_id: exerciseId } = params;

function deleteExercise(dispatch, exerciseId) {
  const payload = { exerciseId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/exercise/custom/${exerciseId}`)
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
