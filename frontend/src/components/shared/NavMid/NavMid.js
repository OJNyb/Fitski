import React, { useState, useEffect } from "react";
import NavMidActionMenu from "./NavMidActionMenu";

const NavMid = ({
  backText,
  actionMenuChildren,
  midContent,
  backAction,
  rightBtnText,
  rightBtnAction
}) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

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

  return (
    <>
      <div className="nav-mid-header-container">
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

        <div className="nav-mid-header-item nav-mid-header-button-container ">
          <button
            className="nav-mid-header-more-btn theme-btn"
            onClick={handleMoreActionClick}
          >
            <i className="material-icons nav-mid-header-more-icon">
              more_horiz
            </i>
          </button>

          <button
            className="nav-mid-header-text-btn theme-btn"
            onClick={rightBtnAction}
          >
            {rightBtnText}
          </button>
        </div>

        {showActionMenu && <NavMidActionMenu children={actionMenuChildren} />}
      </div>
    </>
  );
};

export default NavMid;
