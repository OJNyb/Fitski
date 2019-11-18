import React, { useState, useContext } from "react";
import { NavContext } from "../../../context/navContext";
import Plus20 from "../SVGs/Plus20";

import AddExerciseModal from "./AddExerciseModal";

const MobileExercisesNav = ({
  header,
  onBackClick,
  handleAddCustomExercise
}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { isWhite }
  } = useContext(NavContext);

  return (
    <div className="fixed z-max height-7vh width-100p top-0 padding-s-10 flex-ai-center bc-a6 color-white stretch">
      <button className="padding-5 color-white" onClick={onBackClick}>
        <i className="material-icons font-22">arrow_back</i>
      </button>

      <div className="mobile-exercise-nav-wrapper flex-center-space-bw border-box height-7vh">
        <div className="nav-mid-header-item">
          <h2 className="font-18 font-w-500 margin-0 mb-1 ml-3">{header}</h2>
        </div>

        <div className="nav-mid-header-item nav-mid-header-button-container padding-5">
          <button onClick={() => setShowModal(true)}>
            <Plus20 fill={"#fff"} />
          </button>
        </div>
      </div>

      {showModal && (
        <AddExerciseModal
          buttonText={"Add"}
          header={"New Exercise"}
          hideModal={() => setShowModal(false)}
          handleSubmit={handleAddCustomExercise}
        />
      )}
    </div>
  );
};

export default MobileExercisesNav;
