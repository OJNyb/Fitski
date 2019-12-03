import React from "react";
import useSetLoading from "../../hooks/useSetLoading";

import CreatePlanForm from "./CreatePlanForm";

import "./createPlan.css";

const CreatePlan = ({ setRedir }) => {
  useSetLoading(false);

  return (
    <>
      <div className="create-plan-container">
        <CreatePlanForm setRedir={setRedir} isMobile={false} />
      </div>
    </>
  );
};

export default CreatePlan;
