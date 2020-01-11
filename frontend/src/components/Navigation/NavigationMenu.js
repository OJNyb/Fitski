import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/userContext";
import useMobile from "../../hooks/useMobile";

const NavigationMenu = ({ marginTop, show = true }) => {
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
        <h3 className="nav-header">DASHBOARD</h3>

        <NavItem to="/" icon="calendar_today" text="Calendar" exact={true} />
        <NavItem to="/plans" icon="view_list" text="Plans" />
        <NavItem to="/explore" icon="supervised_user_circle" text="Explore" />

        {/* <NavLink
          to="/create-plan"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon">library_add</i>
          <span className="nav-span">Create plan</span>
        </NavLink> */}
      </section>

      <section className="nav-account-container">
        <h3 className="nav-header">ACCOUNT</h3>
        <NavLink
          exact={true}
          to={`/profile/${username}`}
          className="nav-item flex-ai-center line-height-11"
        >
          <div className="nav-sidebar-avatar-container">
            <img
              className="nav-sidebar-avatar"
              src={`/api/image/avatar/${avatar}_sm.jpg`}
              alt="avatar"
            />
          </div>
          <span className="nav-span">Profile</span>
        </NavLink>

        <NavItem to="/settings" icon="settings" text="Settings" />
        <NavItem to="/logout" icon="power_settings_new" text="Logout" />
      </section>
    </nav>
  );
};

const NavItem = ({ to, icon, text, exact }) => {
  return (
    <NavLink
      exact={exact}
      to={to}
      className="nav-item flex-ai-center line-height-11"
    >
      <i className="material-icons nav-icon">{icon}</i>
      <span className="nav-span">{text}</span>
    </NavLink>
  );
};
export default NavigationMenu;
