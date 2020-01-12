import React from "react";

const NavigateDays = ({ centerText, leftArrowAction, rightArrowAction }) => {
  return (
    <>
      <button
        className="white-material-btn padding-10 padding-15-r-40"
        onClick={leftArrowAction}
      >
        <i className="material-icons-round reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
      <span className="font-15">{centerText}</span>

      <button
        className="white-material-btn padding-15-l-40"
        onClick={rightArrowAction}
      >
        <i className="material-icons-round font-16">arrow_forward_ios</i>
      </button>
    </>
  );
};

export default NavigateDays;
