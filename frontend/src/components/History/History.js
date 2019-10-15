import React, { useState } from "react";
import useHistory from "../../hooks/useHistory";
import { addMGC, formatHistoryDate } from "../../utils/formatHistoryDate";

import Calendar from "react-calendar";
import EditDayTable from "./EditDayTable";
import Exercises from "../shared/Exercises/Exercises";

import "./history.css";
import {
  addDay,
  deleteDay,
  addExercise,
  deleteExercise,
  addSet,
  editSet,
  deleteSet
} from "../../utils/historyClient";

// function addDay(dispatch, date, Set) {
// function addExercise(dispatch, dayId, exercise) {
// function deleteDay(dayId) {
// function editExercise(dispatch, values, dayId, exerId) {
// function deleteExercise(dispatch, dayId, exerId) {

const History = () => {
  const { state, dispatch } = useHistory("/history");
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    formatHistoryDate(new Date())
  );
  const [showExercises, setShowExercises] = useState(false);

  const { history, error, isPending, isRejected } = state;

  console.log(history);

  function onDateChange(date) {
    setDate(date);
    setFormattedDate(formatHistoryDate(date));
  }

  if (isRejected) {
    return <p>Error...</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
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
  function handleEditSet(values, dayId, exerId, setId) {
    console.log(dayId, exerId);
    editSet(dispatch, values, dayId, exerId, setId);
  }

  function handleDeleteExercise(_, exerId) {
    const { notes, exercises } = currentDay;
    if (!notes && exercises.length === 1) {
      deleteDay(dispatch, dayId);
    } else {
      deleteExercise(dispatch, dayId, exerId);
    }
  }

  if (isRejected) {
    return <p>Error...</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  let rightDisplay;
  if (showExercises) {
    rightDisplay = <Exercises onAddExercise={handleAddExercise} />;
  } else {
    rightDisplay = (
      <Calendar
        value={date}
        onChange={onDateChange}
        tileContent={({ date, view }) => displayGroupCircle(date, view)}
      />
    );
  }

  function displayGroupCircle(date, view) {
    if (view === "month") {
      date = formatHistoryDate(date);
      let index = historyDates.indexOf(date);
      if (index !== -1) {
        const { muscleGroup } = history.days[index];

        muscleGroup.forEach(x => {
          let color = addMGC(x);
          return <div className={"calendar-circle" + color} />;
        });
      }
    }
  }

  let leftDisplay;

  if (dayIndex !== -1) {
    leftDisplay = (
      <div className="edit-week-add-container">
        {/* <h3>{formatDate(date)}</h3> */}
        <EditDayTable
          day={currentDay}
          showWeight={true}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteExercise={handleDeleteExercise}
        />
      </div>
    );
  } else {
    leftDisplay = (
      <div className="edit-week-add-container">
        {/* <h3>{formatDate(date)}</h3> */}
        <p>Workout Log Empty</p>
        <div className="history-empty-log-btn-container">
          <button
            className="theme-btn-filled"
            onClick={() => setShowExercises(true)}
          >
            {/* <i className="material-icons">add</i> */}
            Add Exercise
          </button>
          <button className="theme-btn-filled">Copy Previous Workout</button>
        </div>
      </div>
    );
  }
  return (
    <div className="log-container">
      <div className="log-left-container">{leftDisplay}</div>
      <div className="log-right-container">
        <div className="log-right-btn-container">
          <button
            className={showExercises ? "theme-btn" : "theme-btn-filled"}
            onClick={() => setShowExercises(false)}
          >
            Calendar
          </button>
          <button
            className={showExercises ? "theme-btn-filled" : "theme-btn"}
            onClick={() => setShowExercises(true)}
          >
            Exercises
          </button>
        </div>
        {rightDisplay}
      </div>
    </div>
  );
};

export default History;
