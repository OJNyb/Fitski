import React from "react";
import { NavLink } from "react-router-dom";

const NavigationMenu = ({ marginTop }) => {
  return (
    <nav style={{ marginTop: marginTop && "61px" }}>
      <section>
        <h3 className="nav-header">DASHBOARD</h3>
        {/* <NavLink to="/active" className="nav-item">
        <i className="material-icons nav-icon">play_arrow</i>
        <span className="nav-span">Active plan</span>
      </NavLink> */}
        <NavLink to="/plans" className="nav-item flex-ai-center line-height-11">
          <i className="material-icons nav-icon">view_list</i>
          <span className="nav-span">Plans</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon">calendar_today</i>
          <span className="nav-span">Calendar</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon">supervised_user_circle</i>
          <span className="nav-span">Explore</span>
        </NavLink>
        <NavLink
          to="/create-plan"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon">library_add</i>
          <span className="nav-span">Create plan</span>
        </NavLink>
      </section>

      <section className="nav-account-container">
        <h3 className="nav-header">ACCOUNT</h3>
        {/* <NavLink to="/profile" className="nav-item">
        <img
          className="nav-sidebar-avatar"
          src={`/image/avatar/${avatar}_sm.jpg`} alt="Profile pic"
          alt="avatar"
        />
        <span className="nav-span">Profile</span>
      </NavLink> */}
        <NavLink
          to="/settings"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon ">settings</i>
          <span className="nav-span">Settings</span>
        </NavLink>
        {/* <NavLink to="/reset" className="nav-item">
<i className="material-icons nav-icon">replay</i>
<span className="nav-span">Reset week</span>
</NavLink> */}
        {/* <NavLink to="/pause" className="nav-item">
<i className="material-icons nav-icon">pause_circle_outline</i>
<span className="nav-span">Pause</span>
</NavLink> */}
        <NavLink
          to="/logout"
          className="nav-item flex-ai-center line-height-11"
        >
          <i className="material-icons nav-icon">power_settings_new</i>
          <span className="nav-span">Logout</span>
        </NavLink>
      </section>
    </nav>
  );
};

export default NavigationMenu;
