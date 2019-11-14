import React, { useEffect, useState } from "react";
import MobileModal from "../Modal/MobileModal";

import "./mobileNav.css";

const MobileNavMid = ({
  backText,
  actionMenuChildren,
  rightBtnText,
  rightBtnAction,
  rightBtnIcon
}) => {
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    function addRightBtnToActionMenu() {
      if (rightBtnIcon) {
        actionMenuChildren.unshift({
          action: rightBtnAction,
          text: rightBtnText,
          icon: rightBtnIcon
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
      <NavMidActionMenuItem element={x} key={x.action} />
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

  return (
    <>
      {backText && (
        <div className="nav-mid-header-item">
          <h2 className="margin-0 nav-h2 font-18 color-white">{backText}</h2>
        </div>
      )}
      {/* 
      {midContent && <div className="nav-mid-header-item">{midContent}</div>} */}

      <div className="nav-mid-header-item nav-mid-header-button-container">
        {actionMenuChildren && (
          <button
            className="nav-mid-header-more-btn theme-btn"
            onClick={handleMoreActionClick}
          >
            <i className="material-icons nav-mid-header-more-icon">
              more_horiz
            </i>
          </button>
        )}
      </div>

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
  const { icon, text, action, outlined, customClass } = element;

  const divClass =
    "nav-mobile-action-menu-item" +
    (customClass ? `${customClass}-mobile` : "");

  const iconClass =
    "nav-mobile-action-menu-icon material-icons" +
    (outlined ? "-outlined" : "");

  return (
    <div className={divClass} onClick={action}>
      <i className={iconClass}>{icon}</i>
      <span>{text}</span>
    </div>
  );
};

export default MobileNavMid;
