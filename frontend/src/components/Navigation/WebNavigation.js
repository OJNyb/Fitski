import React, { useState, useEffect, useLayoutEffect } from "react";

import NavigationMenu from "./NavigationMenu";
import { useUser } from "../../context/userContext";
import useWindowWidth from "../../hooks/useWindowWidth";

import "./webNavigation.css";

const BigScreenNavigation = () => {
  const user = useUser();
  const { username } = user;
  const width = useWindowWidth();
  const [showMenu, setShowMenu] = useState(true);
  let isSmallScreen = width < 1000;
  useLayoutEffect(() => {
    if (width < 1000) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [width]);

  let logo;
  if (isSmallScreen) {
    logo = <SmallScreenLogo showMenu={showMenu} setShowMenu={setShowMenu} />;
  } else {
    logo = <BigScreenLogo />;
  }

  useEffect(() => {
    function clickListener(e) {
      const { target } = e;
      if (
        isSmallScreen &&
        target.id !== "ss-more-btn" &&
        target.parentNode &&
        target.parentNode.id !== "ss-more-btn"
      ) {
        setShowMenu(false);
      }
    }
    function addClickListener() {
      window.addEventListener("click", clickListener);
    }

    if (isSmallScreen) {
      addClickListener();
    }
    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [isSmallScreen]);

  return (
    <>
      <div className="header">
        {logo}
        {/* {!isSmallScreen && (
          <div className="header-user flex-center">
            <img
              className="header-avatar"
              src={`/api/image/avatar/${user.avatar}_sm.jpg`}
              alt="avatar"
            />
            <p className="header-name color-gray">{username}</p>
          </div>
        )} */}
      </div>
      {isSmallScreen && showMenu && (
        <div className="nav-small-screen-background"></div>
      )}
      <NavigationMenu marginTop={false} show={showMenu} />
    </>
  );
};

const SmallScreenLogo = ({ showMenu, setShowMenu }) => {
  return (
    <div className="header-logo-container flex-ai-center">
      <button
        id="ss-more-btn"
        className="small-screen-dehaze-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="material-icons font-20 color-gray">dehaze</i>
      </button>

      <div className="flex-col-cen">
        <div className="flex-ai-center">
          <i className="material-icons font-22 tc mt-6">fitness_center</i>
          <h1 className="margin-0 black line-height-11 font-22">Chadify</h1>
        </div>
        <span className="color-light-gray line-height-11 header-small-screen-beta-text">
          Beta v0.01
        </span>
      </div>
    </div>
  );
};

const BigScreenLogo = () => {
  return (
    <div className="header-logo-container flex-col-cen">
      <div className="flex-ai-center">
        <i className="material-icons font-34 header-big-screen-icon tc mt-6">
          fitness_center
        </i>
        <h1 className="margin-0 black line-height-11 font-32 header-big-screen-logo">
          Chadify
        </h1>
      </div>
      <span className="color-light-gray font-12 line-height-11">
        Beta v0.01
      </span>
    </div>
  );
};

export default BigScreenNavigation;
