import React from "react";

import PlanText from "../PlanText";
import useSetLoading from "../../../hooks/useSetLoading";
import useNavBack from "../../../hooks/useNavBack";
import Overview from "../PlanOverview";
import MobileEmpty from "../../shared/MobileEmpty";
import Plus20 from "../../shared/SVGs/Plus20";
import { Link } from "react-router-dom";

import "./planMobile.css";

const MobilePlan = ({ woPlan, isSelf, navState, hasAccess, setShowModal }) => {
  const { weeks, _id: planId, access, name, price } = woPlan;

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

    if (hasAccess || access === "public") {
      view = weeksDisplay;
    } else {
      view = (
        <>
          {!hasAccess && access === "paywall" && (
            <div className="purchase-plan-mobile-container">
              <div className="purchase-plan-container shadow-medium">
                <p className="purchase-plan-name">{name}</p>
                <p className="purchase-plan-price">{price}$</p>
                <Link
                  to={`/checkout/${planId}`}
                  className="purchase-plan-button shadow-medium-clickable"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          )}
          <div className="plan-week-container-no-access">{weeksDisplay}</div>
        </>
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
