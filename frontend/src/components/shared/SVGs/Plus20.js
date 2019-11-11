import React from "react";

const Plus20 = ({ fill }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8.75" width="2.5" height="20" fill={fill} />
      <rect y="8.75" width="20" height="2.5" fill={fill} />
    </svg>
  );
};

export default Plus20;
