import axios from "axios";
import { Types } from "mongoose";
import {
  ADD_DAY,
  ADD_DAY_RETRY,
  ADD_DAY_FAILED,
  ADD_DAY_SUCCESS,
  EDIT_DAY,
  EDIT_DAY_FAILED,
  EDIT_DAY_SUCCESS,
  DELETE_DAY,
  DELETE_DAY_FAILED,
  DELETE_DAY_SUCCESS,
  ADD_EXERCISE,
  ADD_EXERCISE_RETRY,
  ADD_EXERCISE_FAILED,
  ADD_EXERCISE_SUCCESS,
  DELETE_EXERCISE,
  DELETE_EXERCISE_FAILED,
  DELETE_EXERCISE_SUCCESS,
  DELETE_EXERCISES,
  DELETE_EXERCISES_FAILED,
  DELETE_EXERCISES_SUCCESS,
  ADD_SET,
  ADD_SET_RETRY,
  ADD_SET_FAILED,
  ADD_SET_SUCCESS,
  EDIT_SET,
  EDIT_SET_RETRY,
  EDIT_SET_FAILED,
  EDIT_SET_SUCCESS,
  DELETE_SET,
  DELETE_SET_FAILED,
  DELETE_SET_SUCCESS,
  COPY_DAY,
  REORDER_EXERCISE,
  REORDER_EXERCISE_FAILED,
  REORDER_EXERCISE_SUCCESS,
  // TODO:
  REQUEST_FAILED
} from "../types/historyTypes";
import { isSuccessful } from "./errorHandling";
import { getNewExerciseIds } from "./historyUtils";
import { reverseHistoryDate } from "./formatHistoryDate";

const { ObjectId } = Types;

function addDay(dispatch, date, exercise, values) {
  const dayId = new ObjectId().toHexString();
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();
  const payload = { date, exercise, dayId, exerId, setId, ...values };

  const custom = exercise.custom || false;

  dispatch({
    type: ADD_DAY,
    payload
  });

  axios
    .post("/api/history", {
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
          type: ADD_DAY_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_DAY_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_DAY_FAILED,
        payload
      });
    });
}

function addNoteToNewDay(dispatch, date, note) {
  const dayId = new ObjectId().toHexString();
  const payload = { date, dayId, note };

  dispatch({
    type: ADD_DAY,
    payload
  });

  axios
    .post("/api/history", {
      date,
      dayId,
      note
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_DAY_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_DAY_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_DAY_FAILED,
        payload
      });
    });
}

function editDay(dispatch, dayId, note) {
  return new Promise((resolve, reject) => {
    const payload = { dayId, note };

    dispatch({
      type: EDIT_DAY,
      payload
    });

    axios
      .patch("/api/history", {
        dayId,
        note
      })
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: EDIT_DAY_FAILED,
            payload
          });
          return reject();
        } else {
          dispatch({
            type: EDIT_DAY_SUCCESS,
            payload
          });
          resolve();
        }
      })
      .catch(() => {
        dispatch({
          type: EDIT_DAY_FAILED,
          payload
        });
        reject();
      });
  });
}

function retryAddDay(dispatch, day) {
  const { _id: dayId, exercises, date } = day;
  const { sets, _id: exerId, exercise } = exercises[0];
  const { reps, weight, _id: setId } = sets[0];

  let dateObject = reverseHistoryDate(date);

  const payload = { dayId };

  const custom = exercise.custom || false;

  dispatch({
    type: ADD_DAY_RETRY,
    payload
  });

  axios
    .post("/api/history", {
      date: dateObject,
      setId,
      dayId,
      exerId,
      custom,
      exerciseId: exercise._id,
      reps,
      weight
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_DAY_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_DAY_SUCCESS,
          payload
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ADD_DAY_FAILED,
        payload
      });
    });
}

function deleteDay(dispatch, dayId) {
  const payload = { dayId };
  dispatch({
    type: DELETE_DAY,
    payload
  });

  axios
    .delete(`/api/history/${dayId}`)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: DELETE_DAY_FAILED,
          payload
        });
      } else {
        dispatch({
          type: DELETE_DAY_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: DELETE_DAY_FAILED,
        payload
      });
    });
}

