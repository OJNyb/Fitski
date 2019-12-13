import React, { useState } from "react";

import DayView from "./DayView";
import Exercises from "../../shared/Exercises/Exercises";
import useSetLoading from "../../../hooks/useSetLoading";
import WebCalendar from "../../shared/Calendar/WebCalendar";
import CopyDayModal from "./CopyDayModal";

import "./webHistory.css";

const WebView = ({
  date,
  dayIndex,
  currentDay,
  historyDays,
  handleCopyDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleDateChange,
  handleAddExercise,
  displayGroupCircle,
  handleDeleteExercise,
  handleAddSetRetry,
  handleEditSetRetry,
  handleAddExerciseRetry
}) => {
  const [focused, setFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useSetLoading(false);

  function handleDateClick(date) {
    handleDateChange(date);
    setFocused(false);
  }

  function handleCopyClick() {
    setShowModal(true);
  }

  let modal;
  if (showModal) {
    modal = (
      <CopyDayModal
        historyDays={historyDays}
        onCopyDay={handleCopyDay}
        setShowModal={setShowModal}
        displayGroupCircle={displayGroupCircle}
      />
    );
  }

  return (
    <>
      {modal}
      <div className="log-container">
        <div className="flex-col-cen">
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
            handleCopyClick={handleCopyClick}
            handleDeleteExercise={handleDeleteExercise}
            handleAddSetRetry={handleAddSetRetry}
            handleEditSetRetry={handleEditSetRetry}
            handleAddExerciseRetry={handleAddExerciseRetry}
          />
        </div>

        <div className="flex-col-cen">
          <Exercises handleAddExercise={handleAddExercise} />
        </div>
      </div>
    </>
  );
};

const WebViewLeft = ({
  dayIndex,
  currentDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  handleCopyClick,
  setShowExercises,
  handleDeleteExercise,
  handleAddSetRetry,
  handleEditSetRetry,
  handleAddExerciseRetry
}) => {
  return (
    <div className="history-add-container">
      <DayView
        dayIndex={dayIndex}
        currentDay={currentDay}
        handleAddSet={handleAddSet}
        onCopyClick={handleCopyClick}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        setShowExercises={setShowExercises}
        handleDeleteExercise={handleDeleteExercise}
        handleAddSetRetry={handleAddSetRetry}
        handleEditSetRetry={handleEditSetRetry}
        handleAddExerciseRetry={handleAddExerciseRetry}
      />
    </div>
  );
};

export default WebView;
