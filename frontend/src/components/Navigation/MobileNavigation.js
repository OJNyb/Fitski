import React, { useState, useContext } from "react";
import { NavContext } from "../../context/navContext";

import NavigationMenu from "./NavigationMenu";
import { Link } from "react-router-dom";

const MobileNavigation = () => {
  const {
    state: { isWhite, backLink, showNone, showDehaze }
  } = useContext(NavContext);
  const [showNavbar, setShowNavbar] = useState(false);

  let button;
  if (showNone) {
    return null;
  } else if (showDehaze) {
    button = (
      <button
        onClick={() => setShowNavbar(!showNavbar)}
        className="mobile-nav-main-btn"
      >
        <i
          className="material-icons"
          style={{ color: isWhite ? "#a60000" : "#fff" }}
        >
          dehaze
        </i>
      </button>
    );
  } else {
    button = (
      <Link to={backLink} className="mobile-nav-main-btn">
        <i
          className="material-icons-round"
          style={{ color: isWhite ? "#a60000" : "#fff" }}
        >
          arrow_back
        </i>
      </Link>
    );
  }

  return (
    <>
      <div
        className="mobile-nav border-box"
        style={{ backgroundColor: isWhite ? "#fff" : "#a60000" }}
      >
        {button}
      </div>

      <div
        className="mobile-nav-menu-container"
        onClick={() => setShowNavbar(false)}
        style={{
          left: showNavbar ? 0 : "-100%",
          backgroundColor: showNavbar
            ? "rgba(235, 209, 209, 0.5)"
            : "transparent",
          zIndex: showNavbar ? 998 : -1
        }}
      >
        <NavigationMenu />
      </div>
    </>
  );
};
export default MobileNavigation;
