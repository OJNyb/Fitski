import {
  IS_PENDING,
  IS_REJECTED,
  SET_PLAN,
  EDIT_PLAN,
  ADD_WEEK,
  COPY_WEEK,
  REPEAT_WEEK,
  DELETE_WEEK,
  ADD_EXERCISE,
  // EDIT_EXERCISE,
  DELETE_EXERCISE,
  ADD_SET,
  EDIT_SET,
  DELETE_SET
} from "../types/planTypes";

// TODO: If !week/day/woplan

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
    case SET_PLAN: {
      const { woPlan } = payload;
      return {
        ...state,
        woPlan,
        isPending: false
      };
    }

    case ADD_WEEK: {
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
        woPlan
      };
    }

    case COPY_WEEK: {
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
        woPlan
      };
    }

    case REPEAT_WEEK: {
      const { newIds, copyWeek } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const copyWeekIndex = weeks.map(x => x._id).indexOf(copyWeek._id);

      const { days } = copyWeek;

      const newWeeks = [];

      for (let i = 0; i < newIds.length; i++) {
        const newWeekIds = newIds[i];
        console.log(newWeekIds);
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
        woPlan
      };
    }

    case DELETE_WEEK: {
      const { weekId } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const weekIndex = weeks.map(x => x._id).indexOf(weekId);

      weeks.splice(weekIndex, 1);

      return {
        ...state,
        woPlan
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
        ]
      };

      let week = weeks.find(x => x._id === weekId);

      let day = week.days.find(x => x._id === dayId);

      day.exercises.push(newExercise);

      return {
        ...state,
        woPlan
      };
    }

    // case EDIT_EXERCISE: {
    //   const { dayId, weekId, exerId, values } = payload;
    //   const { woPlan } = state;

    //   let week = woPlan.weeks.find(x => x._id === weekId);

    //   let day = week.days.find(x => x._id === dayId);

    //   let { exercises } = day;

    //   let exerciseIndex = exercises.map(x => x._id).indexOf(exerId);

    //   exercises[exerciseIndex] = { ...exercises[exerciseIndex], ...values };

    //   return {
    //     ...state,
    //     woPlan
    //   };
    // }

    case DELETE_EXERCISE: {
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

    case ADD_SET: {
      const { dayId, weekId, exerId, setId, reps } = payload;
      const { woPlan } = state;
      const { weeks } = woPlan;

      const newSet = {
        _id: setId,
        reps
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

      sets[setIndex] = { ...sets[setIndex], reps };

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

      const newSets = sets.filter(x => x._id !== setId);

      exercise.sets = newSets;

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
