import React, {
  lazy,
  useRef,
  useState,
  useEffect,
  Suspense,
  useContext
} from "react";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";
import { makeRequestCreator } from "../../utils/makeRequestCreator";
import SetLoading from "../SetLoading";
import useTitle from "../../hooks/useTitle";
import useCleanNavState from "../../hooks/useCleanNavState";
import { NavContext } from "../../context/navContext";
import { activatePlan, deactivatePlan } from "../../utils/userClient";

import ConfirmModal from "../shared/Modal/ConfirmModal";
import ActivatePlanModal from "../shared/Modal/ActivatePlanModal";

import "./explore.css";

const searchReq = makeRequestCreator();
const trendingReq = makeRequestCreator();

const WebExplore = lazy(() => import("./Web/WebExplore"));
const MobileExplore = lazy(() => import("./Mobile/MobileExplore"));

const Explore = () => {
  const { state: navState } = useContext(NavContext);
  const isMobile = useMobile();
  const { dispatch: userDispatch } = useAuth();

  const [search, setSearch] = useState(navState.search || "");
  const prevSearch = useRef("");
  const keepOldPlans = useRef(true);
  const [noMatch, setNoMatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [results, setResults] = useState([]);
  // const [filter, setFilter] = useState({ goal: "", length: [0, 50] });
  const isCancelled = useRef(false);
  //  const skip = useRef(0);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState(navState.searchCategory || "plans");

  console.log(navState);

  useTitle("Fitnut - Explore");
  useCleanNavState();

  useEffect(() => {
    async function fetchData() {
      if (search.length) {
        let req;
        if (category === "plans") {
          req = `/explore/search?search=${search}&skip=${skip}`;
        } else {
          req = `/explore/users/search?username=${search}&skip=${skip}`;
        }

        const { error, isCancelled: isReqCancelled, results } = await searchReq(
          req
        );
        if (error) {
          return console.log(error);
        }

        if (!isCancelled.current || !isReqCancelled) {
          if (results.length === 0) {
            if (results.length) {
              setReachedEnd(true);
            } else {
              setNoMatch(true);
            }
          } else {
            if (keepOldPlans.current) {
              setResults(p => [...p, ...results]);
            } else {
              setResults(results);
            }
            prevSearch.current = search;
          }
        } else if (isReqCancelled && !isCancelled.current) {
          setResults([]);
        }
      } else {
        if (category === "people") return;
        const {
          error,
          isCancelled: isReqCancelled,
          results
        } = await trendingReq(`/explore/trending?skip=${skip}`);
        if (error) {
          return console.log(error);
        }
        if (!isCancelled.current || !isReqCancelled) {
          if (results.length === 0) {
            setReachedEnd(true);
          } else {
            if (keepOldPlans.current) {
              setResults(p => [...p, ...results]);
            } else {
              setResults(results);
            }
            prevSearch.current = search;
          }
        } else if (isReqCancelled && !isCancelled.current) {
          setResults([]);
        }
      }
    }
    fetchData();

    return () => {
      isCancelled.current = true;
    };
  }, [skip, search, category]);

  useEffect(() => {
    function fetchMore(e) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        keepOldPlans.current = true;
        setSkip(s => (s += 40));
        console.log("gay");
      }
    }

    window.addEventListener("scroll", fetchMore);
    return () => {
      window.removeEventListener("scroll", fetchMore);
    };
  }, []);

  function handlePeopleClick() {
    setCategory("people");
    setSkip(0);
    setResults([]);
  }

  function handlePlanClick() {
    setCategory("plans");
    setSkip(0);
    setResults([]);
  }

  function handleSearchChange(e) {
    const { target } = e;
    const { value } = target;
    setSkip(0);
    setReachedEnd(false);
    setResults([]);
    setNoMatch(false);
    keepOldPlans.current = false;
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
        results={results}
        search={search}
        category={category}
        noMatch={noMatch}
        reachedEnd={reachedEnd}
        onSearchChange={handleSearchChange}
        handlePlanClick={handlePlanClick}
        handlePeopleClick={handlePeopleClick}
        handleActivateClick={handleActivateClick}
        handleDeactivateClick={handleDeactivateClick}
      />
    );
  } else {
    view = (
      <WebExplore
        search={search}
        noMatch={noMatch}
        results={results}
        category={category}
        reachedEnd={reachedEnd}
        onSearchChange={handleSearchChange}
        handlePlanClick={handlePlanClick}
        handlePeopleClick={handlePeopleClick}
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
