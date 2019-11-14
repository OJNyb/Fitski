import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";

import PlanNav from "./PlanNav";
import PlanText from "./PlanText";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import ActivatePlanModal from "./ActivatePlanModal";
import useMobile from "../../hooks/useMobile";
import MobilePlan from "./Mobile/Plan";

import "./plan.css";

const PlanOverview = ({ history }) => {
  const {
    state: { woPlan }
  } = useContext(PlanContext);
  const [showModal, setShowModal] = useState(false);
  const isMobile = useMobile();
  const { user, name, weeks, description, _id: planId } = woPlan;

  function hideModal() {
    setShowModal(false);
  }

  let modal;
  if (showModal) {
    if (showModal === "addWeeks") {
      modal = <AddWeeksModal planId={planId} hideModal={hideModal} />;
    }
    if (showModal === "delete") {
      modal = (
        <DeletePlanModal
          planId={planId}
          redirect={history.push}
          hideModal={hideModal}
        />
      );
    }

    if (showModal === "activate") {
      modal = <ActivatePlanModal planId={planId} hideModal={hideModal} />;
    }
  }

  let weeksDisplay;
  if (weeks.length) {
    weeksDisplay = weeks.map((week, index) => {
      return (
        <PlanText week={week} index={index} planId={planId} key={week._id} />
      );
    });
  } else {
    weeksDisplay = (
      <div className="plan-week-container flex-col-cen">
        <p>Wah gwan! Looks like there's no weeks</p>
        <button
          className="theme-btn-filled"
          onClick={() => setShowModal("addWeeks")}
        >
          Add weeks
        </button>
      </div>
    );
  }

  let view;
  if (isMobile) {
    view = <MobilePlan woPlan={woPlan} setShowModal={setShowModal} />;
  } else {
    view = (
      <div style={{ padding: "10px 0 50px" }}>
        <h1 className="plan-name black">{name}</h1>
        {/* <p className="plan-description-label black">Description</p>
    <p className="plan-description">{description}</p> */}
        {weeksDisplay}
      </div>
    );
  }

  return (
    <>
      <PlanNav
        planName={name}
        setShowModal={setShowModal}
        isMobile={isMobile}
      />
      {view}
      {modal}
    </>
  );
};

export default withRouter(PlanOverview);
