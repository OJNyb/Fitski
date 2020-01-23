import React from "react";

const DragIconBig = ({ fill }) => {
  return (
    <svg
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="6" width="20" height="2" fill={fill} />
      <path d="M10 0L14.3301 3.75H5.66987L10 0Z" fill={fill} />
      <path d="M10 14L5.66987 10.25L14.3301 10.25L10 14Z" fill={fill} />
    </svg>
  );
};

export default DragIconBig;
