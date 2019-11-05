import React, { useState } from "react";

import MobileModal from "../Modal/MobileModal";
import AddExerciseModal from "./AddExerciseModal";

const MobileExercisesNav = ({ closeExercises, handleAddCustomExercise }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mobile-exercises-nav flex-ai-center">
      <button className="tc padding-0" onClick={closeExercises}>
        <i className="material-icons">arrow_back</i>
      </button>

      <div className="mobile-exercise-nav-items flex-center-space-bw">
        <div className="nav-mid-header-item">
          <h2 className="nav-h2 font-20">Exercises</h2>
        </div>

        <div className="nav-mid-header-item nav-mid-header-button-container">
          <button
            className="nav-mid-header-more-btn theme-btn-no-border"
            onClick={() => setShowModal(true)}
          >
            <i className="material-icons nav-mid-header-more-icon">add</i>
          </button>
        </div>
      </div>

      {showModal && (
        <MobileModal
          header={"New Exercise"}
          children={
            <AddExerciseModal onAddCustomExercise={handleAddCustomExercise} />
          }
          toggleModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MobileExercisesNav;
