import React, { lazy, useState, useEffect, Suspense, useContext } from "react";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";
import { makeRequestCreator } from "../../utils/makeRequestCreator";
import SetLoading from "../SetLoading";
import useTitle from "../../hooks/useTitle";
import useCleanNavState from "../../hooks/useCleanNavState";
import { NavContext } from "../../context/navContext";
import { activatePlan, deactivatePlan } from "../../utils/userClient";
import axios from "axios";

import ConfirmModal from "../shared/Modal/ConfirmModal";
import ActivatePlanModal from "../shared/Modal/ActivatePlanModal";

import "./explore.css";

const searchReq = makeRequestCreator();
const WebExplore = lazy(() => import("./Web/WebExplore"));
const MobileExplore = lazy(() => import("./Mobile/MobileExplore"));

let trendingPlans;

const Explore = () => {
  const { state: navState } = useContext(NavContext);
  const isMobile = useMobile();
  const { dispatch: userDispatch } = useAuth();
  const [search, setSearch] = useState(navState.search || "");
  const [showModal, setShowModal] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [plans, setPlans] = useState([]);
  const [filter, setFilter] = useState({ goal: "", length: [0, 50] });

  useTitle("Fitnut - Explore");
  useCleanNavState();

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      if (search.length) {
        const { isCancelled: isReqCancelled, results } = await searchReq(
          `/explore/search?query=${search}`
        );
        if (!isCancelled && !isReqCancelled) {
          setPlans(results);
        }
      } else {
        if (!trendingPlans) {
          try {
            var res = await axios.get("explore/trending", {
              params: {
                skip: 0
              }
            });
          } catch (err) {
            console.log(err);
          } finally {
            trendingPlans = res.data;
          }
        }
        if (!isCancelled) {
          setPlans(trendingPlans);
        }
      }
    }
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [search]);

  useEffect(() => {
    let skip = 0;
    let isCancelled;

    function fetchMore(e) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        skip += 40;
        if (skip > 3000) {
          fetchData();
        }
      }
    }

    window.addEventListener("scroll", fetchMore);

    async function fetchData() {
      try {
        var res = await axios.get("explore/trending", {
          params: {
            skip,
            filter
          }
        });
      } catch (err) {
        console.log(err);
      }

      if (res.data.length === 0) {
        setReachedEnd(true);
      } else if (!isCancelled) {
        setPlans(p => [...p, res.data]);
      }
    }
    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", fetchMore);
    };
  }, []);

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
        filter={filter}
        setFilter={setFilter}
        reachedEnd={reachedEnd}
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
        filter={filter}
        setFilter={setFilter}
        reachedEnd={reachedEnd}
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
