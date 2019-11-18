import React from "react";

const CustomRadio = ({ text, field, valueski }) => {
  const { value } = field;
  return (
    <label className="custom-checkbox-container">
      <input
        type="radio"
        {...field}
        value={valueski}
        checked={value === valueski}
      />
      {text}
      <span className="custom-checkmark-radio"></span>
    </label>
  );
};

export default CustomRadio;
