import React from "react";

const Circle = ({ fill }) => {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="3" r="3" fill={fill} />
    </svg>
  );
};

export default Circle;
