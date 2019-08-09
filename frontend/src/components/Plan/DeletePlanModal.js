import React from "react";
import Modal from "../shared/Modal/Modal";
import axios from "axios";

const DeletePlanModal = ({ planId, redirect, hideModal }) => {
  function onDelete() {
    axios
      .delete(`/plan/${planId}`)
      .then(res => {
        const { data } = res;
        const { message } = data;
        if (message === "success") {
          redirect("/plans");
        } else {
          console.log("err");
        }
      })
      .catch(err => console.log(err.response));
  }
  let children = (
    <div className="delete-week-btn-container">
      <button className="theme-btn-filled" onClick={() => onDelete("delete")}>
        Confirm
      </button>
      <button className="theme-btn" onClick={hideModal}>
        Cancel
      </button>
    </div>
  );

  return (
    <Modal header={"Delete plan"} children={children} toggleModal={hideModal} />
  );
};

export default DeletePlanModal;
