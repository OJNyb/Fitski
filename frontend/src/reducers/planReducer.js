import {
  IS_PENDING,
  IS_REJECTED,
  SET_PLAN,
  EDIT_PLAN,
  ADD_WEEK,
  EDIT_WEEK,
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

      // create weeks with days, id, repeat: 0,
      // days exercises: [], _id

      weekArray.forEach(x => {
        const { _id, dayIdArray } = x;
        let days = [];

        dayIdArray.forEach(day => {
          days.push({
            _id: day._id,
            exercises: []
          });
        });
        weeks.push({
          _id,
          days,
          repeat: 0
        });
      });

      return {
        ...state,
        woPlan
      };
    }

    case EDIT_WEEK: {
      const { weekId, data } = payload;
      const { woPlan } = state;

      const { weeks } = woPlan;

      const weekIndex = weeks.map(x => x._id).indexOf(weekId);

      let week = weeks[weekIndex];

      let patch = {};

      const { copyWeekId } = data;

      if (copyWeekId) {
        patch.days = weeks.find(x => x._id === copyWeekId).days;
      } else {
        patch = {
          ...data
        };
      }

      week = {
        ...week,
        ...patch
      };

      woPlan.weeks[weekIndex] = week;

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

      const week = weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
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

      const week = woPlan.weeks.find(x => x._id === weekId);
      const { days } = week;

      const day = days.find(x => x._id === dayId);
      const { exercises } = day;

      const exercise = exercises.find(x => x._id === exerId);
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
