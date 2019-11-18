import axios from "axios";
import { Types } from "mongoose";
import { createWeek, createWeekIds, createWeekdayIds } from "./planUtils";
import {
  EDIT_PLAN,
  ADD_WEEK,
  COPY_WEEK,
  REPEAT_WEEK,
  DELETE_WEEK,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET
} from "../types/planTypes";

const { ObjectId } = Types;

function activatePlan(activatePlan, planId, startDate) {
  activatePlan(planId);
  axios
    .post(`/history/activate/${planId}`, { startDate })
    .then(res => console.log(res))
    .catch(err => console.log(err.response));
}

function deactivatePlan(deactivatePlan, planId) {
  deactivatePlan();
  axios
    .post(`/history/deactivate/${planId}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function editPlan(dispatch, planId, values) {
  dispatch({ type: EDIT_PLAN, payload: { planId, values } });

  axios.post(`/plan/${planId}`, values);
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_WEEK_FAILED",
          payload: { planId, weekArray }
        });
      }
    })
    .catch(err => console.error(err.response));
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "COPY_WEEK_FAILED",
          payload: { weekId }
        });
      }
    })
    .catch(err => console.error(err.response));
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "COPY_WEEK_FAILED",
          payload: { newIds }
        });
      }
    })
    .catch(err => console.error(err.response));
}

function deleteWeek(dispatch, planId, weekId) {
  const payload = { weekId };
  dispatch({
    type: DELETE_WEEK,
    payload
  });

  axios
    .delete(`/plan/week/${planId}/${weekId}`)
    .then(res => {
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "COPY_WEEK_FAILED",
          payload: { weekId }
        });
      }
    })
    .catch(err => console.error(err.response));
}

function addExercise(dispatch, planId, weekId, dayId, exercise, reps) {
  const exerId = new ObjectId().toHexString();
  const setId = new ObjectId().toHexString();
  const custom = exercise.custom || false;

  dispatch({
    type: ADD_EXERCISE,
    payload: { exerId, weekId, dayId, exercise, setId, reps }
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
      const { data } = res;
      const { message } = data;
      if (message !== "success") {
        dispatch({
          type: "ADD_EXERCISE_FAILED",
          payload: { weekId, dayId, exerId }
        });
      }
    })
    .catch(err => console.error(err.response));
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
  console.log("editting");
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
export {
  activatePlan,
  deactivatePlan,
  editPlan,
  addWeeks,
  copyWeek,
  repeatWeek,
  deleteWeek,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet
};
