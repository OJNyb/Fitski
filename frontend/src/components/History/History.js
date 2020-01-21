import React, { lazy, useState, Suspense } from "react";
import useHistory from "../../hooks/useHistory";
import { formatHistoryDate } from "../../utils/formatHistoryDate";
import { formatMuscleGroups } from "../../utils/displayMuscleGroups";
import useMobile from "../../hooks/useMobile";
import useSetLoading from "../../hooks/useSetLoading";
import moment from "moment";
import { findLastOccurenceOfExercise } from "../../utils/findAllOccurencesOfExercise";
import useTitle from "../../hooks/useTitle";
import CalendarMuscleGroupCircle from "./CalendarMuscleGroupCircle";

import {
  addDay,
  retryAddDay,
  deleteDay,
  addExercise,
  retryAddExercise,
  deleteExercise,
  deleteExercises,
  addSet,
  retryAddSet,
  editSet,
  retryEditSet,
  deleteSet,
  copyDay,
  reorderExercise
} from "../../utils/historyClient";

import SetLoading from "../SetLoading";

import "./history.css";

const MobileView = lazy(() => import("./Mobile/MobileHistory"));
const WebView = lazy(() => import("./Web/WebHistory"));

const History = () => {
  const { state, dispatch } = useHistory();

  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    formatHistoryDate(new Date())
  );
  const { history, isPending, isRejected } = state;
  const isMobile = useMobile();
  useTitle("Fitnut - Calendar");

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

  function handleAddExerciseRetry(exer) {
    if (days[dayIndex].isRejected) {
      retryAddDay(dispatch, days[dayIndex]);
    } else {
      retryAddExercise(dispatch, dayId, exer);
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

  function handleAddSetRetry(exerId, set) {
    retryAddSet(dispatch, dayId, exerId, set);
  }

  function handleEditSet(values, exerId, setId) {
    editSet(dispatch, values, dayId, exerId, setId);
  }

  function handleEditSetRetry(exerId, set) {
    retryEditSet(dispatch, dayId, exerId, set);
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, dayId, exerId, setId);
  }

  function handleCopyDay(dayToCopy) {
    copyDay(dispatch, dayToCopy, formattedDate);
  }

  function handleReorderExercise(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    reorderExercise(dispatch, dayId, result);
  }

  function displayGroupCircle(dateski) {
    dateski = formatHistoryDate(dateski);

    if (dateski !== formattedDate) {
      let index = historyDates.indexOf(dateski);
      if (index !== -1) {
        let muscleGroups = formatMuscleGroups(days[index].exercises);

        let circles = muscleGroups.map(x => {
          let color = x.color;
          console.log(x);
          return (
            <div key={x}>
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
        handleCopyDay={handleCopyDay}
        handleDeleteSet={handleDeleteSet}
        handleDateChange={handleDateChange}
        handleAddExercise={handleAddExercise}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
        displayGroupCircle={displayGroupCircle}
        handleDeleteExercises={handleDeleteExercises}
        handleReorderExercise={handleReorderExercise}
        handleAddExerciseRetry={handleAddExerciseRetry}
      />
    );
  } else {
    view = (
      <WebView
        historyDays={days}
        date={moment(date)}
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleCopyDay={handleCopyDay}
        handleDeleteSet={handleDeleteSet}
        handleDateChange={handleDateChange}
        handleAddExercise={handleAddExercise}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
        displayGroupCircle={displayGroupCircle}
        handleDeleteExercise={handleDeleteExercise}
        handleReorderExercise={handleReorderExercise}
        handleAddExerciseRetry={handleAddExerciseRetry}
      />
    );
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default History;
