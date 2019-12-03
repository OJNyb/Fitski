import React, { useState, useLayoutEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";

import NavMid from "../shared/NavMid/NavMid";

const PlanNav = ({
  isSelf,
  planId,
  isActive,
  planName,
  setShowModal,
  accessedPlans,
  onGetClick
}) => {
  const [redirect, setRedirect] = useState(false);

  let actionMenuChildren = [
    {
      link: true,
      icon: "description",
      text: "Overview",
      to: `/plans/${planId}/overview`,
      outlined: true
    }
    // {
    //   icon: "edit",
    //   text: "Edit plan",
    //   action: () => setShowModal("edit"),
    //   outlined: true
    // },
  ];

  useLayoutEffect(() => {
    if (isSelf) {
      actionMenuChildren.push(
        {
          icon: "playlist_add",
          text: "Add weeks",
          action: () => setShowModal("addWeeks")
        },
        {
          icon: "delete_outline",
          text: "Delete plan",
          action: () => setShowModal("delete"),
          customClass: " delete-color"
        }
      );
    }
  }, [isSelf, setShowModal, actionMenuChildren]);

  if (redirect) {
    return <Redirect to="/plans" />;
  }

  let rightBtnText;
  let rightBtnAction;
  let rightBtnIcon;
  let rightBtnFilled;

  if (!isSelf && accessedPlans.indexOf(planId) === -1) {
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

  return (
    <>
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
    </>
  );
};

export default withRouter(PlanNav);
