import React from "react";
import { displayDate } from "../../../utils/formatHistoryDate";
import { Link } from "react-router-dom";

const PlanCard = ({ plan, isMobile }) => {
  const { _id, name, user, goals, weeks, createdAt } = plan;
  const { username: author, avatar } = user;
  const avatarUrl = `/image/avatar/${avatar}_sm.jpg`;

  const goalDisplay = goals.join(", ");

  let created = displayDate(new Date(createdAt));
  return (
    <Link to={`/plans/${_id}`} className="plans-plan-card">
      <div className="plans-plan-name">{name}</div>
      <div className="plans-plan-goal">{goalDisplay}</div>
      <div className="plans-plan-author">
        <div style={{ backgroundImage: `url(${avatarUrl})` }}>
          <img src={avatarUrl} alt="Profile pic" />
        </div>
        <span>{author}</span>
      </div>
      <div className="plans-plan-length">{weeks.length} weeks</div>
      {!isMobile && <div className="plans-plan-created">{created}</div>}
    </Link>
  );
};

export default PlanCard;
