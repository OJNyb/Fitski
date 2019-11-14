import React from "react";
import { displayDate } from "../../../utils/formatHistoryDate";
import { Link } from "react-router-dom";

const PlanCard = ({ plan, isMobile }) => {
  const { _id, name, user, goal, weeks, createdAt } = plan;
  const { username: author, avatar } = user;

  let created = displayDate(new Date(createdAt));
  console.log(user);
  return (
    <Link to={`/plans/${_id}`} className="plans-plan-card">
      <div className="plans-plan-name">{name}</div>
      <div className="plans-plan-goal">Gain muscle</div>
      <div className="plans-plan-author">
        <div style={{ backgroundImage: `url(${avatar})` }}>
          <img src={avatar} />
        </div>
        <span>{author}</span>
      </div>
      <div className="plans-plan-length">{weeks.length} weeks</div>
      {!isMobile && <div className="plans-plan-created">{created}</div>}
    </Link>
  );
};

export default PlanCard;
