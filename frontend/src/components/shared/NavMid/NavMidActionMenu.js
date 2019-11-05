import React, { useState, useEffect } from "react";

const NavActionMenu = ({ children, hideActionMenu, moreBtn }) => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  console.log(moreBtn);
  useEffect(() => {
    function handleWindowResize() {
      const { current } = moreBtn;
      const { offsetLeft, offsetTop } = current;
      setOffsetLeft(offsetLeft + 251 - 180 + 30 - 2);
      setOffsetTop(offsetTop + 6.5);
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

  const divClass =
    "nav-action-menu-item" + (customClass ? `${customClass}` : "");

  const iconClass =
    "nav-action-menu-icon material-icons" + (outlined ? "-outlined" : "");

  return (
    <div className={divClass} onClick={action}>
      <i className={iconClass}>{icon}</i>
      <span>{text}</span>
    </div>
  );
};

export default NavActionMenu;
