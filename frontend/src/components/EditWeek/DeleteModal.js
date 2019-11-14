import React, { useState, useContext } from "react";
import Modal from "../shared/Modal/Modal";
import { deleteWeek } from "../../utils/planClient";
import { useParams, useHistory } from "react-router-dom";
import { PlanContext } from "../../context/planContext";
import MobileModal from "./Mobile/DeleteWeekModal";

const DeleteModal = ({ hideModal, prevWeekId, nextWeekId }) => {
  const { plan_id: planId, week_id: weekId } = useParams();
  const { push } = useHistory();
  const { dispatch } = useContext(PlanContext);

  function handleSubmit() {
    deleteWeek(dispatch, planId, weekId);

    let redirectTo = `/plans/${planId}/`;
    if (prevWeekId) {
      redirectTo += `${prevWeekId}`;
    } else if (nextWeekId) {
      redirectTo += `${nextWeekId}`;
    }
    push(redirectTo);

    hideModal();
  }

  return <MobileModal onSubmit={handleSubmit} hideModal={hideModal} />;
  // let children = (
  //   <div className="delete-week-btn-container">
  //     <button className="theme-btn-filled" onClick={handleSubmit}>
  //       Confirm
  //     </button>
  //     <button className="theme-btn" onClick={hideModal}>
  //       Cancel
  //     </button>
  //   </div>
  // );

  // return (
  //   <Modal header={"Delete week"} children={children} toggleModal={hideModal} />
  // );
};

export default DeleteModal;
