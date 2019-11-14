import axios from "axios";
import { Types } from "mongoose";
import {
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

// TODO: What if it fails

function createDays() {
  let days = [];

  for (let i = 0; i < 7; i++) {
    const _id = new ObjectId().toHexString();
    days.push({ _id });
  }
  return { days };
}

// const newIds = [
//   {
//     dayId,
//     exercises: [
//       {
//         exerId,
//         setIds: []
//       }
//     ]
//   }
// ];

function createWeekIds(copyWeek) {
  const days = createWeekdayIds(copyWeek);
  const weekId = new ObjectId().toHexString();

  return { weekId, days };
}

function createWeekdayIds(copyWeek) {
  const { days } = copyWeek;
  const newIds = [];
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const { exercises: copyExercises } = day;
    const exercises = [];
    console.log(copyExercises);
    for (let i = 0; i < copyExercises.length; i++) {
      const exercise = copyExercises[i];
      const { sets } = exercise;
      const setIds = [];
      for (let i = 0; i < sets.length; i++) {
        setIds.push(new ObjectId().toHexString());
      }
      const exerId = new ObjectId().toHexString();
      exercises.push({ exerId, setIds });
    }
    const dayId = new ObjectId().toHexString();
    newIds.push({ dayId, exercises });
  }

  return newIds;
}

function createWeek() {
  const _id = new ObjectId().toHexString();
  const { days } = createDays();
  return { _id, days };
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
