import React from "react";
import useMobile from "../../../hooks/useMobile";

const MainTileHeader = ({ text, icon, customIcon, iconOnClick }) => {
  const isMobile = useMobile();
  return (
    <div className="main-tile-header-upper">
      <span
        style={{
          color: isMobile ? "#a60000" : "#1a1414"
        }}
      >
        {text}
      </span>
      {customIcon ? (
        customIcon
      ) : (
        <div
          className="main-tile-header-icon-container z-mid"
          onClick={iconOnClick}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default MainTileHeader;
