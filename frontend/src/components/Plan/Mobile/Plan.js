import React from "react";

import PlanText from "../PlanText";
import Plus20 from "../../shared/SVGs/Plus20";
import "./planMobile.css";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavRedBack from "../../../hooks/useNavRedBack";

const MobilePlan = ({ woPlan, setShowModal }) => {
  const { name, weeks, _id: planId } = woPlan;
  useSetLoading(false);
  useNavRedBack("/plans");

  let weeksDisplay;
  if (weeks.length) {
    weeksDisplay = weeks.map((week, index) => {
      return (
        <PlanText
          week={week}
          index={index}
          planId={planId}
          key={week._id}
          isMobile={true}
        />
      );
    });
  } else {
    weeksDisplay = <MobileNoWeeks setShowModal={setShowModal} />;
  }
  return <div style={{ padding: "10px 0 50px" }}>{weeksDisplay}</div>;
};

const MobileNoWeeks = ({ setShowModal }) => {
  return (
    <div className="flex-col-cen fixed width-100p plan-mobile-empty-plan-container">
      <span className="color-gray">Workout Plan Empty</span>
      <div className="flex-col-cen">
        <button onClick={() => setShowModal("addWeeks")}>
          <Plus20 fill={"#a60000"} />
        </button>
        <span className="color-light-gray font-14 margin-5">
          Start Adding Weeks
        </span>
      </div>
    </div>
  );
};

export default MobilePlan;
