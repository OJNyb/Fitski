import React from "react";
import useMobile from "../../../hooks/useMobile";

const MainTile = ({ maxWidth, children }) => {
  const isMobile = useMobile();
  let maxW = maxWidth ? maxWidth : "500px";

  return (
    <div className="main-tile" style={{ maxWidth: isMobile ? "100%" : maxW }}>
      {children}
    </div>
  );
};

export default MainTile;
