import React, { useEffect, useState } from "react";
import MobileModal from "../Modal/MobileModal";
import { Link } from "react-router-dom";
import MobileNavMidContainer from "./MobileNavMidContainer";

import "./mobileNav.css";

const MobileNavMid = ({
  backText,
  actionMenuChildren,
  rightBtnText,
  rightBtnAction,
  rightBtnIcon,
  rightBtnOutlined
}) => {
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    function addRightBtnToActionMenu() {
      if (rightBtnIcon) {
        actionMenuChildren.unshift({
          action: rightBtnAction,
          text: rightBtnText,
          icon: rightBtnIcon,
          outlined: rightBtnOutlined
        });
      }
    }
    addRightBtnToActionMenu();
  }, [actionMenuChildren]);

  function handleMoreActionClick() {
    setShowActionModal(true);
  }

  let children;

  if (actionMenuChildren) {
    let actionMenu = actionMenuChildren.map(x => (
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
  }

  let backTextDisplay = null;
  if (backText) {
    backTextDisplay = (
      <div className="nav-mid-header-item">
        <h2 className="nav-h2 m-l-3 font-18 color-white">{backText}</h2>
      </div>
    );
  }

  let moreBtn = null;
  if (actionMenuChildren) {
    moreBtn = (
      <div className="nav-mid-header-item nav-mid-header-button-container">
        <button
          className="nav-mid-header-more-btn"
          onClick={handleMoreActionClick}
        >
          <svg
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="7" y="1" width="5" height="5" fill="white" />
            <rect x="7" y="8" width="5" height="5" fill="white" />
            <rect x="7" y="15" width="5" height="5" fill="white" />
          </svg>
        </button>
      </div>
    );
  }

  const navChildren = (
    <>
      {backTextDisplay}
      {moreBtn}
    </>
  );

  return (
    <>
      <MobileNavMidContainer children={navChildren} />

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
