import React, { useState } from "react";
import useHistory from "../../hooks/useHistory";
import { addMGC, formatHistoryDate } from "../../utils/formatHistoryDate";
import { formatMuscleGroups } from "../../utils/displayMuscleGroups";

import Calendar from "react-calendar";
import EditDayTable from "./EditDayTable";
import Exercises from "../shared/Exercises/Exercises";
import Loading from "../shared/SVGs/Loading";

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

const History = () => {
  const { state, dispatch } = useHistory("/history");
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(
    formatHistoryDate(new Date())
  );
  const [showExercises, setShowExercises] = useState(false);

  const { history, error, isPending, isRejected } = state;

  function onDateChange(date) {
    setDate(date);
    setFormattedDate(formatHistoryDate(date));
  }

  if (isRejected) {
    return <p>Error...</p>;
  }

  if (isPending) {
    return <Loading />;
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

  function displayGroupCircle(dateski, view) {
    if (view === "month" && dateski !== date) {
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
          handleDeleteSet={handleDeleteSet}
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
