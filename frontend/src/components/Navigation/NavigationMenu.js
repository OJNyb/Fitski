import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";
import useMobile from "../../hooks/useMobile";
import CalendarIcon from "./Icons/CalendarIcon";
import PlanIcon from "./Icons/PlanIcon";
import DiscoverIcon from "./Icons/DiscoverIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import LogoutIcon from "./Icons/LogoutIcon";
import useWindowWidth from "../../hooks/useWindowWidth";

const NavigationMenu = ({ show = true, showText = true }) => {
  const user = useUser();
  const isMobile = useMobile();

  let style = {};
  if (!isMobile) {
    style.left = show ? 0 : "-251px";
  }

  const { avatar, username } = user;

  return (
    <nav style={style}>
      <section>
        <NavItem
          to="/"
          icon={<CalendarIcon />}
          text="Calendar"
          exact={true}
          showText={showText}
        />
        <NavItem
          to="/plans"
          icon={<PlanIcon />}
          text="Plans"
          showText={showText}
        />
        <NavItem
          to="/discover"
          icon={<DiscoverIcon />}
          text="Discover"
          showText={showText}
        />
      </section>
      <section>
        <NavItem
          exact={true}
          to={`/profile/${username}`}
          text="Profile"
          showText={showText}
          icon={
            <div className="nav-sidebar-avatar-container">
              <img
                className="nav-sidebar-avatar"
                src={`/api/image/avatar/${avatar}_sm.jpg`}
                alt="avatar"
              />
            </div>
          }
        />

        <NavItem
          to="/settings"
          icon={<SettingsIcon />}
          text="Settings"
          showText={showText}
        />
        <NavItem
          to="/logout"
          icon={<LogoutIcon />}
          text="Logout"
          showText={showText}
        />
      </section>
    </nav>
  );
};

const NavItem = ({ to, icon, text, exact, showText }) => {
  return (
    <NavLink
      exact={exact}
      to={to}
      className="nav-item flex-ai-center line-height-11"
    >
      <div className="nav-item-wrapper">
        <div className="nav-icon">{icon}</div>
        {showText && <span className="nav-span">{text}</span>}
      </div>
    </NavLink>
  );
};

export default NavigationMenu;
