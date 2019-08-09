import React, { useState, useEffect } from "react";

const NavActionMenu = ({ children, hideActionMenu }) => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const moreBtn = document.getElementsByClassName(
      "nav-mid-header-more-btn"
    )[0];

    function handleWindowResize() {
      setOffsetLeft(moreBtn.offsetLeft + 251 - 215 + 30 - 2);
      setOffsetTop(moreBtn.offsetTop + 2);
    }

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return function cleanup() {
      window.removeEventListener("resize", handleWindowResize);
    };
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
    <NavMidActionMenuItem element={x} key={x.action} />
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
  const { icon, text, action, outlined, customClass } = element;

  const classki =
    "nav-action-menu-icon material-icons" +
    (outlined ? "-outlined" : "") +
    (customClass ? `${customClass}` : "");

  return (
    <div className="nav-action-menu-item" onClick={action}>
      <i className={classki}>{icon}</i>
      <span>{text}</span>
    </div>
  );
};

export default NavActionMenu;
