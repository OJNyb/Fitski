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
  DELETE_EXERCISE_SUCCESS,
  ADD_MUSCLEGROUP,
  ADD_MUSCLEGROUP_FAILED,
  ADD_MUSCLEGROUP_SUCCESS,
  EDIT_MUSCLEGROUP,
  EDIT_MUSCLEGROUP_FAILED,
  EDIT_MUSCLEGROUP_SUCCESS,
  DELETE_MUSCLEGROUP,
  DELETE_MUSCLEGROUP_FAILED,
  DELETE_MUSCLEGROUP_SUCCESS
} from "../types/exerciseTypes";
import { isSuccessful, getErrorMessage } from "../utils/errorHandling";

const { ObjectId } = Types;

function addExercise(dispatch, name, muscleGroup, unit) {
  return new Promise((resolve, reject) => {
    const exerciseId = new ObjectId().toHexString();
    const payload = { name, muscleGroup, unit, exerciseId };

    dispatch({
      type: ADD_EXERCISE,
      payload
    });

    axios
      .post("/api/exercise/custom", {
        name,
        muscleGroupId: muscleGroup._id,
        unit,
        exerciseId
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: ADD_EXERCISE_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: ADD_EXERCISE_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: ADD_EXERCISE_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function retryAddExercise(dispatch, exercise) {
  return new Promise((resolve, reject) => {
    const { name, muscleGroup, _id: exerciseId, unit } = exercise;
    const payload = { exerciseId };

    dispatch({
      type: ADD_EXERCISE_RETRY,
      payload
    });

    axios
      .post("/api/exercise/custom", {
        name,
        muscleGroupId: muscleGroup._id,
        exerciseId,
        unit
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: ADD_EXERCISE_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: ADD_EXERCISE_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: ADD_EXERCISE_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function editExercise(dispatch, exerciseId, values) {
  return new Promise((resolve, reject) => {
    const payload = { values, exerciseId };
    const { name, muscleGroup, unit } = values;

    let patch = {};

    if (name) {
      patch.name = name;
    }
    if (muscleGroup) {
      patch.muscleGroupId = muscleGroup._id;
    }

    if (unit) {
      patch.unit = unit;
    }

    dispatch({
      type: EDIT_EXERCISE,
      payload
    });

    axios
      .patch(`/api/exercise/custom/${exerciseId}`, {
        ...patch
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: EDIT_EXERCISE_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: EDIT_EXERCISE_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: EDIT_EXERCISE_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function retryEditExercise(dispatch, exercise) {
  return new Promise((resolve, reject) => {
    const { name, muscleGroup, _id: exerciseId, unit } = exercise;
    const payload = { exerciseId };

    dispatch({
      type: EDIT_EXERCISE_RETRY,
      payload
    });

    axios
      .patch(`/api/exercise/custom/${exerciseId}`, {
        name,
        muscleGroupId: muscleGroup._id,
        unit
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: EDIT_EXERCISE_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: EDIT_EXERCISE_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: EDIT_EXERCISE_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function deleteExercise(dispatch, exerciseIds) {
  return new Promise((resolve, reject) => {
    const payload = { exerciseIds };
    dispatch({
      type: DELETE_EXERCISE,
      payload
    });

    axios
      .delete("/api/exercise", {
        data: { exerciseIds }
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: DELETE_EXERCISE_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: DELETE_EXERCISE_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_EXERCISE_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function addMuscleGroup(dispatch, name, color) {
  return new Promise((resolve, reject) => {
    const muscleGroupId = new ObjectId().toHexString();
    const payload = { name, color, muscleGroupId };

    dispatch({
      type: ADD_MUSCLEGROUP,
      payload
    });

    axios
      .post("/api/exercise/musclegroup", {
        name,
        color,
        muscleGroupId
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: ADD_MUSCLEGROUP_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: ADD_MUSCLEGROUP_SUCCESS,
            payload
          });
          resolve(muscleGroupId);
        }
      })
      .catch(err => {
        dispatch({
          type: ADD_MUSCLEGROUP_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function editMuscleGroup(dispatch, muscleGroupId, values) {
  return new Promise((resolve, reject) => {
    const payload = { values, muscleGroupId };

    dispatch({
      type: EDIT_MUSCLEGROUP,
      payload
    });

    axios
      .patch(`/api/exercise/musclegroup/${muscleGroupId}`, {
        ...values
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: EDIT_MUSCLEGROUP_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: EDIT_MUSCLEGROUP_SUCCESS,
            payload
          });
          resolve(muscleGroupId);
        }
      })
      .catch(err => {
        dispatch({
          type: EDIT_MUSCLEGROUP_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

function deleteMuscleGroup(dispatch, muscleGroupId) {
  return new Promise((resolve, reject) => {
    const payload = { muscleGroupId };
    dispatch({
      type: DELETE_MUSCLEGROUP,
      payload
    });

    axios
      .delete(`/api/exercise/musclegroup/${muscleGroupId}`, {
        data: { muscleGroupId }
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: DELETE_MUSCLEGROUP_FAILED,
            payload
          });
          reject("Request failed");
        } else {
          dispatch({
            type: DELETE_MUSCLEGROUP_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_MUSCLEGROUP_FAILED,
          payload
        });
        const { message } = getErrorMessage(err)[0];
        reject(message);
      });
  });
}

export {
  addExercise,
  retryAddExercise,
  editExercise,
  retryEditExercise,
  deleteExercise,
  addMuscleGroup,
  editMuscleGroup,
  deleteMuscleGroup
};
