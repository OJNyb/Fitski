import React from "react";

const CustomRadio = ({ text, field, valueski }) => {
  return (
    <label className="custom-checkbox-container">
      <input type="radio" {...field} value={valueski} />
      {text}
      <span className="custom-checkmark-radio"></span>
    </label>
  );
};

export default CustomRadio;
