import React from "react";
import useMobile from "../../../hooks/useMobile";

const SecondTile = ({ children }) => {
  const isMobile = useMobile();
  return (
    <div
      className="second-tile flex-col-cen"
      style={{
        display: isMobile ? "none" : "flex"
      }}
    >
      <div className="second-tile-wrapper flex-col-cen">{children}</div>
    </div>
  );
};

export default SecondTile;
