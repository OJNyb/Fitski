import React from "react";

const EditHistoryDownNav = ({
  centerText,
  leftArrowAction,
  rightArrowAction
}) => {
  return (
    <>
      <button className="theme-btn-no-border" onClick={leftArrowAction}>
        <i className="material-icons reversed-icon font-16">
          arrow_forward_ios
        </i>
      </button>
      <span>{centerText}</span>

      <button className="theme-btn-no-border" onClick={rightArrowAction}>
        <i className="material-icons font-16">arrow_forward_ios</i>
      </button>
    </>
  );
};

export default EditHistoryDownNav;
