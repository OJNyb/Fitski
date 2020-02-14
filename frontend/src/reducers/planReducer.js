import {
  IS_PENDING,
  IS_REJECTED,
  SET_PLAN,
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
  REORDER_EXERCISE,
  REORDER_EXERCISE_FAILED,
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

function planReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_REJECTED: {
      const { error } = payload;
      if (error) {
        const { data } = error;
        if (data) {
          const { error: err } = data;
          if (err) {
            const { details } = err;
            if (details) {
              var { message } = details[0];
            }
          }
        }
      }

      if (!message) message = "An error occured, please refresh the page...";

      return {
        ...state,
        error: message,
        isRejected: true,
        isPending: false
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
    case SET_PLAN: {
      const { data } = payload;
      const { woPlan, hasAccess } = data;
      return {
        ...state,
        woPlan,
        hasAccess,
        isPending: false
      };
    }

    case EDIT_PLAN: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          isPending: true,
          isRejected: false
        }
      };
    }

    case EDIT_PLAN_SUCCESS: {
      const { values } = payload;
      const { woPlan } = state;
      const newPlan = {
        ...woPlan,
        ...values,
        isPending: false,
        isRejected: false
      };
      return {
        ...state,
        woPlan: newPlan
      };
    }

    case EDIT_PLAN_FAILED: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          isRejected: true,
          isPending: false
        }
      };
    }

    case ADD_WEEK: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          awPending: true,
          awRejected: false
        }
      };
    }

    case ADD_WEEK_SUCCESS: {
      const { weekArray } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      weekArray.forEach(x => {
        x.days = x.days.map(x => {
          return { _id: x._id, exercises: [] };
        });
        weeks.push(x);
      });

      return {
        ...state,
        woPlan: {
          ...woPlan,
          awPending: false,
          awRejected: false
        }
      };
    }

    case ADD_WEEK_FAILED: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          awRejected: true,
          awPending: false
        }
      };
    }

    case COPY_WEEK: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          cwPending: true,
          cwRejected: false
        }
      };
    }

    case COPY_WEEK_SUCCESS: {
      const { newIds, weekId, copyWeek } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const weekIndex = weeks.map(x => x._id).indexOf(weekId);

      const week = weeks[weekIndex];

      const { days } = copyWeek;

      const newDays = [];

      for (let i = 0; i < days.length; i++) {
        const oldDay = days[i];
        const newDayIds = newIds[i];
        const { exercises: oldExercises } = oldDay;
        const { dayId: newDayId, exercises: newExercises } = newDayIds;
        const exercises = [];
        for (let i = 0; i < newExercises.length; i++) {
          const oldExercise = oldExercises[i];
          const newExerciseIds = newExercises[i];
          const { sets: oldSets } = oldExercise;
          const { exerId, setIds: newSetIds } = newExerciseIds;
          const newSets = [];
          for (let i = 0; i < newSetIds.length; i++) {
            const oldSet = oldSets[i];
            const newSetId = newSetIds[i];
            newSets.push({ ...oldSet, _id: newSetId });
          }
          exercises.push({ ...oldExercise, _id: exerId, sets: newSets });
        }
        newDays.push({ _id: newDayId, exercises });
      }

      week.days = newDays;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          cwPending: false,
          cwRejected: false
        }
      };
    }

    case COPY_WEEK_FAILED: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          cwRejected: true,
          cwPending: false
        }
      };
    }

    case REPEAT_WEEK: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          rwPending: true,
          rwRejected: false
        }
      };
    }

    case REPEAT_WEEK_SUCCESS: {
      const { newIds, copyWeek } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const copyWeekIndex = weeks.map(x => x._id).indexOf(copyWeek._id);

      const { days } = copyWeek;

      const newWeeks = [];

      for (let i = 0; i < newIds.length; i++) {
        const newWeekIds = newIds[i];
        const { weekId, days: newDayIds } = newWeekIds;
        const newDays = [];

        for (let i = 0; i < days.length; i++) {
          const oldDay = days[i];
          const { exercises: oldExercises } = oldDay;
          const { dayId: newDayId, exercises: newExercises } = newDayIds[i];
          const exercises = [];
          for (let i = 0; i < newExercises.length; i++) {
            const oldExercise = oldExercises[i];
            const newExerciseIds = newExercises[i];
            const { sets: oldSets } = oldExercise;
            const { exerId, setIds: newSetIds } = newExerciseIds;
            const newSets = [];
            for (let i = 0; i < newSetIds.length; i++) {
              const oldSet = oldSets[i];
              const newSetId = newSetIds[i];
              newSets.push({ ...oldSet, _id: newSetId });
            }
            exercises.push({ ...oldExercise, _id: exerId, sets: newSets });
          }
          newDays.push({ _id: newDayId, exercises });
        }
        newWeeks.push({ _id: weekId, days: newDays });
      }
      weeks.splice(copyWeekIndex + 1, 0, ...newWeeks);

      return {
        ...state,
        woPlan: {
          ...woPlan,
          rwPending: false,
          rwRejected: false
        }
      };
    }

    case REPEAT_WEEK_FAILED: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          rwRejected: true,
          rwPending: false
        }
      };
    }

    case DELETE_WEEK: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          dwPending: true,
          dwRejected: false
        }
      };
    }

    case DELETE_WEEK_SUCCESS: {
      const { weekId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const weekIndex = weeks.map(x => x._id).indexOf(weekId);

      weeks.splice(weekIndex, 1);

      return {
        ...state,
        woPlan: {
          ...woPlan,
          dwPending: false,
          dwRejected: false
        }
      };
    }

    case DELETE_WEEK_FAILED: {
      const { woPlan } = state;

      return {
        ...state,
        woPlan: {
          ...woPlan,
          dwRejected: true,
          dwPending: false
        }
      };
    }

    case ADD_EXERCISE: {
      const { exerId, dayId, weekId, exercise, setId, reps } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const newExercise = {
        _id: exerId,
        exercise,
        sets: [
          {
            reps,
            _id: setId
          }
        ],
        isPending: true
      };

      let week = weeks.find(x => x._id === weekId);

      let day = week.days.find(x => x._id === dayId);

      day.exercises.push(newExercise);

      return {
        ...state,
        woPlan
      };
    }

    case ADD_EXERCISE_RETRY: {
      const { exerId, dayId, weekId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = true;
      exercise.isRejected = false;

      return {
        ...state,
        woPlan
      };
    }

    case ADD_EXERCISE_SUCCESS: {
      const { exerId, dayId, weekId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = false;

      return {
        ...state,
        woPlan
      };
    }

    case ADD_EXERCISE_FAILED: {
      const { exerId, dayId, weekId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);
      const exercise = day.exercises.find(x => x._id === exerId);

      exercise.isPending = false;
      exercise.isRejected = true;
      exercise.request = "add";

      return {
        ...state,
        woPlan
      };
    }

    case REORDER_EXERCISE: {
      const { result, dayId, weekId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;
      const { source, destination } = result;

      const week = weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);

      const exercise = day.exercises[source.index];

      day.exercises.splice(source.index, 1);
      day.exercises.splice(destination.index, 0, exercise);

      return {
        ...state,
        woPlan
      };
    }

    case REORDER_EXERCISE_FAILED: {
      const { result, dayId, weekId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;
      const { source, destination } = result;

      const week = weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);
      const exercise = day.exercises[destination.index];

      day.exercises.splice(destination.index, 1);
      day.exercises.splice(source.index, 0, exercise);

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_EXERCISE: {
      const { dayId, weekId, exerId } = payload;
      const { woPlan } = state;

      const week = woPlan.weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);

      day.exercises.forEach(x => {
        if (x._id === exerId) {
          x.isPending = true;
          x.isRejected = false;
        }
      });

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_EXERCISE_SUCCESS: {
      const { dayId, weekId, exerId } = payload;
      const { woPlan } = state;

      let week = woPlan.weeks.find(x => x._id === weekId);

      let day = week.days.find(x => x._id === dayId);

      let exercises = day.exercises.filter(x => x._id !== exerId);

      day.exercises = exercises;

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_EXERCISE_FAILED: {
      const { dayId, weekId, exerId } = payload;
      const { woPlan } = state;

      const week = woPlan.weeks.find(x => x._id === weekId);
      const day = week.days.find(x => x._id === dayId);

      day.exercises.forEach(x => {
        if (x._id === exerId) {
          x.isPending = false;
          x.isRejected = true;
          x.request = "delete";
        }
      });

      return {
        ...state,
        woPlan
      };
    }

    case ADD_SET: {
      const { dayId, weekId, exerId, setId, reps } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const newSet = {
        _id: setId,
        reps,
        isPending: true
      };

      if (!weeks) {
        return {
          ...state
        };
      }

      const week = weeks.find(x => x._id === weekId);
      if (!week) {
        return {
          ...state
        };
      }
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      const { sets } = exercise;

      sets.push(newSet);

      return {
        ...state,
        woPlan
      };
    }

    case ADD_SET_RETRY: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      const set = sets.find(x => x._id === setId);

      set.isPending = true;
      set.isRejected = false;

      return {
        ...state,
        woPlan
      };
    }

    case ADD_SET_SUCCESS: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      const set = sets.find(x => x._id === setId);

      set.isPending = false;

      return {
        ...state,
        woPlan
      };
    }

    case ADD_SET_FAILED: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      const set = sets.find(x => x._id === setId);

      set.isPending = false;
      set.isRejected = true;
      set.request = "add";

      return {
        ...state,
        woPlan
      };
    }

    case EDIT_SET: {
      const { dayId, weekId, exerId, setId, reps } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      if (!weeks) {
        return {
          ...state
        };
      }
      const week = weeks.find(x => x._id === weekId);
      if (!week) {
        return {
          ...state
        };
      }
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      if (!day) {
        return {
          ...state
        };
      }
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      if (!exercise) {
        return {
          ...state
        };
      }
      const { sets } = exercise;

      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = { ...sets[setIndex], reps, isPending: true };

      return {
        ...state,
        woPlan
      };
    }

    case EDIT_SET_RETRY: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        isPending: true,
        isRejected: false
      };

      return {
        ...state,
        woPlan
      };
    }

    case EDIT_SET_SUCCESS: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        isPending: false
      };

      return {
        ...state,
        woPlan
      };
    }

    case EDIT_SET_FAILED: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      let setIndex = sets.map(x => x._id).indexOf(setId);

      sets[setIndex] = {
        ...sets[setIndex],
        isPending: false,
        isRejected: true,
        request: "edit"
      };

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_SET: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const week = woPlan.weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      sets.forEach(x => {
        if (x._id === setId) {
          x.isPending = true;
        }
      });

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_SET_SUCCESS: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const week = woPlan.weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      const newSets = sets.filter(x => x._id !== setId);

      exercise.sets = newSets;

      return {
        ...state,
        woPlan
      };
    }

    case DELETE_SET_FAILED: {
      const { dayId, weekId, exerId, setId } = payload;
      const { woPlan } = state;

      const week = woPlan.weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
      const { sets } = exercise;

      sets.forEach(x => {
        if (x._id === setId) {
          x.isPending = false;
          x.isRejected = true;
          x.request = "delete";
        }
      });

      return {
        ...state,
        woPlan
      };
    }

    default:
      return state;
  }
}

export default planReducer;
