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

  const { name, weeks, description, _id: planId } = woPlan;

  let weeksDisplay = weeks.map(week => {
    return <PlanText week={week} planId={planId} key={week._id} />;
  });

  return (
    <>
      <PlanNav planName={name} />
      <div>
        <p>Name, description, author, ?? </p>
        <h1 className="plan-name">{name}</h1>
        <p>{description}</p>
        {weeksDisplay}
      </div>
    </>
  );
};

export default PlanOverview;
