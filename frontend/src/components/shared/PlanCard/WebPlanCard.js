import React, { useState } from "react";
import { displayDate } from "../../../utils/formatHistoryDate";
import { Link, Redirect } from "react-router-dom";

import "./webPlanCard.css";

const PlanCard = ({ plan, profile }) => {
  const [redirect, setRedirect] = useState(false);
  const { _id, name, user, goal, weeks, createdAt } = plan;
  const { username: author, avatar: uAvatar } = user;

  let avatar;
  if (profile) {
    const { avatar: pAvatar } = profile;
    avatar = pAvatar;
  } else {
    avatar = uAvatar;
  }
  const avatarUrl = `/image/avatar/${avatar}_sm.jpg`;

  if (redirect) {
    return <Redirect to={`/plans/${_id}`} />;
  }

  let goalDisplay = goal;
  if (!goal || !goal.length) {
    goalDisplay = "N/A";
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
          to={`/profile/${author}`}
          className="flex-ai-center"
          onClick={e => e.stopPropagation()}
        >
          <div style={{ backgroundImage: `url(${avatarUrl})` }}>
            <img src={avatarUrl} alt="Profile pic" />
          </div>
          <span>{author}</span>
        </Link>
      </div>
      <div className="plans-plan-length">{weeks.length} weeks</div>
      <div className="plans-plan-created">{created}</div>
    </div>
  );
};

export default PlanCard;
