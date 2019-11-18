import React, { useContext } from "react";
import { NavContext } from "../../../context/navContext";

const MobileNavMidContainer = ({ children }) => {
  const {
    state: { showDehaze }
  } = useContext(NavContext);
  const style = {
    width: showDehaze ? "calc(100vw - 64px" : "calc(100vw - 52px)",
    left: showDehaze ? "44px" : "42px",
    margin: showDehaze ? "0 10px" : "0 10px 0 0"
  };
  return (
    <div
      className="flex-center-space-bw nav-mid-mobile-header-container fixed z-mid"
      style={style}
    >
      {children}
    </div>
  );
};

export default MobileNavMidContainer;
