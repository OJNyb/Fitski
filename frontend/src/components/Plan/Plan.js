import React, { useState, useEffect, useContext } from "react";
import useTitle from "../../hooks/useTitle";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/userContext";
import { PlanContext } from "../../context/planContext";
import { activatePlan, deactivatePlan } from "../../utils/planClient";

import PlanNav from "./PlanNav";
import PlanText from "./PlanText";
import MobilePlan from "./Mobile/Plan";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import ActivatePlanModal from "./ActivatePlanModal";
import ConfirmModal from "../shared/Modal/ConfirmModal";

import "./plan.css";

const Plan = () => {
  const isMobile = useMobile();
  const {
    state: { woPlan }
  } = useContext(PlanContext);
  const currUser = useUser();
  const { activatePlan: aPlan, deactivatePlan: dPlan } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { activeWOPlan } = currUser;
  const { user, name, weeks, _id: planId } = woPlan;

  useEffect(() => {
    function setActive() {
      if (activeWOPlan) {
        const { woPlan, endDate } = activeWOPlan;
        if (woPlan === planId && new Date(endDate) > new Date()) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    }
    setActive();
  }, [planId, activeWOPlan]);

  console.log(isActive);

  useTitle(name);

  function hideModal() {
    setShowModal(false);
  }

  function handleActivateSubmit(planId, startDate) {
    activatePlan(aPlan, planId, startDate);
    setShowModal(false);
  }

  function handleDeactivateSubmit(e, planId) {
    e.preventDefault();
    deactivatePlan(dPlan, planId);
  }

  let modal;
  if (showModal) {
    if (showModal === "addWeeks") {
      modal = (
        <AddWeeksModal
          planId={planId}
          hideModal={hideModal}
          onActivateSubmit={handleActivateSubmit}
        />
      );
    } else if (showModal === "delete") {
      modal = <DeletePlanModal planId={planId} hideModal={hideModal} />;
    } else if (showModal === "activate") {
      modal = <ActivatePlanModal planId={planId} hideModal={hideModal} />;
    } else if (showModal === "dectivate") {
      modal = (
        <ConfirmModal
          hideModal={hideModal}
          header={"Deactivate plan"}
          onSubmit={handleDeactivateSubmit}
          text={"Are you sure you want to deactivate this plan?"}
        />
      );
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
        planId={planId}
        planName={name}
        setShowModal={setShowModal}
        isMobile={isMobile}
        isActive={isActive}
      />
      {view}
      {modal}
      <button className="theme-btn">Active</button>
    </>
  );
};

export default Plan;
