import React from "react";

const CalendarIcon = () => {
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7"
        y="11.25"
        width="1.5"
        height="10"
        rx="0.75"
        transform="rotate(-90 7 11.25)"
        className="nav-fill"
      />
      <rect
        x="7"
        y="7"
        width="1.5"
        height="10"
        rx="0.75"
        transform="rotate(-90 7 7)"
        className="nav-fill"
      />
      <path
        d="M7.75 15.5C7.33579 15.5 7 15.1642 7 14.75V14.75C7 14.3358 7.33579 14 7.75 14L11.25 14C11.6642 14 12 14.3358 12 14.75V14.75C12 15.1642 11.6642 15.5 11.25 15.5L7.75 15.5Z"
        className="nav-fill"
      />
      <rect
        y="15.5"
        width="1.5"
        height="5"
        rx="0.75"
        transform="rotate(-90 0 15.5)"
        className="nav-fill"
      />
      <rect
        y="11.25"
        width="1.5"
        height="5"
        rx="0.75"
        transform="rotate(-90 0 11.25)"
        className="nav-fill"
      />
      <path
        d="M0.75 7C0.335786 7 0 6.66421 0 6.25V6.25C0 5.83579 0.335786 5.5 0.75 5.5L4.25 5.5C4.66421 5.5 5 5.83579 5 6.25V6.25C5 6.66421 4.66421 7 4.25 7L0.75 7Z"
        className="nav-fill"
      />
      <path
        d="M3 20L19 20C19.5523 20 20 19.5523 20 19L20 2C20 1.44772 19.5523 1 19 1L3 1C2.44772 1 2 1.44772 2 2L2 19C2 19.5523 2.44772 20 3 20Z"
        className="nav-stroke"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default CalendarIcon;
