import React, { useState, useContext } from "react";
import { NavContext } from "../../context/navContext";

import NavigationMenu from "./NavigationMenu";
import { Link } from "react-router-dom";

import "./mobileNavigation.css";

const MobileNavigation = () => {
  const { state } = useContext(NavContext);
  const { backLink, onBackClick, showDehaze, text, buttons } = state;
  const [showNavbar, setShowNavbar] = useState(false);

  let style = {
    marginTop: showDehaze ? "0" : "1px"
  };

  let button;
  if (showDehaze) {
    button = (
      <button
        onClick={() => setShowNavbar(!showNavbar)}
        className="mobile-nav-main-btn padding-5"
      >
        <i className="material-icons" style={{ color: "#fff" }}>
          dehaze
        </i>
      </button>
    );
  } else {
    if (backLink) {
      button = (
        <Link to={backLink} className="mobile-nav-back-btn">
          <i className="material-icons-round" style={{ color: "#fff" }}>
            arrow_back
          </i>
        </Link>
      );
    } else if (onBackClick) {
      button = (
        <button onClick={onBackClick} className="mobile-nav-back-btn">
          <i className="material-icons-round" style={{ color: "#fff" }}>
            arrow_back
          </i>
        </button>
      );
    }
  }

  return (
    <>
      <div
        className="mobile-nav flex-center-space-bw"
        style={{ backgroundColor: "#a60000" }}
      >
        <div className="flex-ai-center">
          {button}
          <span style={style} className="mobile-nav-text-span">
            {text}
          </span>
        </div>

        <div className="flex-ai-center mobile-nav-button-container">
          {buttons}
        </div>
      </div>

      <div
        className="mobile-nav-menu-container fixed top-0"
        onClick={() => setShowNavbar(false)}
        style={{
          left: showNavbar ? 0 : "-100%",
          backgroundColor: showNavbar
            ? "rgba(57, 34, 34, 0.59)"
            : "transparent",
          zIndex: showNavbar ? 9999 : -1
        }}
      >
        <div className="mobile-nav-header padding-15 border-box flex-col-cen">
          <div className="flex-ai-center tc">
            <i className="material-icons font-30">fitness_center</i>
            <h1 className="margin-0 black line-height-11">Chadify</h1>
          </div>
          <span className="color-gray font-12 line-height-11">Beta v0.01</span>
        </div>
        <div className="mobile-nav-menu-wrapper">
          <NavigationMenu />
        </div>
      </div>
    </>
  );
};
export default MobileNavigation;
