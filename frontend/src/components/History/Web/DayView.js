import React from "react";

import WebExerciseCard from "./WebExerciseCard";

const DayView = ({
  dayIndex,
  isMobile,
  currentDay,
  handleAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercise,
  setShowExercises,
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
            setShowExercise={setShowExercise}
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
        {(isMobile && (
          <div className="history-empty-log-btn-container">
            <button
              className="theme-btn-no-border"
              onClick={() => setShowExercises(true)}
            >
              <i className="material-icons font-28">add</i>
              <span>Add Exercises</span>
            </button>
            <button className="theme-btn-no-border">
              <i className="material-icons-outlined">file_copy</i>
              <span>Copy Previous Workout</span>
            </button>
          </div>
        )) || (
          <>
            <button className="theme-btn-filled history-big-screen-copy-btn">
              Copy Previous Workout
            </button>
            <p
              className="theme-faded history-big-screen-add-p"
              style={{ marginTop: isMobile ? 0 : "10px" }}
            >
              Start adding exercises
            </p>
          </>
        )}
      </div>
    );
  }
};

export default DayView;
