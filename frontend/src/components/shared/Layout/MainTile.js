import React from "react";

const MainTile = ({ maxWidth, children }) => {
  let maxW = maxWidth ? maxWidth : "500px";

  return (
    <div className="main-tile" style={{ maxWidth: maxW }}>
      {children}
    </div>
  );
};

export default MainTile;
