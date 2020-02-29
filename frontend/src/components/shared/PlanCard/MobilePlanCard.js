import React, { useState, useContext, useLayoutEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import { NavContext } from "../../../context/navContext";
import { setBackLink } from "../../../utils/setBackLink";

import "./mobilePlanCard.css";

const MobilePlanCard = ({
  plan,
  search,
  profile,
  category,
  onGetClick,
  hasAccess = true,
  onActivateClick,
  onDeactivateClick
}) => {
  const { name, goal, weeks, description, _id: planId, user: author } = plan;
  const [redirect, setRedirect] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useContext(NavContext);
  const me = useUser();
  const { activeWOPlan = {} } = me;
  const { _id: authorId, username } = author;
  const isSelf = authorId === me._id;

  let avatar;
  if (isSelf) {
    let { avatar: a } = me;
    avatar = a;
  } else {
    let { avatar: a } = author;
    avatar = a;
  }

  const avatarUrl = `/api/image/avatar/${avatar}_sm.jpg`;

  const { woPlan: activePlan, endDate } = activeWOPlan;

  useLayoutEffect(() => {
    if (activePlan === planId && new Date(endDate) > new Date()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activePlan, endDate, planId]);

  if (redirect) {
    if (!state[planId]) {
      setBackLink(dispatch, planId, {
        profile,
        search,
        searchCategory: category
      });
    }
    return <Redirect to={`/plans/${planId}`} />;
  }

  function onLinkClick(e) {
    e.stopPropagation();
    setBackLink(dispatch, authorId, {
      profile,
      search,
      searchCategory: category
    });
  }

  let descDisplay = description;

  if (!description || description.length === 0) {
    descDisplay = "This plan doesn't have a description";
  } else {
    let x = descDisplay.split("\n");
    let length = 0;
    let tempText = "";
    for (let y of x) {
      if (length >= 150) {
        tempText = tempText + "...";
        break;
      } else if (y.length + length >= 150) {
        tempText = tempText + y.slice(0, 150 - length) + "...";
        break;
      } else {
        tempText = tempText + y + "\n";
        length = y.length + length + 30;
      }
    }
    descDisplay = tempText;
  }

  let cardBtn;
  if (hasAccess) {
    if (isActive) {
      cardBtn = (
        <CardButton
          filled={true}
          text={"Activated"}
          onClick={e => onDeactivateClick(e, planId)}
        />
      );
    } else {
      cardBtn = (
        <CardButton
          filled={false}
          text={"Activate"}
          onClick={e => onActivateClick(e, planId)}
        />
      );
    }
  } else {
    cardBtn = (
      <CardButton
        filled={false}
        text={"Get"}
        onClick={e => onGetClick(e, planId)}
      />
    );
  }

  let goalDisplay = ` | ${goal} | `;
  if (!goal || !goal.length) {
    goalDisplay = "| ";
  }

  return (
    <div
      onClick={() => setRedirect(true)}
      className="padding-10 flex-stretch border-box width-100p plans-mobile-card black pointer"
    >
      <div className="flex-stretch plans-mobile-plan-author margin-0-5">
        <div style={{ backgroundImage: `url(${avatarUrl})` }}>
          <img src={avatarUrl} alt="Avatar" />
        </div>
      </div>
      <div className="flex-col margin-0-5 border-box width-100p">
        <div className="flex-center-space-bw">
          <div className="flex-col">
            <span className="black line-height-12">{name}</span>
            <span className="font-w-300 font-14 line-height-11">
              <Link
                to={`/profile/${username}`}
                onClick={onLinkClick}
                className="tc mobile-plan-card-link"
              >
                @{username}
              </Link>
              {goalDisplay}
              <span className="inline-block">{weeks.length} weeks</span>
            </span>
            <span className="font-w-300 font-14 line-height-11"></span>
          </div>
          {cardBtn}
        </div>
        <div className="pt-5 font-w-300 ws-pw line-height-125">
          {descDisplay}
        </div>
      </div>
    </div>
  );
};

const CardButton = ({ text, filled, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={
          "m-l-10 padding-0-15 align-s-fs theme-btn" + (filled ? "-filled" : "")
        }
      >
        <span className="mb-1 font-w-500">{text}</span>
      </button>
    </>
  );
};

export default MobilePlanCard;
