import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";

import NavMid from "../shared/NavMid/NavMid";

const PlanNav = ({ planName, setShowModal }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/plans" />;
  }

  // TODO:
  let rightBtnText = "Activate";

  return (
    <>
      <NavMid
        backText={planName}
        backAction={() => setRedirect(true)}
        rightBtnText={rightBtnText}
        actionMenuChildren={[
          {
            icon: "edit",
            text: "Edit plan",
            action: () => setShowModal("edit"),
            customClass: " nav-minified-icon",
            outlined: true
          },
          {
            icon: "playlist_add",
            text: "Add weeks",
            action: () => setShowModal("addWeeks"),
            customClass: " nav-minified-icon"
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
