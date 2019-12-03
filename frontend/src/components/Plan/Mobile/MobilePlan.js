import React from "react";

import PlanText from "../PlanText";
import NoWeeks from "./NoWeeks";
import "./planMobile.css";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavRedBack from "../../../hooks/useNavRedBack";
import Overview from "./MobileOverview";

const MobilePlan = ({ woPlan, isSelf, setShowModal }) => {
  const { weeks, _id: planId } = woPlan;
  useSetLoading(false);
  useNavRedBack("/plans");

  let weeksDisplay;
  if (weeks.length) {
    weeksDisplay = weeks.map((week, index) => {
      return (
        <PlanText
          week={week}
          index={index}
          isSelf={isSelf}
          planId={planId}
          key={week._id}
          isMobile={true}
        />
      );
    });
  } else {
    weeksDisplay = <NoWeeks isSelf={isSelf} setShowModal={setShowModal} />;
  }
  return (
    <div style={{ padding: "10px 0 50px" }}>
      {weeks.length && <Overview woPlan={woPlan} />}
      {weeksDisplay}
    </div>
  );
};

export default MobilePlan;
