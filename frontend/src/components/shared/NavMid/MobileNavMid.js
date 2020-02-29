import React, { useLayoutEffect, useState, useContext } from "react";
import { NavContext } from "../../../context/navContext";
import MobileModal from "../Modal/MobileModal";
import { Link } from "react-router-dom";
import useSetNav from "../../../hooks/useSetNav";

import "./mobileNav.css";

const MobileNavMid = ({
  backText,
  actionMenuChildren,
  rightBtnText,
  rightBtnAction,
  rightBtnIcon,
  rightBtnOutlined,
  rightBtnCustomClass
}) => {
  const [showActionModal, setShowActionModal] = useState(false);
  const [menuChildren, setMenuChildren] = useState(actionMenuChildren);
  const {
    state: { showDehaze }
  } = useContext(NavContext);

  useLayoutEffect(() => {
    function addRightBtnToActionMenu() {
      if (rightBtnIcon) {
        setMenuChildren([
          {
            action: rightBtnAction,
            text: rightBtnText,
            icon: rightBtnIcon,
            outlined: rightBtnOutlined,
            customClass: rightBtnCustomClass
          },
          ...actionMenuChildren
        ]);
      }
    }
    addRightBtnToActionMenu();
  }, [
    rightBtnIcon,
    rightBtnAction,
    rightBtnOutlined,
    rightBtnText,
    actionMenuChildren,
    rightBtnCustomClass
  ]);

  function handleMoreActionClick() {
    setShowActionModal(true);
  }

  let children;

  if (menuChildren) {
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
      </div>
    );
  }

  useSetNav({
    text: backText,
    buttons: moreBtn,
    showDehaze
  });

  return (
    <>
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
