import React from "react";

const MainTile = ({ maxWidth, children }) => {
  let maxW = maxWidth ? maxWidth : 500;

  return (
    <div className="main-tile" style={{ maxWidth: maxW }}>
      {children}
    </div>
  );
};

export default MainTile;
