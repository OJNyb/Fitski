import React from "react";
import { Link } from "react-router-dom";

import "./MobileEmpty.css";

const MobileEmpty = ({ text, children }) => {
  const buttons = children.map(x => <MobileBtn el={x} key={x.action} />);
  return (
    <div className="mobile-empty-container flex-col-cen">
      <div />
      <p className="color-light-gray">{text}</p>
      <div className="flex-col mobile-empty-log-btn-container">{buttons}</div>
    </div>
  );
};

const MobileBtn = ({ el }) => {
  const { to, icon, text, onClick } = el;
  const children = (
    <>
      {icon}
      <span className="color-light-gray">{text}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} className="flex-col-cen">
        {children}
      </Link>
    );
  } else {
    return (
      <button className="flex-col-cen" onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default MobileEmpty;
