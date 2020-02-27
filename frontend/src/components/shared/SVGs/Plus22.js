import React from "react";

const Plus22 = ({ fill }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" width="2" height="22" fill={fill} />
      <rect
        y="12"
        width="2"
        height="22"
        transform="rotate(-90 0 12)"
        fill={fill}
      />
    </svg>
  );
};

export default Plus22;
