import React from "react";

const FilterIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.77771 9.03783C8.37747 9.533 7.62253 9.533 7.22229 9.03783L3.25422 4.12862C2.72565 3.47468 3.19108 2.5 4.03193 2.5L11.9681 2.5C12.8089 2.5 13.2744 3.47468 12.7458 4.12862L8.77771 9.03783Z"
        fill="#504949"
        className="exercises-web-filter-fill"
      />
      <path
        d="M8 9V13"
        stroke="#504949"
        strokeWidth="1.4"
        className="exercises-web-filter-stroke"
      />
      <path
        d="M7.30006 13L8.7 13L7.30008 14.4L7.30006 13Z"
        fill="#504949"
        className="exercises-web-filter-fill"
      />
    </svg>
  );
};

export default FilterIcon;
