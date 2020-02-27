import React from "react";

import PlanText from "../PlanText";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";
import Overview from "../PlanOverview";
import MobileEmpty from "../../shared/MobileEmpty";
import Plus20 from "../../shared/SVGs/Plus20";

import "./planMobile.css";

const MobilePlan = ({ woPlan, isSelf, navState, hasAccess, setShowModal }) => {
  const { weeks, _id: planId } = woPlan;
  useSetLoading(false);
  let to = navState[planId];
  if (!to) {
    to = "/plans";
  }
  useNavBack(to);

  let view;

  if (weeks.length) {
    let weeksDisplay = weeks.map((week, index) => {
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

    if (hasAccess) {
      view = weeksDisplay;
    } else {
      view = (
        <div className="plan-week-container-no-access">{weeksDisplay}</div>
      );
    }
  } else {
    view = (
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
    <>
      <div>
        {!!weeks.length && <Overview woPlan={woPlan} />}
        {view}
      </div>
    </>
  );
};

export default MobilePlan;
