import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import NavMid from "../shared/NavMid/NavMid";

const PlanNav = ({ planId, isActive, planName, setShowModal }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/plans" />;
  }

  let rightBtnText;
  let rightBtnAction;
  let rightBtnIcon;

  if (isActive) {
    rightBtnText = "Deactivate";
    rightBtnIcon = "stop";
    rightBtnAction = () => setShowModal("deactivate");
  } else {
    rightBtnText = "Activate";
    rightBtnIcon = "play_arrow";
    rightBtnAction = () => setShowModal("activate");
  }

  return (
    <>
      <NavMid
        backText={planName}
        backAction={() => setRedirect(true)}
        rightBtnText={rightBtnText}
        rightBtnIcon={rightBtnIcon}
        rightBtnAction={rightBtnAction}
        rightBtnOutlined={true}
        actionMenuChildren={[
          {
            link: true,
            icon: "description",
            text: "Overview",
            to: `/plans/${planId}/overview`,
            outlined: true
          },
          // {
          //   icon: "edit",
          //   text: "Edit plan",
          //   action: () => setShowModal("edit"),
          //   outlined: true
          // },
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
        ]}
      />
    </>
  );
};

export default withRouter(PlanNav);
