import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavMidActionMenu from "./NavMidActionMenu";

import MoreIcon from "../../EditWeek/MoreIcon";

import "./mobileNav.css";

const WebNavMid = props => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const moreBtn = useRef(null);
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
  }

  return (
    <div className="nav-mid-web-header-container flex-center-space-bw">
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

          <h2 className="nav-h2 black web-nav-h2">{backText}</h2>
        </div>
      )}

      {midContent && <div className="nav-mid-header-item">{midContent}</div>}

      <div className="nav-mid-header-item nav-mid-header-button-container">
        {actionMenuChildren && !!actionMenuChildren.length && (
          <button
            className="nav-mid-header-more-btn theme-btn-no-border shadow-medium-clickable"
            onClick={handleMoreActionClick}
            ref={moreBtn}
          >
            <MoreIcon d={26} />
          </button>
        )}

        {rightBtnText && (
          <button
            className={
              "nav-mid-header-text-btn shadow-medium-clickable " +
              (rightBtnFilled ? "theme-btn-filled" : "theme-btn")
            }
            onClick={rightBtnAction}
          >
            {rightBtnText}
          </button>
        )}
        {rightLinkText && (
          <Link
            className="nav-mid-header-text-btn theme-btn shadow-medium-clickable"
            to={rightLinkTo}
          >
            {rightLinkText}
          </Link>
        )}
      </div>

      {showActionMenu && (
        <NavMidActionMenu
          children={actionMenuChildren}
          hideActionMenu={() => setShowActionMenu(false)}
          moreBtn={moreBtn}
        />
      )}
    </div>
  );
};

export default WebNavMid;
