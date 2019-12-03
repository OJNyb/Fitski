import React from "react";

const Label = ({ text }) => {
  return (
    <div className="exercises-add-modal-label color-gray width-100p font-14">
      <b>{text}:</b>
    </div>
  );
};

export default Label;
