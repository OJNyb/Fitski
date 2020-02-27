import React from "react";
import { Link } from "react-router-dom";

const WeekDropdown = ({ weeks, planId, hideDropdown }) => {
  let weekItems = weeks.map((x, y) => (
    <WeekItem key={x._id} week={x} index={y} planId={planId} />
  ));
  return (
    <div
      className="edit-week-web-week-dropdown-container custom-scrollbar shadow-medium"
      onMouseLeave={hideDropdown}
    >
      {weekItems}
    </div>
  );
};

const WeekItem = ({ week, index, planId }) => {
  const { _id: weekId } = week;

  return (
    <div className="edit-week-web-week-dropdown-item flex-ai-center">
      <Link to={`/plans/${planId}/${weekId}`} className="color-gray font-w-300">
        Week {index + 1}
      </Link>
    </div>
  );
};

export default WeekDropdown;
