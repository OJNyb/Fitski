import React from "react";

const TrackNav = ({ exerciseName, setShowExercise }) => {
  return (
    <div className="height-50 flex-ai-center fixed top-0 z-max bc-a6 width-100p padding-0-5 border-box">
      <button
        className="padding-5 color-white"
        onClick={() => setShowExercise(false)}
      >
        <i className="material-icons font-22">arrow_back</i>
      </button>

      <span className="font-17 font-w-400 color-white m-l-10 mb-1">
        {exerciseName}
      </span>
    </div>
  );
};

export default TrackNav;
