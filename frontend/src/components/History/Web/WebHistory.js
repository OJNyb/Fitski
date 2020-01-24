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
  handleAddSet,
  handleCopyDay,
  handleEditSet,
  handleDeleteSet,
  handleDateChange,
  handleAddExercise,
  handleAddSetRetry,
  displayGroupCircle,
  handleEditSetRetry,
  handleDeleteExercise,
  handleReorderExercise,
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

          <DayView
            dayIndex={dayIndex}
            currentDay={currentDay}
            handleAddSet={handleAddSet}
            onCopyClick={handleCopyClick}
            handleEditSet={handleEditSet}
            handleDeleteSet={handleDeleteSet}
            handleDeleteExercise={handleDeleteExercise}
            handleAddSetRetry={handleAddSetRetry}
            handleEditSetRetry={handleEditSetRetry}
            onDragEnd={handleReorderExercise}
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

export default WebView;