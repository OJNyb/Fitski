import React, { lazy, useState, useContext, Suspense } from "react";
import useMobile from "../../hooks/useMobile";
import { PlanContext } from "../../context/planContext";
import { findLastOccurenceOfExercisePlan } from "../../utils/findAllOccurencesOfExercise";
import {
  addSet,
  editSet,
  deleteSet,
  addExercise,
  deleteExercise
} from "../../utils/planClient";

import SetLoading from "../SetLoading";
import EditWeekNav from "./EditWeekNav";
import useNavWhiteBack from "../../hooks/useNavWhiteBack";

import "./editWeek.css";

const WeekView = lazy(() => import("./Mobile/WeekView"));
const BigScreenEditWeek = lazy(() => import("./BigScreenEditWeek"));

const EditWeek = ({ match: { params } }) => {
  const { state, dispatch } = useContext(PlanContext);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const isMobile = useMobile();

  const { woPlan } = state;
  const { weeks } = woPlan;
  const { plan_id: planId, week_id: weekId } = params;

  useNavWhiteBack(`/plans/${planId}`);

  let weekIndex = weeks.map(x => x._id).indexOf(weekId);

  if (weekIndex === -1) {
    return <p>No week with this ID</p>;
  }

  let currentWeek = weeks[weekIndex];
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;

  function handleAddExercise(exercise) {
    const { reps } = findLastOccurenceOfExercisePlan(weeks, exercise._id);

    addExercise(dispatch, planId, weekId, dayId, exercise, reps);
  }

  function handleDeleteExercise(exerId) {
    deleteExercise(dispatch, planId, weekId, dayId, exerId);
  }

  function handleAddSet(exerId, exerciseId, reps) {
    if (!reps) {
      reps = findLastOccurenceOfExercisePlan(weeks, exerciseId).reps;
    }
    addSet(dispatch, reps, planId, weekId, dayId, exerId);
  }

  function handleEditSet(exerId, setId, reps) {
    editSet(dispatch, reps, planId, weekId, dayId, exerId, setId);
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, planId, weekId, dayId, exerId, setId);
  }

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
      <BigScreenEditWeek
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
  }

  return (
    <>
      <EditWeekNav weeks={weeks} weekIndex={weekIndex} isMobile={isMobile} />
      <Suspense fallback={SetLoading}>{view}</Suspense>
    </>
  );
};

export default EditWeek;
