import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import useSetNav from "../../hooks/useSetNav";

import CreatePlanForm from "./CreatePlanForm";
import { MainTile, MainContainer } from "../shared/Layout";

import "./createPlan.css";

const MobileCreatePlan = ({ setRedir }) => {
  useSetLoading(false);
  useSetNav({
    backLink: "/plans",
    showDehaze: false,
    text: "Create Plan"
  });

  return (
    <>
      <MainContainer>
        <MainTile>
          <div className="create-plan-container pb-50">
            <CreatePlanForm setRedir={setRedir} isMobile={true} />
          </div>
        </MainTile>
      </MainContainer>
    </>
  );
};

export default MobileCreatePlan;
