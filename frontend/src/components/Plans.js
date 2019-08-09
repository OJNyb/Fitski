import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import usePlans from "../hooks/usePlans";

import AddPlanModal from "./AddPlanModal";

import "./plans.css";

// TODO: delete contenxt ?

const Plans = () => {
  const [showModal, setShowModal] = useState(false);
  const { state, dispatch } = usePlans();

  const { isPending, isRejected, woPlans } = state;

  if (isPending) return <p>Loading...</p>;

  if (isRejected) return <p>Derp</p>;

  if (!woPlans) {
    return <p>Loading...</p>;
  }

  console.log(woPlans);

  let modal;

  if (showModal) {
    modal = (
      <AddPlanModal dispatch={dispatch} hideModal={() => setShowModal(false)} />
    );
  }

  console.log();

  let woPlansTable = woPlans.map(plan => (
    <div key={plan._id}>
      <Link to={`/plans/${plan._id}`}>{plan._id}</Link>
    </div>
  ));

  console.log(woPlans);
  return (
    <>
      {modal}
      <div className="nav-mid-header-container">
        <div>
          <h2>Plans</h2>
        </div>
      </div>
      <button onClick={() => setShowModal("addPlan")}>Add plan</button>
      <p>ars</p>
      {woPlansTable}
    </>
  );
};

export default Plans;
