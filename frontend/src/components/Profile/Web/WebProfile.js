import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { Redirect } from "react-router-dom";

import WebWorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";
import NavMid from "../../shared/NavMid/NavMid";

import "./webProfile.css";
import { MainTile, MainTileNav, MainTileHeader } from "../../shared/Layout";

const Profile = ({
  isSelf,
  woPlans,
  profile,
  editView,
  setShowModal,
  navState
}) => {
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

  let backAction;

  if (to) {
    backAction = () => setRedirect(true);
  }

  return (
    <>
      <MainTile>
        <MainTileNav>
          <MainTileHeader
            text={username}
            customIcon={
              isSelf ? (
                editView ? (
                  false
                ) : (
                  <button
                    className="edit-profile-btn shadow-medium-clickable"
                    onClick={
                      isSelf
                        ? editView
                          ? false
                          : () => setShowModal({ modal: "edit" })
                        : false
                    }
                  >
                    Edit Profile
                  </button>
                )
              ) : (
                false
              )
            }
          />
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
