import React from "react";

import NavigationMenu from "./NavigationMenu";

const BigScreenNavigation = () => {
  return (
    <>
      <div className="header">
        <div className="header-logo-container">
          <i className="material-icons">fitness_center</i>
          <h1 className="header-logo">Fitnut</h1>
        </div>
        <div className="header-user">
          <img
            className="header-avatar"
            src="https://pbs.twimg.com/profile_images/971421611030171658/ldC9VK6w_400x400.jpg"
            alt="avatar"
          />
          <p className="header-name">Guy Fieri</p>
        </div>
        <NavigationMenu marginTop={true} />
      </div>
    </>
  );
};

export default BigScreenNavigation;
