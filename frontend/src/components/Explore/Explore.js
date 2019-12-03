import React, { lazy, useState, useEffect, Suspense } from "react";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";
import ConfirmModal from "../shared/Modal/ConfirmModal";
import ActivatePlanModal from "../shared/Modal/ActivatePlanModal";
import { makeRequestCreator } from "../../utils/makeRequestCreator";

import SetLoading from "../SetLoading";
import useTitle from "../../hooks/useTitle";
import { activatePlan, deactivatePlan } from "../../utils/userClient";

const searchReq = makeRequestCreator();
const WebExplore = lazy(() => import("./Web/WebExplore"));
const MobileExplore = lazy(() => import("./Mobile/MobileExplore"));

const Explore = () => {
  const isMobile = useMobile();
  const { dispatch: userDispatch } = useAuth();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  useTitle("Fitnut - Explore");

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      if (search.length) {
        const { isCancelled: isReqCancelled, results } = await searchReq(
          `/explore/search?query=${search}`
        );
        if (!isCancelled || !isReqCancelled) {
          setPlans(results);
          setLoading(false);
        }
      }
    }
    fetchData(search);

    return () => {
      isCancelled = true;
    };
  }, [search]);

  function handleSearchChange(e) {
    const { target } = e;
    const { value } = target;
    setSearch(value);
  }

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
      <MobileExplore
        plans={plans}
        search={search}
        onSearchChange={handleSearchChange}
        handleActivateClick={handleActivateClick}
        handleDeactivateClick={handleDeactivateClick}
      />
    );
  } else {
    view = (
      <WebExplore
        plans={plans}
        search={search}
        onSearchChange={handleSearchChange}
      />
    );
  }

  return (
    <>
      <Suspense fallback={<SetLoading />}>{view}</Suspense>
      {modal}
    </>
  );
};

export default Explore;
