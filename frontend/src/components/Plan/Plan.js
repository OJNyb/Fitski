import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";

import PlanNav from "./PlanNav";
import PlanText from "./PlanText";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import ActivatePlanModal from "./ActivatePlanModal";
import useNavWhiteSingleBack from "../../hooks/useNavWhiteSingleBackNav";
import useMobile from "../../hooks/useMobile";

import "./plan.css";

const PlanOverview = ({ history }) => {
  useNavWhiteSingleBack("/plans");
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
      <div className="plan-week-container">
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

  return (
    <>
      <PlanNav
        planName={name}
        setShowModal={setShowModal}
        isMobile={isMobile}
      />
      <div>
        <h1 className="plan-name">{name}</h1>
        <p className="plan-description-label">Description</p>
        <p className="plan-description">{description}</p>
        {weeksDisplay}
      </div>

      {modal}
    </>
  );
};

export default withRouter(PlanOverview);
