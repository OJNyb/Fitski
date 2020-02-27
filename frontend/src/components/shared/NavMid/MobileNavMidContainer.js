import React, { useContext } from "react";
import { NavContext } from "../../../context/navContext";

const MobileNavMidContainer = ({ children }) => {
  const {
    state: { showDehaze }
  } = useContext(NavContext);
  const style = {
    width: showDehaze ? "calc(100vw - 55px" : "calc(100vw - 45px)",
    left: showDehaze ? "55px" : "45px"
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
