import React, { useState, useLayoutEffect } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import useSetNav from "../../../hooks/useSetNav";

import PlanCard from "../../shared/PlanCard/MobilePlanCard";
import LoadingSpinner from "../../shared/SVGs/LoadingSpinner";
import { MainTile, MainContainer } from "../../shared/Layout";

import "./mobileProfile.css";

const Profile = ({
  isSelf,
  woPlans,
  profile,
  navState,
  isPending,
  navDispatch,
  setShowModal,
  accessedPlans,
  handleGetClick,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  const { avatar, username, _id: profileId } = profile;
  const [backLink, setBackLink] = useState(false);

  useSetNav({
    showDehaze: backLink ? false : true,
    backLink: backLink ? backLink : null,
    text: username,
    buttons: isSelf ? (
      <button
        onClick={() => setShowModal({ modal: "edit" })}
        className="padding-5 flex-ai-center border-box color-white"
      >
        <i className="material-icons-outlined">edit</i>
      </button>
    ) : null
  });

  useLayoutEffect(() => {
    function setNav() {
      let to = navState[profileId];
      if (to && navState.backLink !== to) setBackLink(to);
    }

    setNav();
  }, [navDispatch, profileId, navState]);

  let cards = woPlans.map(plan => {
    let hasAccess = false;
    if (accessedPlans.includes(plan._id) || isSelf) {
      hasAccess = true;
    }
    return (
      <PlanCard
        plan={plan}
        key={plan._id}
        profile={profile}
        hasAccess={hasAccess}
        onGetClick={handleGetClick}
        onActivateClick={handleActivateClick}
        onDeactivateClick={handleDeactivateClick}
      />
    );
  });

  return (
    <>
      <MainContainer>
        <MainTile>
          <div className="profile-info-container padding-10-15  theme-border-bottom">
            <img
              src={`/api/image/avatar/${avatar}_md.jpg`}
              alt="Avatar"
              className="mobile-profile-picture"
            />
            <div className="flex-col padding-s-10">
              <span className="black font-w-500 font-16">{username}</span>
              <span className="color-gray font-14">
                Pleighboi who's been gymsharkin' since 2014
              </span>
            </div>
          </div>
          <div>
            <p className="color-light-gray font-14 text-center margin-0 padding-10-0">
              Public Workout Plans
            </p>
            <div>{cards}</div>
            {!cards.length && (
              <p className="color-gray text-center margin-0">
                This user doesn't have any public workout plans
              </p>
            )}
            {isPending && <LoadingSpinner />}
          </div>
        </MainTile>
      </MainContainer>
    </>
  );
};

export default Profile;