function addExercise(dispatch, dayId, exercise) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();

  const custom = exercise.custom || false;
  const payload = { dayId, exerId, exercise, setId };

  dispatch({
    type: ADD_EXERCISE,
    payload
  });

  axios
    .post(`/api/history/exercise/${dayId}`, {
      setId,
      exerId,
      custom,
      exerciseId: exercise._id
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

function retryAddExercise(dispatch, dayId, exer) {
  const { _id: exerId, sets, exercise } = exer;
  const custom = exercise.custom || false;
  const { _id: setId } = sets[0];
  const payload = { dayId, exerId };

  dispatch({
    type: ADD_EXERCISE_RETRY,
    payload
  });

  axios
    .post(`/api/history/exercise/${dayId}`, {
      setId,
      exerId,
      custom,
      exerciseId: exercise._id
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

function reorderExercise(dispatch, dayId, result) {
  const { source, destination, draggableId } = result;
  const payload = { result, dayId };

  dispatch({
    type: REORDER_EXERCISE,
    payload
  });

  axios
    .patch(`/api/history/reorder/${dayId}`, {
      exerId: draggableId,
      from: source.index,
      to: destination.index
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: REORDER_EXERCISE_FAILED,
          payload
        });
      } else {
        dispatch({
          type: REORDER_EXERCISE_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: REORDER_EXERCISE_FAILED,
        payload
      });
    });
}

function deleteExercise(dispatch, dayId, exerId) {
  const payload = { dayId, exerId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/api/history/exercise/${dayId}/${exerId}`)
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

function deleteExercises(dispatch, dayId, exerIds) {
  const payload = { dayId, exerIds };
  dispatch({
    type: DELETE_EXERCISES,
    payload
  });

  axios
    .delete(`/api/history/exercise/${dayId}`, {
      data: { exerciseIds: exerIds }
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: DELETE_EXERCISES_FAILED,
          payload
        });
      } else {
        dispatch({
          type: DELETE_EXERCISES_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: DELETE_EXERCISES_FAILED,
        payload
      });
    });
}

function addSet(dispatch, values, dayId, exerId) {
  const setId = new ObjectId().toHexString();
  const payload = { dayId, exerId, setId, ...values };

  dispatch({
    type: ADD_SET,
    payload
  });

  axios
    .post(`/api/history/exercise/${dayId}/${exerId}`, { setId, ...values })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_SET_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_SET_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_SET_FAILED,
        payload
      });
    });
}

function retryAddSet(dispatch, dayId, exerId, set) {
  const { _id: setId } = set;
  const { reps, weight } = set;
  const payload = { dayId, exerId, setId };

  dispatch({
    type: ADD_SET_RETRY,
    payload
  });

  axios
    .post(`/api/history/exercise/${dayId}/${exerId}`, { setId, reps, weight })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_SET_FAILED,
          payload
        });
      } else {
        dispatch({
          type: ADD_SET_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: ADD_SET_FAILED,
        payload
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
    .post(`/api/history/exercise/${dayId}/${exerId}/${setId}`, values)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: EDIT_SET_FAILED,
          payload
        });
      } else {
        dispatch({
          type: EDIT_SET_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: EDIT_SET_FAILED,
        payload
      });
    });
}

function retryEditSet(dispatch, dayId, exerId, set) {
  const { reps, weight, _id: setId } = set;
  const values = { reps, weight };
  const payload = { values, dayId, exerId, setId };
  dispatch({
    type: EDIT_SET_RETRY,
    payload
  });

  axios
    .post(`/api/history/exercise/${dayId}/${exerId}/${setId}`, values)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: EDIT_SET_FAILED,
          payload
        });
      } else {
        dispatch({
          type: EDIT_SET_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: EDIT_SET_FAILED,
        payload
      });
    });
}

function deleteSet(dispatch, dayId, exerId, setId) {
  const payload = { dayId, exerId, setId };
  dispatch({
    type: DELETE_SET,
    payload
  });

  axios
    .delete(`/api/history/exercise/${dayId}/${exerId}/${setId}`)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: DELETE_SET_FAILED,
          payload
        });
      } else {
        dispatch({
          type: DELETE_SET_SUCCESS,
          payload
        });
      }
    })
    .catch(() => {
      dispatch({
        type: DELETE_SET_FAILED,
        payload
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
    .post("/api/history/copy", {
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
  retryAddDay,
  editDay,
  deleteDay,
  addNoteToNewDay,
  addExercise,
  retryAddExercise,
  reorderExercise,
  deleteExercise,
  deleteExercises,
  addSet,
  retryAddSet,
  editSet,
  retryEditSet,
  deleteSet,
  copyDay
};
