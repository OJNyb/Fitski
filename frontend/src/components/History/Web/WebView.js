import React, { useState } from "react";

import DayView from "./DayView";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";
import WebCalendar from "../../shared/Calendar/WebCalendar";

const WebView = ({
  date,
  dayIndex,
  currentDay,
  handleDateChange,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleAddExercise,
  displayGroupCircle,
  handleDeleteExercise
}) => {
  const [focused, setFocused] = useState(false);
  useSetLoading(false);

  function handleDateClick(date) {
    handleDateChange(date);
    setFocused(false);
  }

  return (
    <div className="log-container">
      <div className="log-left-container">
        <WebCalendar
          date={date}
          focused={focused}
          onDateClick={handleDateClick}
          displayGroupCircle={displayGroupCircle}
          onFocusChange={({ focused }) => setFocused(focused)}
        />
        <WebViewLeft
          dayIndex={dayIndex}
          currentDay={currentDay}
          handleAddSet={handleAddSet}
          handleEditSet={handleEditSet}
          handleDeleteSet={handleDeleteSet}
          handleDeleteExercise={handleDeleteExercise}
        />
      </div>

      <div className="log-right-container">
        <Exercises handleAddExercise={handleAddExercise} />
      </div>
    </div>
  );
};

const WebViewLeft = ({
  dayIndex,
  currentDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercises,
  handleDeleteExercise
}) => {
  return (
    <div className="history-add-container">
      <DayView
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        setShowExercises={setShowExercises}
        handleDeleteExercise={handleDeleteExercise}
      />
    </div>
  );
};

export default WebView;
