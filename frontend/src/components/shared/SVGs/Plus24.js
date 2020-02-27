import React from "react";

const Plus24 = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="11.05" width="2.1" height="24" fill={fill} />
      <rect y="10.95" width="24" height="2.1" fill={fill} />
    </svg>
  );
};

export default Plus24;
