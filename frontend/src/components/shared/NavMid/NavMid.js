import React, { useRef, useState } from "react";
import NavMidActionMenu from "./NavMidActionMenu";
import useMobile from "../../../hooks/useMobile";

import MobileNavMid from "./MobileNavMid";

const NavMid = props => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const isMobile = useMobile();
  const moreBtn = useRef(null);

  const {
    backText,
    customNav,
    midContent,
    backAction,
    rightBtnText,
    rightBtnIcon,
    rightBtnAction,
    actionMenuChildren
  } = props;

  function handleMoreActionClick(e) {
    e.preventDefault();
    setShowActionMenu(true);
    window.addEventListener("click", onWindowClick);
  }

  function onWindowClick(e) {
    const { classList } = e.target;
    if (
      classList.contains("nav-mid-header-more-btn") ||
      classList.contains("nav-mid-header-more-icon")
    ) {
      return;
    }
    setShowActionMenu(false);
    window.removeEventListener("click", onWindowClick);
  }

  let view;

  if (isMobile) {
    view = <MobileNavMid {...props} />;
  } else {
    view = (
      <>
        {backText && (
          <div className="nav-mid-header-item">
            <button
              className="nav-mid-header-container-back-btn theme-btn-no-border"
              onClick={backAction}
            >
              <i className="material-icons">arrow_back</i>
            </button>

            <h2 className="nav-h2 font-21">{backText}</h2>
          </div>
        )}

        {midContent && <div className="nav-mid-header-item">{midContent}</div>}

        <div className="nav-mid-header-item nav-mid-header-button-container">
          {actionMenuChildren && (
            <button
              className="nav-mid-header-more-btn theme-btn"
              onClick={handleMoreActionClick}
              ref={moreBtn}
            >
              <i className="material-icons nav-mid-header-more-icon">
                more_horiz
              </i>
            </button>
          )}

          {(rightBtnText || rightBtnIcon) && (
            <button
              className="nav-mid-header-text-btn theme-btn"
              onClick={rightBtnAction}
            >
              {rightBtnText || rightBtnIcon}
            </button>
          )}
        </div>

        {showActionMenu && (
          <NavMidActionMenu children={actionMenuChildren} moreBtn={moreBtn} />
        )}
      </>
    );
  }

  return (
    <>
      {/* <div
        className={
          "nav-mid-header-container " +
          (isMobile
            ? "nav-mid-mobile-header-container"
            : "nav-mid-web-header-container")
        }
      > */}
      {view}
    </>
  );
};

export default NavMid;
