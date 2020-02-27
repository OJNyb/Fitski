import React, { useState, useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";
import { SET_PLAN_BACKLINK } from "../../types/navTypes";

import NavMid from "../shared/NavMid/NavMid";

const PlanNav = ({
  isSelf,
  planId,
  isActive,
  planName,
  navState,
  navDispatch,
  onGetClick,
  setShowModal,
  hasAccess
}) => {
  const [redirect, setRedirect] = useState(false);
  const [actionMenuChildren, setActionMenuChildren] = useState([]);

  useLayoutEffect(() => {
    if (isSelf) {
      setActionMenuChildren([
        {
          icon: "playlist_add",
          text: "Add weeks",
          action: () => setShowModal("addWeeks")
        },
        {
          icon: "edit",
          text: "Edit plan",
          action: () => setShowModal("edit"),
          outlined: true
        },
        {
          icon: "delete_outline",
          text: "Delete plan",
          action: () => setShowModal("delete"),
          customClass: " delete-color"
        }
      ]);
    } else {
      if (!isSelf && hasAccess) {
        setActionMenuChildren([
          {
            icon: "delete_outline",
            text: "Remove plan",
            action: () => setShowModal("remove"),
            customClass: " delete-color"
          }
        ]);
      }
    }
  }, [isSelf, setShowModal, hasAccess, planId]);

  if (redirect) {
    let to = navState[planId];

    if (to) {
      navDispatch({ type: SET_PLAN_BACKLINK, payload: { [planId]: null } });
    } else {
      to = "/plans";
    }

    return <Redirect to={to} />;
  }

  let rightBtnText;
  let rightBtnAction;
  let rightBtnIcon;
  let rightBtnFilled;

  if (!hasAccess) {
    rightBtnText = "Get";
    rightBtnIcon = "assignment_returned";
    rightBtnFilled = false;
    rightBtnAction = () => onGetClick();
  } else if (isActive) {
    rightBtnText = "Deactivate";
    rightBtnIcon = "block";
    rightBtnAction = () => setShowModal("deactivate");
    rightBtnFilled = true;
  } else {
    rightBtnText = "Activate";
    rightBtnIcon = "play_arrow";
    rightBtnAction = () => setShowModal("activate");
    rightBtnFilled = false;
  }

  if (!hasAccess) {
    return <NavMid backText={planName} backAction={() => setRedirect(true)} />;
  }

  return (
    <NavMid
      backText={planName}
      backAction={() => setRedirect(true)}
      rightBtnText={rightBtnText}
      rightBtnIcon={rightBtnIcon}
      rightBtnAction={rightBtnAction}
      rightBtnFilled={rightBtnFilled}
      rightBtnOutlined={false}
      actionMenuChildren={actionMenuChildren}
    />
  );
};

export default PlanNav;
