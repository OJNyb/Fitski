import React from "react";

import MobileExerciseCard from "./MobileExerciseCard";
import Plus20 from "../../shared/SVGs/Plus20";

const MobileDayView = ({
  dayIndex,
  currentDay,
  handleAddSet,
  setShowCopyView,
  setShowExercise,
  setShowExercises,
  handleDeleteExercise
}) => {
  if (dayIndex !== -1) {
    const { exercises } = currentDay;
    let exerciseDisplay = exercises.map(exercise => {
      if (!exercise || !exercise.exercise) {
        return null;
      } else {
        return (
          <MobileExerciseCard
            key={exercise._id}
            exercise={exercise}
            onAddSet={handleAddSet}
            setShowExercise={setShowExercise}
            onDeleteExercise={handleDeleteExercise}
          />
        );
      }
    });
    return exerciseDisplay;
  } else {
    return (
      <div className="history-mobile-empty-log-container flex-col-cen">
        <div />
        <p className="color-light-gray">Workout Log Empty</p>
        <div className="history-empty-log-btn-container history-mobile-empty-log-btn-container">
          <button onClick={() => setShowExercises(true)}>
            <Plus20 fill={"#a60000"} />
            <span className="color-light-gray">Start New Workout</span>
          </button>
          <button
            className="theme-btn-no-border"
            onClick={() => setShowCopyView(true)}
          >
            <i className="material-icons-outlined">file_copy</i>
            <span className="color-light-gray">Copy Previous Workout</span>
          </button>
        </div>
      </div>
    );
  }
};

export default MobileDayView;
