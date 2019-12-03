import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import PlanCard from "../../shared/PlanCard/MobilePlanCard";
import MobileNavMidContainer from "../../shared/NavMid/MobileNavMidContainer";

import "./mobileProfile.css";

const Profile = ({
  isSelf,
  woPlans,
  profile,
  setEditView,
  setShowModal,
  accessedPlans,
  handleGetClick,
  handleActivateClick,
  handleDeactivateClick
}) => {
  useSetLoading(false);
  const { avatar, username } = profile;

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
      <MobileNavMidContainer
        children={
          <>
            <h2 className="margin-0 font-w-500 mb-2 font-18 color-white">
              {username}
            </h2>
            <button
              onClick={() => setShowModal({ modal: "edit" })}
              className="padding-5 flex-ai-center border-box color-white"
            >
              <i className="material-icons-outlined">edit</i>
            </button>
          </>
        }
      />
      <div>
        <div className="profile-info-container padding-10-15">
          <img
            src={`/image/avatar/${avatar}_sm.jpg`}
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
          <p className="color-light-gray font-14 text-center margin-0">
            Workout Plans
          </p>
          <div>{cards}</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
