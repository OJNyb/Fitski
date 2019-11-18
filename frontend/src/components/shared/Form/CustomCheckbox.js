import React from "react";

const CustomCheckbox = ({ text, field }) => {
  const { value } = field;
  return (
    <label className="custom-checkbox-container">
      <input type="checkbox" {...field} checked={value} />
      {text}
      <span className="custom-checkmark"></span>
    </label>
  );
};

export default CustomCheckbox;
