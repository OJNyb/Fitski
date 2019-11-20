import React, { lazy, useState, Suspense } from "react";
import useHistory from "../../hooks/useHistory";
import { addMGC, formatHistoryDate } from "../../utils/formatHistoryDate";
import { formatMuscleGroups } from "../../utils/displayMuscleGroups";
import useMobile from "../../hooks/useMobile";
import useSetLoading from "../../hooks/useSetLoading";
import moment from "moment";
import { findLastOccurenceOfExercise } from "../../utils/findAllOccurencesOfExercise";
import useTitle from "../../hooks/useTitle";
import CalendarMuscleGroupCircle from "./CalendarMuscleGroupCircle";

import {
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  deleteExercises,
  addSet,
  editSet,
  deleteSet,
  copyDay
} from "../../utils/historyClient";

import SetLoading from "../SetLoading";

import "./history.css";

const MobileView = lazy(() => import("./Mobile/MobileView"));
const WebView = lazy(() => import("./Web/WebView"));

const History = () => {
  const { state, dispatch } = useHistory("/history");

  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    formatHistoryDate(new Date())
  );
  const [showExercises, setShowExercises] = useState(false);
  const { history, error, isPending, isRejected } = state;
  const isMobile = useMobile();
  useTitle("Fitnut - History");

  useSetLoading(isPending);

  function handleDateChange(date) {
    date = new Date(date);
    setDate(date);
    setFormattedDate(formatHistoryDate(date));
  }

  if (isRejected) {
    return <p>Error...</p>;
  }

  if (isPending) {
    return null;
  }

  const { days } = history;
  const historyDates = days.map(x => x.date);
  let dayIndex = historyDates.indexOf(formattedDate);
  let currentDay;
  let dayId;

  if (dayIndex !== -1) {
    currentDay = days[dayIndex];
    dayId = currentDay._id;
  }

  function handleAddExercise(exercise) {
    const { _id: exerciseId } = exercise;
    if (dayIndex === -1) {
      let x = findLastOccurenceOfExercise(days, exerciseId);
      let values = {};
      if (x) {
        const { weight, reps } = x;
        values = { reps, weight };
      }
      addDay(dispatch, date, exercise, values);
    } else {
      let exerciski = currentDay.exercises.filter(
        x => x.exercise._id === exerciseId
      );

      if (exerciski.length) {
        handleAddSet(exerciski[0]._id, exerciseId);
      } else {
        addExercise(dispatch, dayId, exercise);
      }
    }
  }

  function handleDeleteExercise(exerId) {
    const { notes, exercises } = currentDay;
    if (!notes && exercises.length === 1) {
      deleteDay(dispatch, dayId);
    } else {
      deleteExercise(dispatch, dayId, exerId);
    }
  }

  function handleDeleteExercises(exerIds) {
    const { notes, exercises } = currentDay;
    if (!notes && exercises.length - exerIds.length === 0) {
      deleteDay(dispatch, dayId);
    } else {
      deleteExercises(dispatch, dayId, exerIds);
    }
  }

  function handleAddSet(exerId, exerciseId, values) {
    if (!values) {
      let x = findLastOccurenceOfExercise(days, exerciseId);
      if (x) {
        const { weight, reps } = x;
        values = { reps, weight };
      }
    }
    addSet(dispatch, values, dayId, exerId);
  }

  function handleEditSet(values, exerId, setId) {
    editSet(dispatch, values, dayId, exerId, setId);
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, dayId, exerId, setId);
  }

  function handleCopyDay(dayToCopy) {
    copyDay(dispatch, dayToCopy, formattedDate);
  }

  function displayGroupCircle(dateski) {
    dateski = formatHistoryDate(dateski);

    if (dateski !== formattedDate) {
      let index = historyDates.indexOf(dateski);
      if (index !== -1) {
        let muscleGroups = formatMuscleGroups(days[index].exercises);

        let circles = muscleGroups.map(x => {
          let color = addMGC(x);
          return (
            <div>
              <CalendarMuscleGroupCircle fill={color} />
            </div>
          );
        });

        return <div className="calendar-circle-container">{circles}</div>;
      }
    }
  }

  let view;
  if (isMobile) {
    view = (
      <MobileView
        historyDays={days}
        date={moment(date)}
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        onDateChange={handleDateChange}
        handleDeleteSet={handleDeleteSet}
        handleAddExercise={handleAddExercise}
        displayGroupCircle={displayGroupCircle}
        handleDeleteExercises={handleDeleteExercises}
        handleCopyDay={handleCopyDay}
      />
    );
  } else {
    view = (
      <WebView
        date={moment(date)}
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        showExercises={showExercises}
        handleDeleteSet={handleDeleteSet}
        onDateChange={handleDateChange}
        setShowExercises={setShowExercises}
        handleAddExercise={handleAddExercise}
        displayGroupCircle={displayGroupCircle}
        handleDeleteExercise={handleDeleteExercise}
        handleCopyDay={handleCopyDay}
      />
    );
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default History;
