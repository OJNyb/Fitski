import React from "react";

import EditDayTable from "./EditDayTable";

const DayView = ({
  dayIndex,
  currentDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercises,
  handleDeleteExercise
}) => {
  if (dayIndex !== -1) {
    return (
      <EditDayTable
        day={currentDay}
        showWeight={true}
        handleAddSet={handleAddSet}
        handleEditSet={handleEditSet}
        handleDeleteSet={handleDeleteSet}
        handleDeleteExercise={handleDeleteExercise}
      />
    );
  } else {
    return (
      <>
        <p>Workout Log Empty</p>
        <div className="history-empty-log-btn-container">
          <button
            className="theme-btn-filled"
            onClick={() => setShowExercises(true)}
          >
            Add Exercise
          </button>
          <button className="theme-btn-filled">Copy Previous Workout</button>
        </div>
      </>
    );
  }
};

export default DayView;
