import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavMidActionMenu from "./NavMidActionMenu";

import "./mobileNav.css";
import useWindowWidth from "../../../hooks/useWindowWidth";

const WebNavMid = props => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const moreBtn = useRef(null);
  const winWidth = useWindowWidth();
  const {
    backText,
    midContent,
    backAction,
    rightBtnText,
    rightBtnAction,
    rightBtnFilled,
    rightLinkTo,
    rightLinkText,
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

  let width;
  if (winWidth >= 1000) {
    width = "calc(100% - 200px - 250px)";
  } else {
    width = "calc(100% - 250px";
  }

  return (
    <div
      style={{ width }}
      className="nav-mid-web-header-container fixed z-mid-max flex-center-space-bw padding-0-15 border-box"
    >
      {backText && (
        <div className="nav-mid-header-item">
          {backAction && (
            <button
              className="nav-mid-header-container-back-btn theme-btn-no-border"
              onClick={backAction}
            >
              <i className="material-icons">arrow_back</i>
            </button>
          )}

          <h2 className="nav-h2 mb-1 m-l-10 font-21">{backText}</h2>
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

        {rightBtnText && (
          <button
            className={
              "nav-mid-header-text-btn " +
              (rightBtnFilled ? "theme-btn-filled" : "theme-btn")
            }
            onClick={rightBtnAction}
          >
            {rightBtnText}
          </button>
        )}
        {rightLinkText && (
          <Link className="nav-mid-header-text-btn theme-btn" to={rightLinkTo}>
            {rightLinkText}
          </Link>
        )}
      </div>

      {showActionMenu && (
        <NavMidActionMenu children={actionMenuChildren} moreBtn={moreBtn} />
      )}
    </div>
  );
};

export default WebNavMid;
