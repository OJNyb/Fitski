import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { Redirect } from "react-router-dom";

import WebWorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";

import "./webProfile.css";
import { MainTile, MainTileNav } from "../../shared/Layout";

const Profile = ({ isSelf, woPlans, profile, setShowModal, navState }) => {
  useSetLoading(false);
  const { bio, avatar, username, _id: profileId } = profile;
  const [redirect, setRedirect] = useState(false);
  let to = navState[profileId];
  if (redirect) {
    return <Redirect to={to} />;
  }

  let bioDisplay = bio;
  if (!bio || bio.length === 0) {
    bioDisplay = "This gymshark doesn't have a bio";
  }

  return (
    <>
      <MainTile>
        <MainTileNav>
          <div className="main-tile-header-upper">
            <div className="flex-ai-center">
              {to && (
                <button
                  onClick={() => setRedirect(true)}
                  className="main-tile-arrow-back theme-btn-no-border"
                >
                  <i className="material-icons font-20">arrow_back</i>
                </button>
              )}
              <span
                style={{
                  color: "#1a1414"
                }}
              >
                {username}
              </span>
            </div>

            {isSelf && (
              <button
                className="edit-profile-btn shadow-medium-clickable"
                onClick={() => setShowModal({ modal: "edit" })}
              >
                Edit Profile
              </button>
            )}
          </div>
        </MainTileNav>
        <div>
          <div className="profile-web-info-container padding-10">
            <img
              src={`/api/image/avatar/${avatar}_lg.jpg`}
              alt="Avatar"
              className="mobile-profile-picture"
            />
            <div className="flex-col padding-s-10">
              <span className="black font-w-500 font-24">{username}</span>
              <span className="color-gray font-14">{bioDisplay}</span>
            </div>
          </div>
          <div>
            <p className="color-light-gray font-14 text-center margin-0">
              Workout Plans
            </p>
            <WebWorkoutPlans woPlans={woPlans} profile={profile} />
          </div>
        </div>
      </MainTile>
    </>
  );
};

export default Profile;
