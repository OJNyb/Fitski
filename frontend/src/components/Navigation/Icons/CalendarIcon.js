import React from "react";

const CalendarIcon = () => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5" y="12" width="3" height="1.5" className="nav-fill" />
      <rect x="5" y="16" width="3" height="1.5" className="nav-fill" />
      <rect x="10" y="8" width="3" height="1.5" className="nav-fill" />
      <rect x="10" y="12" width="3" height="1.5" className="nav-fill" />
      <rect x="10" y="16" width="3" height="1.5" className="nav-fill" />
      <rect x="15" y="8" width="3" height="1.5" className="nav-fill" />
      <rect x="15" y="12" width="3" height="1.5" className="nav-fill" />
      <rect x="5" width="1.2" height="5" rx="0.6" className="nav-fill" />
      <rect x="10.5" width="1.2" height="5" rx="0.6" className="nav-fill" />
      <rect x="16" width="1.2" height="5" rx="0.6" className="nav-fill" />
      <path
        d="M1 3V21C1 21.5523 1.44772 22 2 22H20C20.5523 22 21 21.5523 21 21V3C21 2.44772 20.5523 2 20 2H2C1.44772 2 1 2.44772 1 3Z"
        className="nav-stroke"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export default CalendarIcon;
