import React from "react";

const MobileDouble = ({ topContent, bottomContent }) => {
  return (
    <div className="mobile-double-nav-container">
      <div className="mobile-end-container">{topContent}</div>
      <div className="mobile-nav-calendar-container">{bottomContent}</div>
    </div>
  );
};

export default MobileDouble;
