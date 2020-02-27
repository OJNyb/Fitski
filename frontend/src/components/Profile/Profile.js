import React, {
  lazy,
  useState,
  Suspense,
  useContext,
  useLayoutEffect
} from "react";
import { useParams } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import useProfile from "../../hooks/useProfile";
import SetLoading from "../SetLoading";
import useProfilePlans from "../../hooks/useProfilePlans";
import useUserAccess from "../../hooks/useUserAccess";
import { addPlan } from "../../utils/userAccessClient";
import { editUser } from "../../utils/userClient";
import { useAuth } from "../../context/authContext";
import { activatePlan, deactivatePlan } from "../../utils/userClient";
import { NavContext } from "../../context/navContext";
import useTitle from "../../hooks/useTitle";

import EditProfileModal from "./EditProfileModal";
import ErrorText from "../shared/ErrorText";
const WebProfile = lazy(() => import("./Web/WebProfile"));
const MobileProfile = lazy(() => import("./Mobile/MobileProfile"));
const loadConfirmModal = () => import("../shared/Modal/ConfirmModal");
const loadActivateModal = () => import("../shared/Modal/ActivatePlanModal");
const ActivatePlanModal = lazy(loadActivateModal);
const ConfirmModal = lazy(loadConfirmModal);

const Profile = () => {
  const { username } = useParams();
  const { state, dispatch } = useProfile(username);
  const { state: planState } = useProfilePlans(username);
  const { state: accessState, dispatch: accessDispatch } = useUserAccess();
  const { state: userState, dispatch: userDispatch } = useAuth();
  const isMobile = useMobile();
  const [isSelf, setIsSelf] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { state: navState, dispatch: navDispatch } = useContext(NavContext);

  const { user } = userState;

  const { _id: userId } = user;

  const {
    woPlans,
    isPending: plansPending,
    isRejected: plansRejected
  } = planState;
  const {
    accessedPlans,
    isPending: accessPending,
    isRejected: accessRejected
  } = accessState;
  const { profile, isPending, isRejected, error } = state;

  useLayoutEffect(() => {
    if (profile) {
      if (userId === profile._id) {
        setIsSelf(true);
      } else {
        setIsSelf(false);
      }
    }
  }, [userId, profile]);

  useLayoutEffect(() => {
    if (profile) {
      if (userId === profile._id) {
        setIsSelf(true);
      } else {
        setIsSelf(false);
      }
    }
  }, [userId, profile]);

  useTitle(username);

  function handleActivateClick(e, planId) {
    e.stopPropagation();
    setShowModal({ planId, modal: "activate" });
  }

  function handleActivateSubmit(startDate) {
    const { planId } = showModal;
    activatePlan(userDispatch, planId, startDate);
    setShowModal(false);
  }

  function handleDeactivateClick(e, planId) {
    e.stopPropagation();
    setShowModal({ planId, modal: "deactivate" });
  }

  function handleDeactivateSubmit(e) {
    const { planId } = showModal;
    e.stopPropagation();
    deactivatePlan(userDispatch, planId);
    setShowModal(false);
  }

  function handleGetClick(e, planId) {
    e.stopPropagation();
    addPlan(accessDispatch, planId);
  }

  function handleEditProfile(values) {
    const { bio: oldBio } = user;
    const { avatar, bio } = values;
    if (!avatar) delete values.avatar;
    if (bio === oldBio) delete values.bio;

    if (Object.keys(values).length) {
      editUser(userDispatch, dispatch, values).then(() => setShowModal(false));
    } else {
      setShowModal(false);
    }
  }

  if (isPending || accessPending) {
    return null;
  }

  if (isRejected || plansRejected || accessRejected) {
    return <ErrorText error={error} />;
  }

  if (!profile) {
    return <p>No profile found with that username</p>;
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
    } else if (showModal.modal === "edit") {
      modal = (
        <EditProfileModal
          user={user}
          onSubmit={handleEditProfile}
          hideModal={() => setShowModal(false)}
        />
      );
    }
  }

  let view;
  if (isMobile) {
    view = (
      <MobileProfile
        isSelf={isSelf}
        profile={profile}
        woPlans={woPlans}
        navState={navState}
        isPending={plansPending}
        navDispatch={navDispatch}
        accessedPlans={accessedPlans}
        handleGetClick={handleGetClick}
        setShowModal={setShowModal}
        handleActivateClick={handleActivateClick}
        handleDeactivateClick={handleDeactivateClick}
        handleEditProfile={handleEditProfile}
      />
    );
  } else {
    view = (
      <WebProfile
        isSelf={isSelf}
        profile={profile}
        woPlans={woPlans}
        navState={navState}
        setShowModal={setShowModal}
      />
    );
  }

  return (
    <>
      <Suspense fallback={<SetLoading />}>{view}</Suspense>
      <Suspense fallback={<SetLoading />}>{modal}</Suspense>
    </>
  );
};

export default Profile;
