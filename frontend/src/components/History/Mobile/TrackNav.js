import React from "react";

const TrackNav = ({ exerciseName, setShowExercise }) => {
  return (
    <div className="height-50 flex-ai-center fixed top-0 z-max bc-a6 width-100p padding-0-5 border-box">
      <button
        className="padding-5 color-white"
        onClick={() => setShowExercise(false)}
      >
        <i className="material-icons">arrow_back</i>
      </button>

      <span className="font-15 font-w-400 color-white">{exerciseName}</span>
    </div>
  );
};

export default TrackNav;
