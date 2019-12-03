import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import useNavRedDehaze from "../../hooks/useNavRedDehaze";

import CreatePlanForm from "./CreatePlanForm";

import "./createPlan.css";

const MobileCreatePlan = ({ setRedir }) => {
  useSetLoading(false);
  useNavRedDehaze();

  return (
    <>
      <div className="create-plan-container">
        <CreatePlanForm setRedir={setRedir} isMobile={true} />
      </div>
    </>
  );
};

export default MobileCreatePlan;
