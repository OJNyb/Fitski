import React from "react";

const NoteIcon = () => {
  return (
    <svg
      width="25"
      height="21"
      viewBox="0 0 25 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 1H3C2.44772 1 2 1.44772 2 2V19C2 19.5523 2.44772 20 3 20H17C17.5523 20 18 19.5523 18 19V13.5"
        stroke="#1A1414"
        className="main-nav-icon-stroke"
      />
      <rect
        x="5"
        y="5.5"
        width="1.5"
        height="10"
        rx="0.75"
        transform="rotate(-90 5 5.5)"
        fill="#1A1414"
        className="main-nav-icon-fill"
      />
      <rect
        x="5"
        y="10.5"
        width="1.5"
        height="8"
        rx="0.75"
        transform="rotate(-90 5 10.5)"
        fill="#1A1414"
        className="main-nav-icon-fill"
      />
      <path
        d="M5.75 15.5C5.33579 15.5 5 15.1642 5 14.75V14.75C5 14.3358 5.33579 14 5.75 14L10.25 14C10.6642 14 11 14.3358 11 14.75V14.75C11 15.1642 10.6642 15.5 10.25 15.5L5.75 15.5Z"
        fill="#1A1414"
        className="main-nav-icon-fill"
      />
      <path
        d="M13.3261 12.0632L12.3096 14.7978C12.2761 14.8878 12.3766 14.9687 12.4575 14.9167L14.9458 13.3162C14.9988 13.2821 15.0449 13.2382 15.0816 13.187L22.1551 3.31969C22.3185 3.09167 22.2624 2.77381 22.0308 2.61554L21.0923 1.97437C20.8674 1.82074 20.561 1.87533 20.403 2.09716L13.3875 11.9474C13.3621 11.9831 13.3414 12.0221 13.3261 12.0632Z"
        stroke="#1A1414"
        className="main-nav-icon-stroke"
      />
      <path d="M13.8704 11.881L14.9723 12.7675" stroke="black" />
    </svg>
  );
};

export default NoteIcon;
