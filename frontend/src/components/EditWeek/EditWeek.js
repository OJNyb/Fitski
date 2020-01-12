import React, { lazy, useState, useContext, Suspense } from "react";
import useMobile from "../../hooks/useMobile";
import { PlanContext } from "../../context/planContext";
import useSetLoading from "../../hooks/useSetLoading";
import { deleteWeek } from "../../utils/planClient";
import { useParams, useHistory } from "react-router-dom";

import { findLastOccurenceOfExercisePlan } from "../../utils/findAllOccurencesOfExercise";
import {
  addSet,
  editSet,
  deleteSet,
  addExercise,
  deleteExercise,
  retryAddExercise,
  retryAddSet,
  retryEditSet
} from "../../utils/planClient";

import SetLoading from "../SetLoading";
import EditWeekNav from "./EditWeekNav";

import "./editWeek.css";

const MobileEditWeek = lazy(() => import("./Mobile/MobileEditWeek"));
const WebEditWeek = lazy(() => import("./Web/WebEditWeek"));

const EditWeek = () => {
  const { push } = useHistory();
  const { state, dispatch } = useContext(PlanContext);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const isMobile = useMobile();
  useSetLoading(false);

  const { woPlan } = state;
  const { weeks } = woPlan;
  const { plan_id: planId, week_id: weekId } = useParams();

  let weekIndex = weeks.map(x => x._id).indexOf(weekId);

  if (weekIndex === -1) {
    return <p>No week with this ID</p>;
  }

  let currentWeek = weeks[weekIndex];
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;

  function handleAddExercise(exercise) {
    let { reps } = findLastOccurenceOfExercisePlan(weeks, exercise._id);
    if (!reps) {
      reps = 0;
    }
    addExercise(dispatch, planId, weekId, dayId, exercise, reps);
  }

  function handleAddExerciseRetry(exer) {
    retryAddExercise(dispatch, planId, weekId, dayId, exer);
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

  function handleAddSetRetry(exerId, set) {
    retryAddSet(dispatch, planId, weekId, dayId, exerId, set);
  }

  function handleEditSet(exerId, setId, reps) {
    editSet(dispatch, reps, planId, weekId, dayId, exerId, setId);
  }

  function handleEditSetRetry(exerId, set) {
    retryEditSet(dispatch, planId, weekId, dayId, exerId, set);
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, planId, weekId, dayId, exerId, setId);
  }

  function handleDeleteWeekSubmit() {
    deleteWeek(dispatch, planId, weekId)
      .then(() => {
        let url = `/plans/${planId}/`;

        if (weeks[weekIndex - 1]) {
          let prevWeekId = weeks[weekIndex - 1]._id;
          url += prevWeekId;
        } else if (weeks[weekIndex + 1]) {
          let nextWeekId = weeks[weekIndex + 1]._id;
          url += nextWeekId;
        }
        push(url);
      })
      .catch(err => console.log(err));
  }

  let view = null;
  if (isMobile) {
    view = (
      <MobileEditWeek
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
        handleAddExerciseRetry={handleAddExerciseRetry}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
      />
    );
  } else {
    view = (
      <WebEditWeek
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
        handleAddExerciseRetry={handleAddExerciseRetry}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
      />
    );
  }

  return (
    <>
      <EditWeekNav
        weeks={weeks}
        weekIndex={weekIndex}
        isMobile={isMobile}
        handleDeleteWeekSubmit={handleDeleteWeekSubmit}
      />
      <Suspense fallback={<SetLoading />}>{view}</Suspense>
    </>
  );
};

export default EditWeek;
