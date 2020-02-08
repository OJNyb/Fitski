import React from "react";
import useSetLoading from "../../hooks/useSetLoading";

import CreatePlanForm from "./CreatePlanForm";
import { MainTile, MainTileNav, MainTileHeader } from "../shared/Layout";

import "./createPlan.css";

const CreatePlan = ({ setRedir }) => {
  useSetLoading(false);

  return (
    <>
      <MainTile>
        <MainTileNav>
          <MainTileHeader text={"Create Plan"} />
        </MainTileNav>
        <div className="create-plan-container">
          <CreatePlanForm setRedir={setRedir} isMobile={false} />
        </div>
      </MainTile>
    </>
  );
};

export default CreatePlan;
