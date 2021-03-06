import React from "react";

import PlanText from "../PlanText";
import useSetLoading from "../../../hooks/useSetLoading";

import PlanOverview from "../PlanOverview";

const WebPlan = ({ woPlan, isSelf, hasAccess, setShowModal }) => {
  useSetLoading(false);
  const { weeks, _id: planId, access } = woPlan;
  let weeksDisplay;

  let view;
  if (weeks.length) {
    weeksDisplay = weeks.map((week, index) => {
      return (
        <PlanText
          week={week}
          index={index}
          key={week._id}
          isSelf={isSelf}
          planId={planId}
        />
      );
    });

    if (hasAccess || access === "public") {
      view = weeksDisplay;
    } else {
      view = (
        <div className="plan-week-container-no-access">{weeksDisplay}</div>
      );
    }
  } else {
    view = (
      <div className="plan-week-container flex-col-cen">
        <p>Workout Plan Empty</p>
        {isSelf && (
          <button
            className="theme-btn-filled plans-web-empty-add-btn"
            onClick={() => setShowModal("addWeeks")}
          >
            Add weeks
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 50px" }}>
      <PlanOverview woPlan={woPlan} />
      {view}
    </div>
  );
};

export default WebPlan;
