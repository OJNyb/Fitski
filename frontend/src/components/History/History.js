import React, { useState } from "react";
import useHistory from "../../hooks/useHistory";
import { addMGC, formatHistoryDate } from "../../utils/formatHistoryDate";
import { formatMuscleGroups } from "../../utils/displayMuscleGroups";
import useMobile from "../../hooks/useMobile";
import useSetLoading from "../../hooks/useSetLoading";
import "react-dates/initialize";
import moment from "moment";

import {
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet
} from "../../utils/historyClient";

import MobileView from "./MobileView";
import BigScreenView from "./BigScreenView";

import "./history.css";
import "react-dates/lib/css/_datepicker.css";
import "./calendar-styles.css";

const History = () => {
  const { state, dispatch } = useHistory("/history");

  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    formatHistoryDate(new Date())
  );
  const [showExercises, setShowExercises] = useState(false);
  const { history, error, isPending, isRejected } = state;
  const isMobile = useMobile();

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

  const historyDates = history.days.map(x => x.date);
  let dayIndex = historyDates.indexOf(formattedDate);
  let currentDay;
  let dayId;

  if (dayIndex !== -1) {
    currentDay = history.days[dayIndex];
    dayId = currentDay._id;
  }

  // get dayId
  function handleAddExercise(exercise) {
    if (dayIndex === -1) {
      addDay(dispatch, date, exercise);
    } else {
      let exerciski = currentDay.exercises.filter(
        x => x.exercise._id === exercise._id
      );

      if (exerciski.length) {
        handleAddSet(exerciski[0]._id);
      } else {
        addExercise(dispatch, dayId, exercise);
      }
    }
  }

  function handleAddSet(exerId) {
    addSet(dispatch, dayId, exerId);
  }

  // get dayId
  function handleEditSet(values, exerId, setId) {
    editSet(dispatch, values, dayId, exerId, setId);
  }

  function handleDeleteExercise(exerId) {
    const { notes, exercises } = currentDay;
    if (!notes && exercises.length === 1) {
      deleteDay(dispatch, dayId);
    } else {
      deleteExercise(dispatch, dayId, exerId);
    }
  }

  function handleDeleteSet(exerId, setId) {
    deleteSet(dispatch, dayId, exerId, setId);
  }

  function displayGroupCircle(dateski) {
    dateski = formatHistoryDate(dateski);

    if (dateski !== formattedDate) {
      let index = historyDates.indexOf(dateski);
      if (index !== -1) {
        let muscleGroups = formatMuscleGroups(history.days[index].exercises);

        let circles = muscleGroups.map(x => {
          let color = addMGC(x);
          return <div className={"calendar-circle " + color} key={x} />;
        });

        return <div className="calendar-circle-container">{circles}</div>;
      }
    }
  }

  return (
    <>
      <div
        className="log-container"
        style={{
          marginTop: isMobile ? "0" : "30px"
        }}
      >
        {(isMobile && (
          <MobileView
            date={date}
            dayIndex={dayIndex}
            currentDay={currentDay}
            handleAddSet={handleAddSet}
            handleEditSet={handleEditSet}
            handleDeleteSet={handleDeleteSet}
            handleAddExercise={handleAddExercise}
            onDateChange={handleDateChange}
            displayGroupCircle={displayGroupCircle}
            handleDeleteExercise={handleDeleteExercise}
          />
        )) || (
          <BigScreenView
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
          />
        )}
      </div>
    </>
  );
};

export default History;
