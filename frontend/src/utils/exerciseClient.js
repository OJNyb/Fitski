import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_EXERCISE,
  ADD_EXERCISE_RETRY,
  ADD_EXERCISE_FAILED,
  ADD_EXERCISE_SUCCESS,
  EDIT_EXERCISE,
  EDIT_EXERCISE_RETRY,
  EDIT_EXERCISE_FAILED,
  EDIT_EXERCISE_SUCCESS,
  DELETE_EXERCISE,
  DELETE_EXERCISE_FAILED,
  DELETE_EXERCISE_SUCCESS
} from "../types/exerciseTypes";
import { isSuccessful } from "../utils/errorHandling";

const { ObjectId } = Types;

function addExercise(dispatch, name, category) {
  const exerciseId = new ObjectId().toHexString();
  const payload = { name, category, exerciseId };

  dispatch({
    type: ADD_EXERCISE,
    payload
  });

  axios
    .post("/exercise/custom", {
      name,
      category,
      exerciseId
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_EXERCISE_FAILED,
        payload
      });
    });
}

function retryAddExercise(dispatch, exercise) {
  const { name, muscleGroup, _id: exerciseId } = exercise;
  const payload = { exerciseId };

  dispatch({
    type: ADD_EXERCISE_RETRY,
    payload
  });

  axios
    .post("/exercise/custom", {
      name,
      category: muscleGroup,
      exerciseId
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_EXERCISE_FAILED,
        payload
      });
    });
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
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: EDIT_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: EDIT_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: EDIT_EXERCISE_FAILED,
        payload
      });
    });
}

function retryEditExercise(dispatch, exercise) {
  const { name, muscleGroup, _id: exerciseId } = exercise;
  const payload = { exerciseId };

  dispatch({
    type: EDIT_EXERCISE_RETRY,
    payload
  });

  axios
    .patch(`/exercise/custom/${exerciseId}`, {
      name,
      category: muscleGroup
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: EDIT_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: EDIT_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: EDIT_EXERCISE_FAILED,
        payload
      });
    });
}

function deleteExercise(dispatch, exerciseIds) {
  const payload = { exerciseIds };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete("/exercise", {
      data: { exerciseIds }
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: DELETE_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: DELETE_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: DELETE_EXERCISE_FAILED,
        payload
      });
    });
}

export {
  addExercise,
  retryAddExercise,
  editExercise,
  retryEditExercise,
  deleteExercise
};
