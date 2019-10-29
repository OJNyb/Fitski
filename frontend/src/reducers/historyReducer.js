import {
  IS_PENDING,
  IS_REJECTED,
  SET_HISTORY,
  ADD_DAY,
  DELETE_DAY,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET
} from "../types/historyTypes";

import { formatHistoryDate } from "../utils/formatHistoryDate";
import { ensureDecimal } from "../utils/ensureDecimal";

// TODO: If !DAY/day/woplan

function planReducer(state, action) {
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
      // push day to days array in place
      const { date, exercise, dayId, exerId, setId } = payload;
      const { history } = state;
      const { days } = history;
      let formattedDate = formatHistoryDate(date);
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

      const newDay = {
        date: formattedDate,
        _id: dayId,
        exercises: [
          {
            _id: exerId,
            exercise: exercise,
            sets: [
              {
                _id: setId
              }
            ]
          }
        ]
      };

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

    case DELETE_DAY: {
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

    case ADD_EXERCISE: {
      const { exerId, dayId, setId, exercise } = payload;
      const { history } = state;
      const { days } = history;

      const newExercise = {
        _id: exerId,
        exercise,
        sets: [
          {
            _id: setId
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

    // case EDIT_EXERCISE: {
    //   const { values, dayId, exerId } = payload;
    //   const { history } = state;
    //   const { days } = history;

    //   let day = days.find(x => x._id === dayId);

    //   let { exercises } = day;

    //   let exerciseIndex = exercises.map(x => x._id).indexOf(exerId);

    //   exercises[exerciseIndex] = { ...exercises[exerciseIndex], ...values };

    //   return {
    //     ...state,
    //     history
    //   };
    // }

    case DELETE_EXERCISE: {
      const { dayId, exerId } = payload;
      const { history } = state;
      const { days } = history;

      let day = days.find(x => x._id === dayId);

      let exercises = day.exercises.filter(x => x._id !== exerId);

      day.exercises = exercises;

      return {
        ...state,
        history
      };
    }

    case ADD_SET: {
      const { exerId, dayId, setId, reps, weight } = payload;
      const { history } = state;
      const { days } = history;

      let values = {};

      if (reps) {
        values.reps = reps;
      }
      if (weight) {
        values.weight = ensureDecimal(weight);
      }

      const newSet = {
        reps,
        _id: setId,
        ...values
      };

      let day = days.find(x => x._id === dayId);
      let exercise = day.exercises.find(x => x._id === exerId);
      exercise.sets.push(newSet);

      return {
        ...state,
        history
      };
    }

    case EDIT_SET: {
      const { values, dayId, exerId, setId } = payload;
      const { history } = state;
      const { days } = history;
      const { reps, weight } = values;

      if (weight) {
        values.weight = ensureDecimal(weight);
      }

      let day = days.find(x => x._id === dayId);

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        ...values
      };

      return {
        ...state,
        history
      };
    }

    case DELETE_SET: {
      const { dayId, exerId, setId } = payload;
      const { history } = state;
      const { days } = history;

      let day = days.find(x => x._id === dayId);

      let { exercises } = day;
      let exercise = exercises.find(x => x._id === exerId);

      let { sets } = exercise;
      let setIndex = sets.map(x => x._id).indexOf(setId);
      sets.splice(setIndex, 1);

      return {
        ...state,
        history
      };
    }
    default:
      return state;
  }
}

export default planReducer;
