import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";

import PlanNav from "./PlanNav";
import PlanText from "./PlanText";
import AddWeeksModal from "./AddWeeksModal";
import DeletePlanModal from "./DeletePlanModal";
import ActivatePlanModal from "./ActivatePlanModal";

import "./plan.css";

const PlanOverview = ({ history }) => {
  const {
    state: { woPlan },
    dispatch
  } = useContext(PlanContext);

  const [showModal, setShowModal] = useState(false);
  const { user, name, weeks, description, _id: planId } = woPlan;

  // const { username, avatar } = user;

  console.log(user);

  function hideModal() {
    setShowModal(false);
  }

  let modal;
  if (showModal) {
    if (showModal === "addWeeks") {
      modal = <AddWeeksModal planId={planId} hideModal={hideModal} />;
    }
    if (showModal === "delete") {
      modal = (
        <DeletePlanModal
          planId={planId}
          redirect={history.push}
          hideModal={hideModal}
        />
      );
    }

    if (showModal === "activate") {
      modal = <ActivatePlanModal planId={planId} hideModal={hideModal} />;
    }
  }

  let weeksDisplay;
  if (weeks.length) {
    weeksDisplay = weeks.map((week, index) => {
      return (
        <PlanText week={week} index={index} planId={planId} key={week._id} />
      );
    });
  } else {
    weeksDisplay = (
      <div className="plan-week-container">
        <p>Wah gwan! Looks like there's no weeks</p>
        <button
          className="theme-btn-filled"
          onClick={() => setShowModal("addWeeks")}
        >
          Add weeks
        </button>
      </div>
    );
  }

  console.log(user);

  return (
    <>
      <PlanNav planName={name} setShowModal={setShowModal} />
      <div>
        <h1 className="plan-name">{name}</h1>
        {/* <div className="plan-author-container">
          <img src={avatar} />
          <div>
            <span className="plan-author-label">Author:</span>
            <br />
            <span className="plan-author-uname">{username}</span>
          </div>
        </div> */}
        <p className="plan-description-label">Description</p>
        <p className="plan-description">{description}</p>
        {weeksDisplay}
      </div>
      {/*   <div className="wavy-background-container">
        <svg
          width="200"
          height="720"
          viewBox="0 0 200 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H200V720H95L63.5752 631.514C35.364 552.078 44.3218 464.17 87.976 392.056V392.056C154.003 282.984 138.283 143.123 49.6903 51.4295L0 0Z"
            fill="#C4C4C4"
          />
        </svg>
      </div> */}
      {modal}
    </>
  );
};

export default withRouter(PlanOverview);
