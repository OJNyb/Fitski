import React, { useContext } from "react";
import { PlanContext } from "../../context/planContext";

// import PlanTable from "../shared/PlanTable";
import PlanNav from "./PlanNav";
import PlanText from "../shared/PlanText";
import "./plan.css";

const PlanOverview = () => {
  const {
    state: { woPlan },
    dispatch
  } = useContext(PlanContext);

  console.log(woPlan);

  const { name, weeks, description, _id: planId } = woPlan;

  let weeksDisplay = weeks.map((week, index) => {
    return (
      <PlanText week={week} index={index} planId={planId} key={week._id} />
    );
  });

  return (
    <>
      <PlanNav planName={name} />
      <div>
        <h1 className="plan-name">{name}</h1>
        <p>Name, description, author, ?? </p>
        <p>{description}</p>
        {weeksDisplay}
      </div>
    </>
  );
};

export default PlanOverview;
