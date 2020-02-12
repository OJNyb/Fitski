import React from "react";

const MoreIcon = ({ d = 23 }) => {
  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 22.8 22.8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="11.5" r="1.5" stroke="#a60000" strokeWidth="0.8" />
      <circle cx="11.5" cy="11.5" r="1.5" stroke="#a60000" strokeWidth="0.8" />
      <circle cx="16.5" cy="11.5" r="1.5" stroke="#a60000" strokeWidth="0.8" />
      <circle cx="11.5" cy="11.5" r="10.8" stroke="#a60000" strokeWidth="1" />
    </svg>
  );
};

export default MoreIcon;
