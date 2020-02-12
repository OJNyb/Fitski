import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navMid.css";

const NavActionMenu = ({ children, hideActionMenu, moreBtn }) => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    function handleWindowResize() {
      const { current } = moreBtn;
      const { offsetLeft, offsetTop } = current;
      setOffsetLeft(offsetLeft - 180 + 26 - 1);
      setOffsetTop(offsetTop + 1);
    }

    handleWindowResize();
  });

  const left = offsetLeft + "px";
  const top = offsetTop + "px";
  const style = {
    left,
    top
  };

  if (!offsetLeft) {
    return null;
  }

  let items = children.map(x => (
    <NavMidActionMenuItem element={x} key={x.text} />
  ));

  return (
    <div
      className="nav-action-menu-container"
      style={style}
      onMouseLeave={hideActionMenu}
    >
      <div className="nav-actinon-menu-inner-container">{items}</div>
    </div>
  );
};

const NavMidActionMenuItem = ({ element }) => {
  const { icon, text, action, outlined, customClass, link, to } = element;

  const divClass =
    "nav-action-menu-item" + (customClass ? `${customClass}` : "");

  const iconClass =
    "nav-action-menu-icon material-icons" + (outlined ? "-outlined" : "");

  const iconText = (
    <>
      <i className={iconClass}>{icon}</i>
      <span>{text}</span>
    </>
  );

  if (link) {
    return (
      <Link to={to} className={divClass}>
        {iconText}
      </Link>
    );
  }
  return (
    <div className={divClass} onClick={action}>
      {iconText}
    </div>
  );
};

export default NavActionMenu;
