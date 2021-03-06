import React, {
  lazy,
  useState,
  useLayoutEffect,
  useContext,
  Suspense
} from "react";
import useTitle from "../../hooks/useTitle";
import useMobile from "../../hooks/useMobile";
import { editPlan } from "../../utils/planClient";
import { useAuth } from "../../context/authContext";
import useUserAccess from "../../hooks/useUserAccess";
import { NavContext } from "../../context/navContext";
import { addPlan } from "../../utils/userAccessClient";
import { PlanContext } from "../../context/planContext";
import { activatePlan, deactivatePlan } from "../../utils/userClient";
import { SET_HAS_ACCESS } from "../../types/planTypes";

import PlanNav from "./PlanNav";
import EditPlanModal from "./EditPlanModal";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import RemovePlanModal from "./RemovePlanModal";
import ActivatePlanModal from "../shared/Modal/ActivatePlanModal";
import ConfirmModal from "../shared/Modal/ConfirmModal";
import SetLoading from "../SetLoading";
import { MainTile, MainContainer, SecondTile } from "../shared/Layout";

import "./plan.css";
import { Link } from "react-router-dom";
import { useError } from "../../context/errorContext";

const MobilePlan = lazy(() => import("./Mobile/MobilePlan"));
const WebPlan = lazy(() => import("./Web/WebPlan"));

const Plan = () => {
  const isMobile = useMobile();
  const {
    state: { woPlan, hasAccess },
    dispatch
  } = useContext(PlanContext);
  const { setError } = useError();
  const { state: userState, dispatch: userDispatch } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSelf, setIsSelf] = useState(false);
  const { user: currUser } = userState;
  const { _id: userId, activeWOPlan } = currUser;
  const {
    name,
    goal,
    access,
    price,
    difficulty,
    description,
    _id: planId
  } = woPlan;
  const { state: accessState, dispatch: accessDispatch } = useUserAccess();
  const { accessedPlans, isPending: accessPending } = accessState;
  const { state: navState, dispatch: navDispatch } = useContext(NavContext);

  useLayoutEffect(() => {
    function setActive() {
      if (userId === woPlan.user._id) {
        setIsSelf(true);
      } else {
        setIsSelf(false);
      }
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
  }, [planId, woPlan, userId, setIsSelf, activeWOPlan, isSelf, accessedPlans]);

  useTitle(name);

  function hideModal() {
    setShowModal(false);
  }

  function handleActivateSubmit(startDate) {
    activatePlan(userDispatch, planId, startDate);
    setShowModal(false);
  }

  function handleDeactivateSubmit(e) {
    e.preventDefault();
    deactivatePlan(userDispatch, planId).catch(err =>
      setError({ el: err, id: "deactivate" })
    );
    setShowModal(false);
  }

  function handleGetClick() {
    addPlan(accessDispatch, planId)
      .then(() => {
        dispatch({
          type: SET_HAS_ACCESS
        });
      })
      .catch(err => {
        setError({ el: err, id: "get" });
      });
  }

  function handleEditSubmit(values) {
    const submitValues = { ...values };
    const {
      name: vName,
      goal: vGoal,
      access: vAccess,
      difficulty: vDifficulty,
      description: vDescription,
      price: vPrice
    } = submitValues;
    if (name === vName) {
      delete submitValues.name;
    }
    if (goal === vGoal) {
      delete submitValues.goal;
    }
    if (access === vAccess) {
      delete submitValues.access;
    }
    if (difficulty === vDifficulty || !vDifficulty.length) {
      delete submitValues.difficulty;
    }
    if (description === vDescription) {
      delete submitValues.description;
    }
    if (price === vPrice || access !== "paywall") {
      delete submitValues.price;
    }

    if (Object.keys(submitValues).length) {
      editPlan(dispatch, planId, submitValues);
    }
  }

  if (accessPending) {
    return null;
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
      modal = <DeletePlanModal woPlan={woPlan} hideModal={hideModal} />;
    } else if (showModal === "remove") {
      modal = <RemovePlanModal woPlan={woPlan} hideModal={hideModal} />;
    } else if (showModal === "activate") {
      modal = (
        <ActivatePlanModal
          planId={planId}
          hideModal={hideModal}
          onActivateSubmit={handleActivateSubmit}
        />
      );
    } else if (showModal === "deactivate") {
      modal = (
        <ConfirmModal
          hideModal={hideModal}
          header={"Deactivate plan"}
          onSubmit={handleDeactivateSubmit}
          text={"Are you sure you want to deactivate this plan?"}
        />
      );
    } else if (showModal === "edit") {
      modal = (
        <EditPlanModal
          plan={woPlan}
          hideModal={hideModal}
          onSubmit={handleEditSubmit}
        />
      );
    }
  }

  let view;
  if (isMobile) {
    view = (
      <MobilePlan
        woPlan={woPlan}
        setShowModal={setShowModal}
        isSelf={isSelf}
        navState={navState}
        navDispatch={navDispatch}
        hasAccess={hasAccess}
      />
    );
  } else {
    view = (
      <WebPlan
        woPlan={woPlan}
        setShowModal={setShowModal}
        isSelf={isSelf}
        hasAccess={hasAccess}
      />
    );
  }

  return (
    <>
      <MainContainer>
        <MainTile maxWidth={710}>
          <PlanNav
            plan={woPlan}
            planId={planId}
            isSelf={isSelf}
            planName={name}
            isMobile={isMobile}
            isActive={isActive}
            navState={navState}
            navDispatch={navDispatch}
            setShowModal={setShowModal}
            hasAccess={hasAccess}
            onGetClick={handleGetClick}
          />
          <Suspense fallback={<SetLoading />}>{view}</Suspense>
        </MainTile>
        <SecondTile>
          {!hasAccess && access === "paywall" && (
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
          )}
        </SecondTile>
      </MainContainer>
      {modal}
    </>
  );
};

export default Plan;
