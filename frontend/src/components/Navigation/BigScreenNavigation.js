import React from "react";

import NavigationMenu from "./NavigationMenu";
import { useUser } from "../../context/userContext";

const BigScreenNavigation = () => {
  const user = useUser();
  const { avatar, username } = user;
  return (
    <>
      <div className="header">
        <div className="header-logo-container flex-col-cen">
          <div className="flex-ai-center">
            <i className="material-icons">fitness_center</i>
            <h1 className="margin-0 black line-height-11">Fitnut</h1>
          </div>
          <span className="color-light-gray font-12 line-height-11">
            Beta v0.01
          </span>
        </div>
        <div className="header-user">
          <img
            className="header-avatar"
            src={`/image/avatar/${user.avatar}_sm.jpg`}
            alt="avatar"
          />
          <p className="header-name">{username}</p>
        </div>
        <NavigationMenu marginTop={true} />
      </div>
    </>
  );
};

export default BigScreenNavigation;
