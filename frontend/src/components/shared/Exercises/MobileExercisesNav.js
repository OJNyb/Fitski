import React, { useState, useContext } from "react";
import { NavContext } from "../../../context/navContext";

import MobileModal from "../Modal/MobileModal";
import AddExerciseModal from "./AddExerciseModal";

const MobileExercisesNav = ({ closeExercises, handleAddCustomExercise }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { isWhite }
  } = useContext(NavContext);

  const style = {
    backgroundColor: isWhite ? "#fff" : "#a60000",
    color: isWhite ? "#1a1414" : "#fff"
  };

  const buttonStyle = {
    color: isWhite ? "#a60000" : "#fff"
  };

  return (
    <div className="mobile-exercises-nav flex-ai-center" style={style}>
      <button
        className="padding-0"
        onClick={closeExercises}
        style={buttonStyle}
      >
        <i className="material-icons">arrow_back</i>
      </button>

      <div className="mobile-exercise-nav-items flex-center-space-bw">
        <div className="nav-mid-header-item">
          <h2 className="nav-h2 font-20">Exercises</h2>
        </div>

        <div className="nav-mid-header-item nav-mid-header-button-container">
          <button
            className="mr-15"
            style={buttonStyle}
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
