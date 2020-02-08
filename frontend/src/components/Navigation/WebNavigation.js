import React, { useState, useEffect, useLayoutEffect } from "react";

import NavigationMenu from "./NavigationMenu";
import { useUser } from "../../context/userContext";
import useWindowWidth from "../../hooks/useWindowWidth";

import "./webNavigation.css";

const BigScreenNavigation = () => {
  const user = useUser();
  const width = useWindowWidth();
  const [showMenu, setShowMenu] = useState(true);

  const [showText, setShowText] = useState(true);
  const [navWrapperStyle, setNavWrapperStyle] = useState({});
  const [navContainerStyle, setNavContainerStyle] = useState({});

  useLayoutEffect(() => {
    if (width < 1060 && showText) {
      setShowText(false);
      setNavContainerStyle({
        width: "52px"
      });
      setNavWrapperStyle({
        padding: "7px 0"
      });
    } else if (!showText && width >= 1060) {
      setShowText(true);
      setNavContainerStyle({});
      setNavWrapperStyle({});
    }
  }, [width]);

  return (
    <>
      <header className="header">
        <div className="nav-container" style={navContainerStyle}>
          <div className="nav-wrapper" style={navWrapperStyle}>
            <Logo showText={showText} />
            <NavigationMenu showText={showText} />
          </div>
        </div>
      </header>
    </>
  );
};

const Logo = ({ showText }) => {
  return (
    <div className="header-logo-container">
      <i className="material-icons font-34 header-big-screen-icon tc mt-6">
        fitness_center
      </i>
      <div className="flex-col-cen">
        {showText && (
          <>
            <h1 className="margin-0 black line-height-11 font-32">Chadify</h1>
            <span className="color-light-gray font-12 line-height-11">
              Beta v0.01
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default BigScreenNavigation;
