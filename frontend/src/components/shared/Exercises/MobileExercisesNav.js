import React, { useState, useContext } from "react";
import { NavContext } from "../../../context/navContext";
import Plus20 from "../SVGs/Plus20";

import MobileModal from "../Modal/MobileModal";
import AddExerciseModal from "./AddExerciseModal";

const MobileExercisesNav = ({
  editView,
  setEditView,
  closeExercises,
  handleAddCustomExercise
}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { isWhite }
  } = useContext(NavContext);

  const color = isWhite ? "#a60000" : "#fff";

  const style = {
    backgroundColor: isWhite ? "#fff" : "#a60000",
    color: isWhite ? "#1a1414" : "#fff"
  };

  const buttonStyle = {
    color
  };

  return (
    <div
      className="fixed z-max height-7vh width-100p top-0 padding-0-5 flex-ai-center"
      style={style}
    >
      <button
        className="padding-5"
        onClick={closeExercises}
        style={buttonStyle}
      >
        <i className="material-icons">arrow_back</i>
      </button>

      <div className="width-100p ml-10 flex-center-space-bw padding-10 border-box">
        <div className="nav-mid-header-item">
          <h2 className="font-20 font-w-400">Exercises</h2>
        </div>

        <div className="nav-mid-header-item nav-mid-header-button-container">
          <button style={buttonStyle} onClick={() => setEditView(!editView)}>
            <i className="material-icons-outlined">edit</i>
          </button>

          <button style={buttonStyle} onClick={() => setShowModal(true)}>
            <Plus20 fill={color} />
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
