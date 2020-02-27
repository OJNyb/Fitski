import React, { useState } from "react";
import MobileModal from "../Modal/MobileModal";
import { Link } from "react-router-dom";

import "./mobileNav.css";

const MobileNavMid = ({ menuChildren }) => {
  const [showActionModal, setShowActionModal] = useState(false);

  function handleMoreActionClick() {
    setShowActionModal(true);
  }

  let children;
  let actionMenu = menuChildren.map(x => (
    <NavMidActionMenuItem element={x} key={x.text} />
  ));
  children = (
    <div onClick={() => setShowActionModal(false)}>
      {actionMenu}
      <button
        className="modal-mobile-cancel-large"
        onClick={() => setShowActionModal(false)}
      >
        Cancel
      </button>
    </div>
  );

  let moreBtn = (
    <button className="nav-mid-header-more-btn" onClick={handleMoreActionClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="8" width="4.5" height="4.5" fill="#fff" />
        <rect x="8" y="7.75" width="4.5" height="4.5" fill="#fff" />
        <path d="M8 15.5H12.5V20H8V15.5Z" fill="#fff" />
      </svg>
    </button>
  );

  return (
    <>
      {moreBtn}
      {showActionModal && (
        <MobileModal
          children={children}
          toggleModal={() => setShowActionModal(false)}
        />
      )}
    </>
  );
};

const NavMidActionMenuItem = ({ element }) => {
  const { to, link, icon, text, action, outlined, customClass } = element;

  const divClass =
    "nav-mobile-action-menu-item" +
    (customClass ? `${customClass}-mobile` : "");

  const iconClass =
    "nav-mobile-action-menu-icon material-icons" +
    (outlined ? "-outlined" : "");

  const content = (
    <>
      <i className={iconClass}>{icon}</i>
      <span>{text}</span>
    </>
  );

  let view;

  if (link) {
    view = (
      <Link to={to} className={divClass}>
        {content}
      </Link>
    );
  } else {
    view = (
      <div className={divClass} onClick={action}>
        {content}
      </div>
    );
  }

  return view;
};

export default MobileNavMid;
