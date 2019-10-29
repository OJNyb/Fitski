import React from "react";

const EditHistoryDownNav = ({
  centerText,
  leftArrowAction,
  rightArrowAction
}) => {
  return (
    <>
      <button className="white-material-btn" onClick={leftArrowAction}>
        <i className="material-icons-round reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
      <span>{centerText}</span>

      <button className="white-material-btn" onClick={rightArrowAction}>
        <i className="material-icons-round font-16">arrow_forward_ios</i>
      </button>
    </>
  );
};

export default EditHistoryDownNav;
