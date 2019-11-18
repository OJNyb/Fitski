import React, { lazy, useState, useEffect, Suspense } from "react";
import usePlans from "../../hooks/usePlans";
import useMobile from "../../hooks/useMobile";
import { useUser } from "../../context/userContext";
import { useAuth } from "../../context/authContext";
import { ACTIVATE_PLAN } from "../../types/plansTypes";
import ConfirmModal from "../shared/Modal/ConfirmModal";
import ActivatePlanModal from "../Plan/ActivatePlanModal";

import "./plans.css";
import SetLoading from "../SetLoading";
import useTitle from "../../hooks/useTitle";
import { activatePlan, deactivatePlan } from "../../utils/planClient";

const MobilePlans = lazy(() => import("./Mobile/PlansMobile"));
const WebPlans = lazy(() => import("./Web/PlansWeb"));

const Plans = () => {
  const isMobile = useMobile();
  const { state, dispatch } = usePlans();
  const user = useUser();
  const { activatePlan: aPlan, deactivatePlan: dPlan } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { activeWOPlan } = user;
  const { isPending, isRejected, woPlans } = state;
  useTitle("Fitnut - Plans");

  useEffect(() => {
    function setActivePlan() {
      dispatch({ type: ACTIVATE_PLAN, payload: { activeWOPlan } });
    }
    setActivePlan();
  }, [dispatch, activeWOPlan, woPlans]);

  function handleActivateClick(e, planId) {
    e.preventDefault();
    console.log("gay");
    setShowModal({ planId, modal: "activate" });
  }

  function handleActivateSubmit(startDate) {
    const { planId } = showModal;
    activatePlan(aPlan, planId, startDate);
    setShowModal(false);
  }

  function handleDeactivateClick(e, planId) {
    e.preventDefault();
    setShowModal({ planId, modal: "deactivate" });
  }

  function handleDeactivateSubmit(e) {
    const { planId } = showModal;
    console.log(showModal);
    console.log(planId);
    e.preventDefault();
    deactivatePlan(dPlan, planId);
    setShowModal(false);
  }

  if (isPending) return null;
  if (isRejected) return <p>Derp</p>;
  if (!woPlans) {
    return <p>Derp...</p>;
  }

  let modal = null;
  if (showModal) {
    if (showModal.modal === "deactivate") {
      modal = (
        <ConfirmModal
          hideModal={() => setShowModal(false)}
          header={"Deactivate plan"}
          onSubmit={handleDeactivateSubmit}
          text={"Are you sure you want to deactivate this plan?"}
        />
      );
    } else if (showModal.modal === "activate") {
      modal = (
        <ActivatePlanModal
          planId={showModal.planId}
          onActivateSubmit={handleActivateSubmit}
          hideModal={() => setShowModal(false)}
        />
      );
    }
  }

  let view;
  if (isMobile) {
    view = (
      <MobilePlans
        woPlans={woPlans}
        handleActivateClick={handleActivateClick}
        handleDeactivateClick={handleDeactivateClick}
      />
    );
  } else {
    view = <WebPlans woPlans={woPlans} dispatch={dispatch} />;
  }

  return (
    <>
      <Suspense fallback={<SetLoading />}>{view}</Suspense>
      {modal}
    </>
  );
};

export default Plans;
