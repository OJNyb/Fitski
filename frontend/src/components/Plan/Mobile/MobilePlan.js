import React from "react";

import PlanText from "../PlanText";
import "./planMobile.css";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";
import Overview from "../PlanOverview";
import MobileEmpty from "../../shared/MobileEmpty";
import Plus20 from "../../shared/SVGs/Plus20";

const MobilePlan = ({ woPlan, isSelf, navState, setShowModal }) => {
  const { weeks, _id: planId } = woPlan;
  useSetLoading(false);
  let to = navState[planId];
  if (!to) {
    to = "/plans";
  }
  useNavBack(to);

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
    weeksDisplay = (
      <MobileEmpty
        text={"Workout Plan Empty"}
        children={
          isSelf
            ? [
                {
                  text: "Start Adding Weeks",
                  icon: <Plus20 fill={"#a60000"} />,
                  onClick: () => setShowModal("addWeeks")
                }
              ]
            : []
        }
      />
    );
  }
  return (
    <div style={{ padding: "10px 0 50px" }}>
      {!!weeks.length && <Overview woPlan={woPlan} />}
      {weeksDisplay}
    </div>
  );
};

export default MobilePlan;
