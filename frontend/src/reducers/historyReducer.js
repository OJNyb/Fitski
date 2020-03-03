import {
  IS_PENDING,
  IS_REJECTED,
  SET_HISTORY,
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
  REORDER_EXERCISE,
  REORDER_EXERCISE_FAILED,
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
  REQUEST_FAILED
} from "../types/historyTypes";

import { formatHistoryDate } from "../utils/formatHistoryDate";
import { ensureDecimal } from "../utils/ensureDecimal";
import Axios from "axios";

function historyReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: payload.error
      };
    }
    case IS_PENDING: {
      return {
        ...state,
        isPending: true,
        isRejected: false,
        error: null
      };
    }
    case SET_HISTORY: {
      const { history } = payload;
      return {
        ...state,
        history,
        isPending: false
      };
    }

    case ADD_DAY: {
      const {
        date,
        exercise,
        dayId,
        exerId,
        setId,
        reps,
        weight,
        note,
        rpe
      } = payload;
      const { history } = state;
      const { days } = history;
      let formattedDate = formatHistoryDate(date);
      let insertIndex = days.length - 1;

      if (days.length) {
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].date > formattedDate) {
            insertIndex = i;
          } else {
            break;
          }
        }
      }

      const newDay = {
        date: formattedDate,
        _id: dayId,
        isPending: true
      };

      if (note) {
        newDay.note = note;
      } else {
        let values = {
          rpe: rpe ? rpe : 0,
          reps: reps ? reps : 0,
          weight: weight ? ensureDecimal(weight) : 0.0
        };

        newDay.exercises = [
          {
            _id: exerId,
            exercise: exercise,
            sets: [
              {
                _id: setId,
                ...values
              }
            ]
          }
        ];
      }

      history.days.splice(insertIndex, 0, newDay);

      return {
        ...state,
        history
      };
    }

    case ADD_DAY_SUCCESS: {
      const { dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      day.isPending = false;

      return {
        ...state,
        history
      };
    }

    case ADD_DAY_FAILED: {
      const { dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      day.isPending = false;
      day.isRejected = true;
      day.request = "add";

      return {
        ...state,
        history
      };
    }

    case ADD_DAY_RETRY: {
      const { dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      day.isPending = true;
      day.isRejected = false;

      return {
        ...state,
        history
      };
    }

    case EDIT_DAY: {
      const { dayId, note } = payload;
      const { history } = state;

      const { days } = history;

      const day = days.find(x => x._id === dayId);

      day.notePending = true;
      day.note = note;

      return {
        ...state,
        history
      };
    }

    case EDIT_DAY_SUCCESS: {
      const { dayId } = payload;
      const { history } = state;

      const { days } = history;

      const day = days.find(x => x._id === dayId);

      day.notePending = false;

      return {
        ...state,
        history
      };
    }

    case EDIT_DAY_FAILED: {
      const { dayId } = payload;
      const { history } = state;

      const { days } = history;

      const day = days.find(x => x._id === dayId);

      day.notePending = false;
      day.noteRejected = true;

      return {
        ...state,
        history
      };
    }

    case DELETE_DAY: {
      const { dayId } = payload;
      const { history } = state;

      const { days } = history;

      const day = days.find(x => x._id === dayId);

      day.exercises[0].isPending = true;

      return {
        ...state,
        history
      };
    }

    case DELETE_DAY_SUCCESS: {
      const { dayId } = payload;
      const { history } = state;

      const { days } = history;

      const dayIndex = days.map(x => x._id).indexOf(dayId);
      days.splice(dayIndex, 1);

      return {
        ...state,
        history
      };
    }

    case DELETE_DAY_FAILED: {
      const { dayId } = payload;
      const { history } = state;

      const { days } = history;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;
      exercises[0].isPending = false;
      exercises[0].isRejected = true;
      exercises[0].request = "delete";

      return {
        ...state,
        history
      };
    }

    case ADD_EXERCISE: {
      const { exerId, dayId, setId, exercise, reps, weight, rpe } = payload;
      const { history } = state;
      const { days } = history;

      let values = {
        reps: reps ? reps : 0,
        weight: weight ? ensureDecimal(weight) : 0.0,
        rpe: rpe ? rpe : 0
      };

      const newExercise = {
        _id: exerId,
        exercise,
        isPending: true,
        sets: [
          {
            _id: setId,
            ...values
          }
        ]
      };

      let day = days.find(x => x._id === dayId);

      day.exercises.push(newExercise);

      return {
        ...state,
        history
      };
    }

    case ADD_EXERCISE_RETRY: {
      const { exerId, dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = true;
      exercise.isRejected = false;

      return {
        ...state,
        history
      };
    }

    case ADD_EXERCISE_SUCCESS: {
      const { exerId, dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = false;
      exercise.isRejected = false;

      return {
        ...state,
        history
      };
    }

    case ADD_EXERCISE_FAILED: {
      const { exerId, dayId } = payload;
      const { history } = state;
      const { days } = history;

      const day = days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = false;
      exercise.isRejected = true;
      exercise.request = "add";

      return {
        ...state,
        history
      };
    }

    case REORDER_EXERCISE: {
      const { result, dayId } = payload;
      const { history } = state;
      const { days } = history;
      const { source, destination } = result;

      let day = days.find(x => x._id === dayId);

      const exercise = day.exercises[source.index];

      day.exercises.splice(source.index, 1);
      day.exercises.splice(destination.index, 0, exercise);

      return {
        ...state,
        history
      };
    }

    case REORDER_EXERCISE_FAILED: {
      const { result, dayId } = payload;
      const { history } = state;
      const { days } = history;

      const { source, destination } = result;

      let day = days.find(x => x._id === dayId);

      const exercise = day.exercises[destination.index];

      day.exercises.splice(destination.index, 1);
      day.exercises.splice(source.index, 0, exercise);

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISE: {
      const { dayId, exerId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let exercise = day.exercises.find(x => x._id === exerId);
      exercise.isPending = true;

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISE_SUCCESS: {
      const { dayId, exerId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      day.isPending = false;
      day.isRejected = false;

      let exercises = day.exercises.filter(x => x._id !== exerId);

      day.exercises = exercises;

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISE_FAILED: {
      const { dayId, exerId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let exercise = day.exercises.find(x => x._id === exerId);
      exercise.isPending = false;
      exercise.isRejected = true;
      exercise.request = "delete";

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISES: {
      const { dayId, exerIds } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      day.exercises.forEach(x => {
        if (exerIds.indexOf(x._id) > -1) {
          x.isPending = true;
        }
      });

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISES_SUCCESS: {
      const { dayId, exerIds } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let exercises = day.exercises.filter(x => exerIds.indexOf(x._id) === -1);

      day.exercises = exercises;

      return {
        ...state,
        history
      };
    }

    case DELETE_EXERCISES_FAILED: {
      const { dayId, exerIds } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }
      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      day.exercises.forEach(x => {
        if (exerIds.indexOf(x._id) > -1) {
          x.isPending = false;
          x.isRejected = true;
          x.request = "delete";
        }
      });

      return {
        ...state,
        history
      };
    }

    case ADD_SET: {
      const { exerId, dayId, setId, reps, weight, rpe } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      let values = {
        reps: reps ? reps : 0,
        weight: weight ? ensureDecimal(weight) : 0.0,
        rpe: rpe ? rpe : 0
      };

      const newSet = {
        reps,
        _id: setId,
        isPending: true,
        ...values
      };

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      let exercise = day.exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      exercise.sets.push(newSet);

      return {
        ...state,
        history
      };
    }

    case ADD_SET_RETRY: {
      const { exerId, dayId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      const day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      const exercise = day.exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      const set = exercise.sets.find(x => x._id === setId);
      set.isPending = true;
      set.isRejected = false;

      return {
        ...state,
        history
      };
    }

    case ADD_SET_SUCCESS: {
      const { exerId, dayId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      const day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      const exercise = day.exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      const set = exercise.sets.find(x => x._id === setId);
      set.isPending = false;

      return {
        ...state,
        history
      };
    }

    case ADD_SET_FAILED: {
      const { exerId, dayId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      const day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      const exercise = day.exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      const set = exercise.sets.find(x => x._id === setId);
      set.isPending = false;
      set.isRejected = true;
      set.request = "add";

      return {
        ...state,
        history
      };
    }

    case EDIT_SET: {
      const { values, dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      const { weight } = values;

      if (!days) {
        return {
          ...state
        };
      }

      if (weight) {
        values.weight = ensureDecimal(weight);
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        ...values,
        isPending: true
      };

      return {
        ...state,
        history
      };
    }

    case EDIT_SET_RETRY: {
      const { values, dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      const { weight } = values;

      if (!days) {
        return {
          ...state
        };
      }

      if (weight) {
        values.weight = ensureDecimal(weight);
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        ...values,
        isRejected: false,
        isPending: true
      };

      return {
        ...state,
        history
      };
    }

    case EDIT_SET_SUCCESS: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;

      if (!days) {
        return {
          ...state
        };
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        isPending: false
      };

      return {
        ...state,
        history
      };
    }

    case EDIT_SET_FAILED: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;

      if (!days) {
        return {
          ...state
        };
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        isPending: false,
        isRejected: true,
        request: "edit"
      };

      return {
        ...state,
        history
      };
    }

    case DELETE_SET: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);
      sets[setIndex].isPending = true;

      return {
        ...state,
        history
      };
    }

    case DELETE_SET_SUCCESS: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);
      sets.splice(setIndex, 1);

      return {
        ...state,
        history
      };
    }

    case DELETE_SET_FAILED: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      if (!history) {
        return {
          ...state
        };
      }
      const { days } = history;
      if (!days) {
        return {
          ...state
        };
      }

      let day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }

      let { sets } = exercise;
      let set = sets.find(x => x._id === setId);

      set.isPending = false;
      set.isRejected = true;
      set.request = "delete";

      return {
        ...state,
        history
      };
    }

    case COPY_DAY: {
      const { dayToCopy, newDayId, newIds, formattedDate } = payload;
      const { exercises } = dayToCopy;
      const { history } = state;
      const { days } = history;
      let insertIndex;

      if (days.length) {
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].date > formattedDate) {
            insertIndex = i;
          } else {
            break;
          }
        }
      }

      const newExercises = [];

      for (let i = 0; i < exercises.length; i++) {
        const { sets } = exercises[i];
        const ids = newIds[i];
        const { exerId, setIds } = ids;
        const newSets = [];
        for (let i = 0; i < sets.length; i++) {
          newSets.push({ ...sets[i], _id: setIds[i] });
        }
        newExercises.push({
          ...exercises[i],
          _id: exerId,
          sets: newSets
        });
      }

      const newDay = { _id: newDayId, date: formattedDate, exercises };

      if (insertIndex) {
        history.days.splice(insertIndex, 0, newDay);
      } else {
        history.days.push(newDay);
      }

      return {
        ...state,
        history
      };
    }

    case REQUEST_FAILED: {
      let err;
      if (payload) {
        err = payload.err;
      }

      Axios.post("/feedback/history/error", { err });
      window.location.reload(true);
      return {
        ...state
      };
    }

    default:
      return state;
  }
}

export default historyReducer;
