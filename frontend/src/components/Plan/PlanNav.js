import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { PlanContext } from "./../../context/planContext";

import NavMid from "../shared/NavMid/NavMid";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";

import { ADD_WEEK } from "../../reducers/planTypes";

const PlanNav = ({
  planName,
  history: { push },
  match: {
    params: { plan_id: planId, week_id: weekId }
  }
}) => {
  const [showModal, setShowModal] = useState("addWeeks");

  function redirect(weekId) {
    push(`/plans/${planId}/${weekId}`);
  }

  function hideModal() {
    setShowModal(false);
  }

  // function handleSubmit(method, data) {
  //   let request = {
  //     url: `/plan/week/${planId}/${weekId}`,
  //     method
  //   };

  //   if (data) request.data = data;

  //   axios(request)
  //     .then(res => {
  //       const { data: resData } = res;
  //       const { message } = resData;
  //       if (message === "success") {
  //         setShowModal(false);
  //         if (method === "delete") {
  //           // TODO: go to prev week
  //           dispatch({ type: DELETE_WEEK, payload: { weekId } });
  //         } else {
  //           dispatch({ type: EDIT_WEEK, payload: { data, weekId } });
  //         }
  //       }
  //     })
  //     .catch(err => console.log(err.response));
  // }

  let modal;
  if (showModal) {
    if (showModal === "addWeeks") {
      modal = <AddWeeksModal planId={planId} hideModal={hideModal} />;
    }
    if (showModal === "delete") {
      modal = (
        <DeletePlanModal
          planId={planId}
          redirect={push}
          hideModal={hideModal}
        />
      );
    }
  }

  // TODO:
  let rightBtnText = "Activate";

  return (
    <>
      <NavMid
        backText={planName}
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
            action: () => setShowModal("delete")
          }
        ]}
      />
      {modal}
    </>
  );
};

export default withRouter(PlanNav);
