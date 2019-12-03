import React, { lazy, useState, Suspense } from "react";
import usePlans from "../../hooks/usePlans";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";
import ConfirmModal from "../shared/Modal/ConfirmModal";
import ActivatePlanModal from "../shared/Modal/ActivatePlanModal";

import SetLoading from "../SetLoading";
import useTitle from "../../hooks/useTitle";
import { activatePlan, deactivatePlan } from "../../utils/userClient";

const MobilePlans = lazy(() => import("./Mobile/MobilePlans"));
const WebPlans = lazy(() => import("./Web/WebPlans"));

const Plans = () => {
  const isMobile = useMobile();
  const { state, dispatch } = usePlans();
  const { dispatch: userDispatch } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { isPending, isRejected, woPlans } = state;
  useTitle("Fitnut - Plans");

  function handleActivateClick(e, planId) {
    e.preventDefault();
    setShowModal({ planId, modal: "activate" });
  }

  function handleActivateSubmit(startDate) {
    const { planId } = showModal;
    activatePlan(userDispatch, planId, startDate);
    setShowModal(false);
  }

  function handleDeactivateClick(e, planId) {
    e.preventDefault();
    setShowModal({ planId, modal: "deactivate" });
  }

  function handleDeactivateSubmit(e) {
    const { planId } = showModal;
    e.preventDefault();
    deactivatePlan(userDispatch, planId);
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
