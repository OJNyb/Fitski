import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { NavContext } from "../../../context/navContext";
import { setBackLink } from "../../../utils/setBackLink";
import { displayDate } from "../../../utils/formatHistoryDate";

import "./webPlanCard.css";

const PlanCard = ({ plan, profile, search, category }) => {
  const [redirect, setRedirect] = useState(false);
  const { name, goal, weeks, createdAt, _id: planId, user: author } = plan;
  const { username, avatar: uAvatar, _id: authorId } = author;
  const { state, dispatch } = useContext(NavContext);

  let avatar = uAvatar;
  if (profile) {
    const { avatar: pAvatar } = profile;
    avatar = pAvatar;
  }
  const avatarUrl = `/image/avatar/${avatar}_sm.jpg`;

  if (redirect) {
    if (!state[planId]) {
      setBackLink(dispatch, planId, {
        profile,
        search,
        searchCategory: category
      });
    }
    return <Redirect to={`/plans/${planId}`} />;
  }

  let goalDisplay = goal;
  if (!goal || !goal.length) {
    goalDisplay = "N/A";
  }

  function onLinkClick(e) {
    e.stopPropagation();
    setBackLink(dispatch, authorId, {
      profile,
      search,
      searchCategory: category
    });
  }

  let created = displayDate(new Date(createdAt));
  return (
    <div
      className="plans-plan-card flex-center-space-bw"
      onClick={() => setRedirect(true)}
    >
      <div className="plans-plan-name">{name}</div>
      <div className="plans-plan-goal">{goalDisplay}</div>
      <div className="plans-plan-author flex-ai-center">
        <Link
          to={`/profile/${username}`}
          className="flex-ai-center"
          onClick={onLinkClick}
        >
          <div style={{ backgroundImage: `url(${avatarUrl})` }}>
            <img src={avatarUrl} alt="Avatar" />
          </div>
          <span>{username}</span>
        </Link>
      </div>
      <div className="plans-plan-length">{weeks.length} weeks</div>
      <div className="plans-plan-created">{created}</div>
    </div>
  );
};

export default PlanCard;
