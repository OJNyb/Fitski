import React, { useState, useEffect } from "react";
import "./dropdown.css";

const DropDown = ({ children, hideActionMenu }) => {
  // const [offsetLeft, setOffsetLeft] = useState(0);
  // const [offsetTop, setOffsetTop] = useState(0);

  // useEffect(() => {
  //   const moreBtn = document.getElementsByClassName(
  //     "nav-mid-header-more-btn"
  //   )[0];

  //   function handleWindowResize() {
  //     setOffsetLeft(moreBtn.offsetLeft + 251 - 180 + 30 - 2);
  //     setOffsetTop(moreBtn.offsetTop + 6);
  //   }

  //   handleWindowResize();
  //   window.addEventListener("resize", handleWindowResize);

  //   return function cleanup() {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // });

  // const left = offsetLeft + "px";
  // const top = offsetTop + "px";
  // const style = {
  //   left,
  //   top
  // };

  // if (!offsetLeft) {
  //   return null;
  // }

  let items = children.map(x => <DropDownItem element={x} key={x.action} />);

  return (
    <div className="drop-down-container" onMouseLeave={hideActionMenu}>
      <div className="drop-down-inner-container">{items}</div>
    </div>
  );
};

const DropDownItem = ({ element }) => {
  const {
    icon,
    text,
    action,
    iconSvg,
    minified,
    outlined,
    customClass
  } = element;

  let iconski;

  if (iconSvg) {
    iconski = iconSvg;
  } else {
    const iconClass =
      "drop-down-icon material-icons" +
      (outlined ? "-outlined" : "") +
      (minified ? " drop-down-icon-minified" : "");

    iconski = <i className={iconClass}>{icon}</i>;
  }

  const divClass = "drop-down-item" + (customClass ? `${customClass}` : "");

  return (
    <div className={divClass} onClick={action}>
      {iconski}
      <span>{text}</span>
    </div>
  );
};

export default DropDown;
