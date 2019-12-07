import React from "react";

import PlanText from "../PlanText";
import useSetLoading from "../../../hooks/useSetLoading";

import PlanOverview from "../PlanOverview";

const WebPlan = ({ woPlan, isSelf, setShowModal }) => {
  useSetLoading(false);
  const { weeks, _id: planId } = woPlan;
  let weeksDisplay;
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
  } else {
    weeksDisplay = (
      <div className="plan-week-container flex-col-cen">
        <p>Workout Plan Empty</p>
        {isSelf && (
          <button
            className="theme-btn-filled"
            onClick={() => setShowModal("addWeeks")}
          >
            Add weeks
          </button>
        )}
      </div>
    );
  }
  return (
    <div style={{ padding: "10px 0 50px" }}>
      {/* <p className="plan-description-label black">Description</p>
<p className="plan-description">{description}</p> */}
      <PlanOverview woPlan={woPlan} />
      {weeksDisplay}
    </div>
  );
};

export default WebPlan;
