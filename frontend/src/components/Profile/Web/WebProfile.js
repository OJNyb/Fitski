import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { Redirect } from "react-router-dom";

import WebWorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";
import NavMid from "../../shared/NavMid/NavMid";

import "./webProfile.css";

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
      <NavMid
        backText={username}
        backAction={backAction}
        rightBtnText={isSelf ? (editView ? false : "Edit Profile") : false}
        rightBtnAction={
          isSelf
            ? editView
              ? false
              : () => setShowModal({ modal: "edit" })
            : false
        }
      />
      <div>
        <div className="profile-web-info-container width-80p margin-a padding-10-0">
          <img
            src={`/api/image/avatar/${avatar}_lg.jpg`}
            alt="Avatar"
            className="mobile-profile-picture"
          />
          <div className="flex-col padding-s-10">
            <span className="black font-w-400 font-28">{username}</span>
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
    </>
  );
};

export default Profile;
