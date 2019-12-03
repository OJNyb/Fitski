import React from "react";

const SearchThick = ({ stroke }) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="transparent"
        stroke={stroke}
        strokeWidth="2"
      />
      <rect
        x="12"
        y="13.4142"
        width="2"
        height="6.04074"
        transform="rotate(-45 12 13.4142)"
        fill={stroke}
      />
    </svg>
  );
};

export default SearchThick;
