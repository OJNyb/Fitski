import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import CreatePlanModal from "./CreatePlanModal";
import NavMid from "../shared/NavMid/NavMid";

const PlansNav = ({ dispatch }) => {
  const [showModal, setShowModal] = useState(false);

  let modal;
  if (showModal) {
    modal = (
      <CreatePlanModal
        dispatch={dispatch}
        hideModal={() => setShowModal(false)}
      />
    );
  }

  return (
    <>
      <NavMid
        backText={"Plans"}
        rightBtnText={"Create plan"}
        rightBtnAction={() => setShowModal("createPlan")}
      />
      {modal}
    </>
  );
};

export default PlansNav;
