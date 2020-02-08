import React from "react";

const SelectedNavBar = ({
  selectedExercises,
  setShowDeleteModal,
  setSelectedExercises
}) => {
  let text = selectedExercises.length > 1 ? "exercises" : "exercise";

  return (
    <div className="bc-theme-ligther width-100p flex-center-space-bw padding-s-10 border-box height-50 fixed">
      <div className="flex-ai-center history-mobile-selected-check-n-span-wrapper">
        <button
          className="padding-5 color-white"
          onClick={() => setSelectedExercises([])}
        >
          <i className="material-icons-outlined">check</i>
        </button>
        <span className="color-white font-w-500 font-14">
          {selectedExercises.length} {text}
        </span>
      </div>

      <div className="flex-ai-center">
        <button
          className="color-white padding-10"
          onClick={() => setShowDeleteModal(true)}
        >
          <i className="material-icons-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export default SelectedNavBar;
