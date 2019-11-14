import React from "react";
import { displayDate } from "../../../utils/formatHistoryDate";
import { Link } from "react-router-dom";

import "./plansMobile.css";

const MobilePlanCard = ({ plan }) => {
  const { _id, name, user, goal, weeks, createdAt } = plan;
  const { username: author, avatar } = user;

  return (
    <Link to={`/plans/${_id}`} className="plans-mobile-plan-card color-gray">
      <div className="plans-mobile-plan-author plans-plan-author">
        <div style={{ backgroundImage: `url(${avatar})` }}>
          <img src={avatar} />
        </div>
      </div>
      <div className="red-h-5" />
      <div className="plans-mobile-plan-name black">{name}</div>
      <div className="plans-plan-goal">Gain muscle</div>
      <div className="plans-plan-length">{weeks.length} weeks</div>
    </Link>
  );
};

export default MobilePlanCard;
