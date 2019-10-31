import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CreatePlanModal from "./CreatePlanModal";
import NavMid from "../shared/NavMid/NavMid";

const PlansNav = ({ isMobile, dispatch }) => {
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
      {(isMobile && (
        <NavMid
          customNav={
            <div className="mobile-nav-more-container">
              <Link to="/create-plan" className="theme-btn padding-4-12">
                {/* <i className="material-icons">more_vert</i> */}
                Create plan
              </Link>
            </div>
          }
        />
      )) || (
        <NavMid
          backText={"Plans"}
          rightBtnText={"Create plan"}
          rightBtnAction={() => setShowModal("createPlan")}
        />
      )}

      {modal}
    </>
  );
};

export default PlansNav;
