import React from "react";

import WebExerciseCard from "./WebExerciseCard";

const DayView = ({
  dayIndex,
  currentDay,
  handleAddSet,
  onCopyClick,
  handleEditSet,
  handleDeleteSet,
  handleDeleteExercise
}) => {
  if (dayIndex !== -1) {
    const { exercises, _id: dayId } = currentDay;

    let exerciseDisplay = exercises.map(exercise => {
      if (!exercise || !exercise.exercise) {
        return null;
      } else {
        return (
          <WebExerciseCard
            dayId={dayId}
            key={exercise._id}
            exercise={exercise}
            onAddSet={handleAddSet}
            handleEditSet={handleEditSet}
            handleDeleteSet={handleDeleteSet}
            onDeleteExercise={handleDeleteExercise}
          />
        );
      }
    });

    return <div className="history-add-body">{exerciseDisplay}</div>;
  } else {
    return (
      <div className="history-empty-log-container">
        <p>Workout Log Empty</p>
        <button
          onClick={onCopyClick}
          className="theme-btn-filled history-big-screen-copy-btn"
        >
          Copy Previous Workout
        </button>
        <p className="theme-faded history-big-screen-add-p margin-top-10">
          Start adding exercises
        </p>
      </div>
    );
  }
};

export default DayView;
