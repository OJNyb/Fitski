import React from "react";

const Filter = ({ fill, stroke }) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="3" width="18" height="2" fill={stroke} />
      <rect x="1" y="9" width="18" height="2" fill={stroke} />
      <rect x="1" y="15" width="18" height="2" fill={stroke} />
      <circle
        cx="6.5"
        cy="4"
        r="1.75"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <circle
        cx="13.5"
        cy="10"
        r="1.75"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <circle
        cx="10"
        cy="16"
        r="1.75"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Filter;
