import React from "react";

const CustomCheckbox = ({ text, field }) => {
  return (
    <label className="custom-checkbox-container">
      <input type="checkbox" {...field} />
      {text}
      <span className="custom-checkmark"></span>
    </label>
  );
};

export default CustomCheckbox;
