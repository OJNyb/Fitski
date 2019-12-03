import {
  IS_PENDING,
  IS_REJECTED,
  SET_HISTORY,
  ADD_DAY,
  DELETE_DAY,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  DELETE_EXERCISES,
  ADD_SET,
  EDIT_SET,
  DELETE_SET,
  COPY_DAY,
  REQUEST_FAILED
} from "../types/historyTypes";

import { formatHistoryDate } from "../utils/formatHistoryDate";
import { ensureDecimal } from "../utils/ensureDecimal";
import Axios from "axios";

// TODO: If !DAY/day/woplan

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
      // push day to days array in place
      const { date, exercise, dayId, exerId, setId, reps, weight } = payload;
      const { history } = state;
      const { days } = history;
      let formattedDate = formatHistoryDate(date);
      let insertIndex = days.length - 1;

      let values = {
        reps: reps ? reps : 0,
        weight: weight ? ensureDecimal(weight) : 0.0
      };

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
                _id: setId,
                ...values
              }
            ]
          }
        ]
      };

      history.days.splice(insertIndex, 0, newDay);

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
      const { exerId, dayId, setId, exercise, reps, weight } = payload;
      const { history } = state;
      const { days } = history;

      let values = {
        reps: reps ? reps : 0,
        weight: weight ? ensureDecimal(weight) : 0.0
      };

      const newExercise = {
        _id: exerId,
        exercise,
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

      let exercises = day.exercises.filter(x => x._id !== exerId);

      day.exercises = exercises;

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

      let exercises = day.exercises.filter(x => exerIds.indexOf(x._id) === -1);

      day.exercises = exercises;

      return {
        ...state,
        history
      };
    }

    case ADD_SET: {
      const { exerId, dayId, setId, reps, weight } = payload;
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
        weight: weight ? ensureDecimal(weight) : 0.0
      };

      const newSet = {
        reps,
        _id: setId,
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
