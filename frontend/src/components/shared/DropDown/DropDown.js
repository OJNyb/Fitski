import React from "react";
import "./dropdown.css";

const DropDown = ({ children, hideActionMenu }) => {
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

    iconski = <i className={iconClass + " font-20 color-light-gray"}>{icon}</i>;
  }

  const divClass =
    "drop-down-item flex-ai-center color-gray" +
    (customClass ? ` ${customClass}` : "");

  return (
    <div className={divClass} onClick={action}>
      {iconski}
      <span>{text}</span>
    </div>
  );
};

export default DropDown;
