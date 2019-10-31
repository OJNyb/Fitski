import React from "react";

const MobileDouble = ({ topContent, bottomContent }) => {
  return (
    <div className="mobile-double-nav-container">
      <div
        className="mobile-end-container"
        style={{ height: bottomContent ? "7.5vh" : "7vh" }}
      >
        {topContent}
      </div>
      {bottomContent && (
        <div className="mobile-nav-calendar-container">{bottomContent}</div>
      )}
    </div>
  );
};

export default MobileDouble;
