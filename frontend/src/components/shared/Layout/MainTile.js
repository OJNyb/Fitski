import React from "react";
import useMobile from "../../../hooks/useMobile";

const MainTile = ({ maxWidth, children }) => {
  const isMobile = useMobile();
  let maxW = maxWidth ? maxWidth : 500;

  return (
    <div className="main-tile" style={{ maxWidth: maxW }}>
      {children}
    </div>
  );
};

export default MainTile;
