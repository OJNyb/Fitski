import React from "react";
import { Link } from "react-router-dom";

import "./plansMobile.css";

const MobilePlanCard = ({ plan, onActivateClick, onDeactivateClick }) => {
  const { _id: planId, name, user, goals, weeks, description, active } = plan;
  const { username: author, avatar } = user;
  const avatarUrl = `/image/avatar/${avatar}_sm.jpg`;

  const goalDisplay = goals.join(", ");

  let descDisplay = description;

  if (description.length > 150) {
    descDisplay = description.slice(0, 150) + "...";
  }

  let activeBtn;
  if (active) {
    activeBtn = (
      <button
        onClick={e => onDeactivateClick(e, planId)}
        className="theme-btn-filled padding-0-15 align-s-fs"
      >
        <span className="mb-1 font-w-500">Activated</span>
      </button>
    );
  } else {
    activeBtn = (
      <button
        onClick={e => onActivateClick(e, planId)}
        className="theme-btn padding-0-15 align-s-fs"
      >
        <span className="mb-1 font-w-500">Activate</span>
      </button>
    );
  }

  return (
    <Link
      to={`/plans/${planId}`}
      className="padding-10 flex-stretch border-box width-100p plans-mobile-card black"
    >
      <div className="flex-stretch plans-mobile-plan-author margin-0-5">
        <div style={{ backgroundImage: `url(${avatarUrl})` }}>
          <img src={avatarUrl} alt="Profile pic" />
        </div>
      </div>
      <div className="flex-col margin-0-5 border-box width-100p">
        <div className="flex-center-space-bw">
          <div className="flex-col">
            <span className="black line-height-12">{name}</span>
            <span className="font-w-300 font-14 line-height-11">
              <span className="tc">@OJNyb</span> | {goalDisplay} |{" "}
              {weeks.length} weeks
            </span>
            <span className="font-w-300 font-14 line-height-11"></span>
          </div>
          {activeBtn}
        </div>
        <div className="pt-5 font-w-300">{descDisplay}</div>
      </div>
    </Link>
  );
};

export default MobilePlanCard;
