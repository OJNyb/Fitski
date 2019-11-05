import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import {
  addSet,
  editSet,
  deleteSet,
  addExercise,
  deleteExercise
} from "../../utils/planClient";

import DayHOC from "./DayHOC";
import EditWeekNav from "./EditWeekNav";
import Exercises from "../shared/Exercises/Exercises";
import useNavWhiteSingleBack from "../../hooks/useNavWhiteSingleBackNav";
import WeekView from "./Mobile/WeekView";
import useMobile from "../../hooks/useMobile";

import "./editWeek.css";

function findLastOccurenceOfExercise(weeks, exerciseId) {
  let lastSet;
  for (let i = weeks.length - 1; i >= 0; i--) {
    if (lastSet) break;
    const { days } = weeks[i];
    for (let i = days.length - 1; i >= 0; i--) {
      if (lastSet) break;
      const { exercises } = days[i];
      for (let i = exercises.length - 1; i >= 0; i--) {
        if (lastSet) break;
        const {
          sets,
          exercise: { _id }
        } = exercises[i];
        if (_id === exerciseId) {
          lastSet = sets[sets.length - 1];
          break;
        }
      }
    }
  }
  return lastSet || { reps: 0 };
}

// function findAllOccurencesOfExercise(historyDays, exerciseId) {
//   return historyDays.reduce((accu, curr) => {
//     const filteredExercises = curr.exercises.filter(
//       x => x.exercise._id === exerciseId
//     );

//     if (filteredExercises.length)
//       accu.push({
//         date: curr.date,
//         sets: filteredExercises[0].sets
//       });
//     return accu;
//   }, []);
// }

// function findLastOccurenceOfExercise(historyDays, exerciseId) {
//   let allOcc = findAllOccurencesOfExercise(historyDays, exerciseId);

//   console.log(allOcc);
//   if (allOcc.length) {
//     const { sets } = allOcc[allOcc.length - 1];
//     return sets[sets.length - 1];
//   }
// }

const EditWeek = ({ match: { params } }) => {
  const { state, dispatch } = useContext(PlanContext);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const isMobile = useMobile();

  const { woPlan } = state;
  const { weeks } = woPlan;
  const { plan_id: planId, week_id: weekId } = params;

  console.log(woPlan);

  useNavWhiteSingleBack(`/plans/${planId}`);

  let weekIndex = weeks.map(x => x._id).indexOf(weekId);

  if (weekIndex === -1) {
    return <p>No week with this ID</p>;
  }

  let currentWeek = weeks[weekIndex];
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;

  function handleAddExercise(exercise) {
    const { reps } = findLastOccurenceOfExercise(weeks, exercise._id);

    addExercise(dispatch, planId, weekId, dayId, exercise, reps);
  }

  function handleDeleteExercise(exerId) {
    deleteExercise(dispatch, planId, weekId, dayId, exerId);
  }

  function handleAddSet(exerId, exerciseId, reps) {
    if (!reps) {
      reps = findLastOccurenceOfExercise(weeks, exerciseId).reps;
    }
    addSet(dispatch, reps, planId, weekId, dayId, exerId);
  }

  function handleEditSet(exerId, setId, reps) {
    editSet(dispatch, reps, planId, weekId, dayId, exerId, setId);
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, planId, weekId, dayId, exerId, setId);
  }

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDayIndex(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));

  let view;
  if (isMobile) {
    view = (
      <WeekView
        weeks={weeks}
        planId={planId}
        weekIndex={weekIndex}
        currentWeek={currentWeek}
        handleAddSet={handleAddSet}
        currentDayIndex={currentDayIndex}
        setCurrentDayIndex={setCurrentDayIndex}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        handleAddExercise={handleAddExercise}
        handleDeleteExercise={handleDeleteExercise}
      />
    );
  } else {
    view = (
      <div className="edit-week-container">
        <div className="edit-week-add-container">
          <h2 className="edit-week-header">Days</h2>

          <div className="edit-week-add-days-container">{dayBtns}</div>
          <DayHOC day={currentDay} />
        </div>
        <div className="edit-week-exercise-container">
          <h2 className="edit-week-header">Exercises</h2>
          <Exercises handleAddExercise={handleAddExercise} />;
        </div>
      </div>
    );
  }

  return (
    <>
      <EditWeekNav weeks={weeks} weekIndex={weekIndex} isMobile={isMobile} />
      {view}
    </>
  );
};

export default EditWeek;
