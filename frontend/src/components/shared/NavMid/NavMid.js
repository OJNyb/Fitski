import React, { useState, useEffect } from "react";
import NavMidActionMenu from "./NavMidActionMenu";
import useMobile from "../../../hooks/useMobile";

const NavMid = ({
  backText,
  customNav,
  midContent,
  backAction,
  rightBtnText,
  rightBtnIcon,
  rightBtnAction,
  actionMenuChildren
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const isMobile = useMobile();

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

  if (customNav) {
    view = customNav;
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
            <h2>{backText}</h2>
          </div>
        )}

        {midContent && <div className="nav-mid-header-item">{midContent}</div>}

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

          {(rightBtnAction || rightBtnIcon) && (
            <button
              className={
                "nav-mid-header-text-btn " +
                (rightBtnIcon ? "theme-btn-no-border" : "theme-btn")
              }
              onClick={rightBtnAction}
            >
              {rightBtnText || rightBtnIcon}
            </button>
          )}
        </div>

        {showActionMenu && <NavMidActionMenu children={actionMenuChildren} />}
      </>
    );
  }

  return (
    <>
      <div
        className="nav-mid-header-container"
        style={{
          left: isMobile ? "68px" : "250px",
          top: isMobile ? "0" : "6px",
          width: isMobile
            ? "calc(100vw - 98px)"
            : "calc(100% - 200px - 250px - 30px)",
          height: isMobile ? "7%" : "60px"
        }}
      >
        {view}
      </div>
    </>
  );
};

export default NavMid;
