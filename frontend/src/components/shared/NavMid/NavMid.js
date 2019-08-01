import React, { useState } from "react";
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

  return (
    <>
      <div className="nav-mid-header-container">
        <div className="nav-mid-header-item">
          <button
            className="nav-mid-header-container-back-btn theme-btn-no-border"
            onClick={backAction}
          >
            <i className="material-icons">arrow_back</i>
          </button>
          <h2>{backText}</h2>
        </div>

        {midContent && <div className="nav-mid-header-item">{midContent}</div>}

        <div className="nav-mid-header-item nav-mid-header-button-container ">
          <button
            className="nav-mid-header-more-btn theme-btn"
            onFocus={() => setShowActionMenu(true)}
            onBlur={() => setShowActionMenu(false)}
          >
            <i className="material-icons">more_horiz</i>
          </button>
          <button
            className="nav-mid-header-text-btn theme-btn"
            onClick={rightBtnAction}
          >
            {rightBtnText}
          </button>
        </div>
      </div>
      {showActionMenu && <NavMidActionMenu children={actionMenuChildren} />}
    </>
  );
};

export default NavMid;
