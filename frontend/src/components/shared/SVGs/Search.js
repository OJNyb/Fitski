import React from "react";

const Search = ({ stroke }) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7.5" fill="transparent" stroke={stroke} />
      <rect
        x="12.9818"
        y="13.7253"
        width="1.05144"
        height="6.04074"
        transform="rotate(-45 12.9818 13.7253)"
        fill={stroke}
      />
    </svg>
  );
};

export default Search;
