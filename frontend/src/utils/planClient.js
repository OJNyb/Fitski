import axios from "axios";
import { Types } from "mongoose";
import { createWeek, createWeekIds, createWeekdayIds } from "./planUtils";
import { isSuccessful } from "../utils/errorHandling";
import {
  EDIT_PLAN,
  EDIT_PLAN_FAILED,
  EDIT_PLAN_SUCCESS,
  ADD_WEEK,
  ADD_WEEK_FAILED,
  ADD_WEEK_SUCCESS,
  COPY_WEEK,
  COPY_WEEK_FAILED,
  COPY_WEEK_SUCCESS,
  REPEAT_WEEK,
  REPEAT_WEEK_FAILED,
  REPEAT_WEEK_SUCCESS,
  DELETE_WEEK,
  DELETE_WEEK_FAILED,
  DELETE_WEEK_SUCCESS,
  ADD_EXERCISE,
  ADD_EXERCISE_RETRY,
  ADD_EXERCISE_FAILED,
  ADD_EXERCISE_SUCCESS,
  DELETE_EXERCISE,
  DELETE_EXERCISE_FAILED,
  DELETE_EXERCISE_SUCCESS,
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
  DELETE_SET_SUCCESS
} from "../types/planTypes";

const { ObjectId } = Types;

function editPlan(dispatch, planId, values) {
  dispatch({ type: EDIT_PLAN });

  axios
    .post(`/plan/${planId}`, values)
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: EDIT_PLAN_FAILED
        });
      } else {
        dispatch({
          type: EDIT_PLAN_SUCCESS,
          payload: { planId, values }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: EDIT_PLAN_FAILED,
        payload: { err }
      });
    });
}

function addWeeks(dispatch, planId, numberOfWeeks = 1) {
  let weekArray = [];

  for (let i = 0; i < numberOfWeeks; i++) {
    const { _id, days } = createWeek();
    weekArray.push({
      _id,
      days
    });
  }

  dispatch({ type: ADD_WEEK, payload: { planId, weekArray } });

  axios
    .post(`/plan/week/${planId}`, { weekArray })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: ADD_WEEK_FAILED
        });
      } else {
        dispatch({
          type: ADD_WEEK_SUCCESS,
          payload: { planId, weekArray }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ADD_WEEK_FAILED,
        payload: { err }
      });
    });
}

function copyWeek(dispatch, planId, weekId, copyWeek) {
  const newIds = createWeekdayIds(copyWeek);

  dispatch({ type: COPY_WEEK, payload: { newIds, weekId, copyWeek } });

  axios
    .post(`/plan/week/copy/${planId}/${weekId}`, {
      newIds,
      copyWeekId: copyWeek._id
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: COPY_WEEK_FAILED
        });
      } else {
        dispatch({
          type: COPY_WEEK_SUCCESS,
          payload: {
            newIds,
            weekId,
            copyWeek
          }
        });
      }
    })
    .catch(err => {
      dispatch({
        type: COPY_WEEK_FAILED,
        payload: { err }
      });
    });
}

function repeatWeek(dispatch, planId, timesToRepeat, copyWeek) {
  const newIds = [];
  for (let i = 0; i < timesToRepeat; i++) {
    newIds.push(createWeekIds(copyWeek));
  }

  dispatch({ type: REPEAT_WEEK, payload: { newIds, copyWeek } });

  axios
    .post(`/plan/week/repeat/${planId}/${copyWeek._id}`, {
      newIds,
      copyWeekId: copyWeek._id
    })
    .then(res => {
      let isSucc = isSuccessful(res);
      if (!isSucc) {
        dispatch({
          type: REPEAT_WEEK_FAILED
        });
      } else {
        dispatch({ type: REPEAT_WEEK_SUCCESS, payload: { newIds, copyWeek } });
      }
    })
    .catch(err => {
      dispatch({
        type: REPEAT_WEEK_FAILED,
        payload: { err }
      });
    });
}

function deleteWeek(dispatch, planId, weekId) {
  return new Promise((resolve, reject) => {
    const payload = { weekId };
    dispatch({
      type: DELETE_WEEK,
      payload
    });

    axios
      .delete(`/plan/week/${planId}/${weekId}`)
      .then(res => {
        let isSucc = isSuccessful(res);
        if (!isSucc) {
          dispatch({
            type: DELETE_WEEK_FAILED
          });
          return reject();
        } else {
          dispatch({
            type: DELETE_WEEK_SUCCESS,
            payload
          });
          return resolve();
        }
      })
      .catch(err => {
        dispatch({
          type: DELETE_WEEK_FAILED,
          payload: { err }
        });
        reject();
      });
  });
}

function addExercise(dispatch, planId, weekId, dayId, exercise, reps) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();
  const custom = exercise.custom || false;
  const payload = { exerId, weekId, dayId, exercise, setId, reps };

  dispatch({
    type: ADD_EXERCISE,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}`, {
      exerciseId: exercise._id,
      exerId,
      setId,
      reps,
      custom
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

function retryAddExercise(dispatch, planId, weekId, dayId, exer) {
  const { _id: exerId, sets, exercise } = exer;
  const { reps, _id: setId } = sets[0];
  const custom = exercise.custom || false;
  const payload = { exerId, weekId, dayId, exercise, setId, reps };

  dispatch({
    type: ADD_EXERCISE_RETRY,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}`, {
      exerciseId: exercise._id,
      exerId,
      setId,
      reps,
      custom
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

function deleteExercise(dispatch, planId, weekId, dayId, exerId) {
  const payload = { weekId, dayId, exerId };
  dispatch({
    type: DELETE_EXERCISE,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`)
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

function retryAddSet(dispatch, planId, weekId, dayId, exerId, set) {
  const { reps, _id: setId } = set;
  const payload = { weekId, dayId, exerId, setId, reps };

  dispatch({
    type: ADD_SET_RETRY,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}`, {
      reps,
      setId
    })
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

function retryEditSet(dispatch, planId, weekId, dayId, exerId, set) {
  const { reps, _id: setId } = set;
  const payload = { weekId, dayId, exerId, setId, reps };
  dispatch({
    type: EDIT_SET_RETRY,
    payload
  });

  axios
    .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}/${setId}`, {
      reps
    })
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

function deleteSet(dispatch, planId, weekId, dayId, exerId, setId) {
  const payload = { weekId, dayId, exerId, setId };
  dispatch({
    type: DELETE_SET,
    payload
  });

  axios
    .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerId}/${setId}`)
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

export {
  editPlan,
  addWeeks,
  copyWeek,
  repeatWeek,
  deleteWeek,
  addExercise,
  retryAddExercise,
  deleteExercise,
  addSet,
  retryAddSet,
  editSet,
  retryEditSet,
  deleteSet
};
