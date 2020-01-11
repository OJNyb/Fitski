import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { NavContext } from "../../../context/navContext";
import { setBackLink } from "../../../utils/setBackLink";

const UserCard = ({ user, search, category }) => {
  const [redirect, setRedirect] = useState(false);
  const { dispatch } = useContext(NavContext);
  const { bio, avatar, username, _id: userId } = user;

  const avatarUrl = `/image/avatar/${avatar}_sm.jpg`;

  if (redirect) {
    setBackLink(dispatch, userId, { search, searchCategory: category });

    return <Redirect to={`/profile/${username}`} />;
  }

  let bioDisplay = bio;
  if (!bio || bio.length === 0) {
    bioDisplay = "This user doesn't have a bio";
  }

  return (
    <div
      onClick={() => setRedirect(true)}
      className="padding-10 border-box explore-web-user-card black"
    >
      <div className="explore-web-avatar-container margin-0-5">
        <div style={{ backgroundImage: `url(${avatarUrl})` }}>
          <img src={avatarUrl} alt="Avatar" />
        </div>
      </div>
      <div className="flex-col margin-0-5 border-box width-100p">
        <div className="flex-center-space-bw">
          <div className="flex-col">
            <span className="black line-height-12">{username}</span>
          </div>
        </div>
        <div className="pt-5 font-w-300">{bioDisplay}</div>
      </div>
    </div>
  );
};

export default UserCard;
