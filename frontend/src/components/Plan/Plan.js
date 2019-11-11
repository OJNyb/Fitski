import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";

import PlanNav from "./PlanNav";
import PlanText from "./PlanText";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import ActivatePlanModal from "./ActivatePlanModal";
import useNavWhiteBack from "../../hooks/useNavWhiteBack";
import useMobile from "../../hooks/useMobile";

import "./plan.css";
import Plus20 from "../shared/SVGs/Plus20";

const PlanOverview = ({ history }) => {
  useNavWhiteBack("/plans");
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
    if (isMobile) {
      weeksDisplay = <MobileNoWeeks setShowModal={setShowModal} />;
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
  }

  return (
    <>
      <PlanNav
        planName={name}
        setShowModal={setShowModal}
        isMobile={isMobile}
      />
      <div style={{ padding: "10px 0 50px" }}>
        <h1 className="plan-name black">{name}</h1>
        {/* <p className="plan-description-label black">Description</p>
        <p className="plan-description">{description}</p> */}
        {weeksDisplay}
      </div>

      {modal}
    </>
  );
};

const MobileNoWeeks = ({ setShowModal }) => {
  return (
    <div className="flex-col-cen fixed width-100p plan-mobile-empty-plan-container">
      <span className="color-gray">Workout Plan Empty</span>
      <div className="flex-col-cen">
        <button onClick={() => setShowModal("addWeeks")}>
          <Plus20 fill={"theme"} />
        </button>
        <span className="color-light-gray font-14 margin-5">
          Start Adding Weeks
        </span>
      </div>
    </div>
  );
};

export default withRouter(PlanOverview);
