import React, { useState, useLayoutEffect } from "react";

import NavigationMenu from "./NavigationMenu";
import { useUser } from "../../context/userContext";
import useWindowWidth from "../../hooks/useWindowWidth";

import "./webNavigation.css";

const BigScreenNavigation = () => {
  const user = useUser();
  const { username } = user;
  const width = useWindowWidth();
  const [showMenu, setShowMenu] = useState(true);
  useLayoutEffect(() => {
    if (width < 1200) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [width]);

  let logo;
  if (width < 1200) {
    logo = <SmallScreenLogo showMenu={showMenu} setShowMenu={setShowMenu} />;
  } else {
    logo = <BigScreenLogo />;
  }

  return (
    <>
      <div className="header">
        {logo}
        {width >= 1200 && (
          <div className="header-user flex-center">
            <img
              className="header-avatar"
              src={`/image/avatar/${user.avatar}_sm.jpg`}
              alt="avatar"
            />
            <p className="header-name">{username}</p>
          </div>
        )}
        {showMenu && <NavigationMenu marginTop={true} />}
      </div>
    </>
  );
};

const SmallScreenLogo = ({ showMenu, setShowMenu }) => {
  return (
    <div className="header-logo-container flex-ai-center">
      <button
        className="small-screen-dehaze-button"
        onClick={() => setShowMenu(!showMenu)}
      >
        <i className="material-icons font-20 color-gray">dehaze</i>
      </button>

      <div className="flex-col-cen">
        <div className="flex-ai-center">
          <i className="material-icons font-22 tc">fitness_center</i>
          <h1 className="margin-0 black line-height-11 font-22">Fitnut</h1>
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
        <i className="material-icons font-34 header-big-screen-icon tc">
          fitness_center
        </i>
        <h1 className="margin-0 black line-height-11 font-32 header-big-screen-logo">
          Fitnut
        </h1>
      </div>
      <span className="color-light-gray font-12 line-height-11">
        Beta v0.01
      </span>
    </div>
  );
};

export default BigScreenNavigation;
