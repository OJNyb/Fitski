import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import useNavDehaze from "../../hooks/useNavDehaze";

import CreatePlanForm from "./CreatePlanForm";

import "./createPlan.css";

const MobileCreatePlan = ({ setRedir }) => {
  useSetLoading(false);
  useNavDehaze();

  return (
    <>
      <div className="create-plan-container">
        <CreatePlanForm setRedir={setRedir} isMobile={true} />
      </div>
    </>
  );
};

export default MobileCreatePlan;
