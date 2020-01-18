import React, { useState } from "react";
import Plus20 from "../../SVGs/Plus20";

import AddExerciseModal from "../AddExerciseModal";

const MobileExercisesNav = ({ header, onBackClick, setShowModal }) => {
  return (
    <div className="fixed z-max height-50 width-100p top-0 padding-s-10 flex-ai-center bc-a6 color-white stretch">
      <button className="padding-5 color-white" onClick={onBackClick}>
        <i className="material-icons font-22">arrow_back</i>
      </button>

      <div className="mobile-exercise-nav-wrapper flex-center-space-bw border-box height-50">
        <div className="nav-mid-header-item">
          <h2 className="font-18 font-w-500 margin-0 mb-1 ml-3">{header}</h2>
        </div>

        <div className="nav-mid-header-item nav-mid-header-button-container">
          <button
            className="padding-7"
            onClick={() => setShowModal({ type: "add" })}
          >
            <Plus20 fill={"#fff"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileExercisesNav;
