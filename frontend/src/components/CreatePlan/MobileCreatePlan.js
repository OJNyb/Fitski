import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import useNavDehaze from "../../hooks/useNavDehaze";
import NavMid from "../shared/NavMid/NavMid";

import CreatePlanForm from "./CreatePlanForm";
import { MainTile } from "../shared/Layout";

import "./createPlan.css";

const MobileCreatePlan = ({ setRedir }) => {
  useSetLoading(false);
  useNavDehaze();

  return (
    <>
      <NavMid backText={"Create plan"} />
      <MainTile>
        <div className="create-plan-container pb-50 pt-50">
          <CreatePlanForm setRedir={setRedir} isMobile={true} />
        </div>
      </MainTile>
    </>
  );
};

export default MobileCreatePlan;
