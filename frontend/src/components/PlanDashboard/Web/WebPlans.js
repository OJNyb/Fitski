import React from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { Link } from "react-router-dom";

import AddPlanIcon from "./AddPlanIcon";
import WorkoutPlans from "../../shared/PlanCard/WebWorkoutPlans";
import PlanCard from "../../shared/PlanCard/MobilePlanCard";

import "./plansWeb.css";

import {
  MainTile,
  MainContainer,
  SecondTile,
  MainTileHeader,
  MainTileNav
} from "../../shared/Layout";

const Plans = ({ woPlans, dispatch, isPending }) => {
  useSetLoading(false);

  return (
    <MainContainer>
      <MainTile maxWidth={700}>
        <MainTileNav>
          <MainTileHeader
            text={"Plans"}
            customIcon={
              <Link
                className="main-tile-header-icon-container z-mid"
                to="/create-plan"
              >
                <AddPlanIcon />
              </Link>
            }
          />
        </MainTileNav>
        {/* <PlansNav isMobile={false} dispatch={dispatch} /> */}
        <WorkoutPlans woPlans={woPlans} isPending={isPending} />
      </MainTile>
      <SecondTile>
        {/* <div>
          <ul>
            <li>Suggested Plans</li>
            <li>Suggested Users</li>
            <li>Templates</li>
            <li>Become a merchant</li>
          </ul>
        </div> */}
        {/* <div className="second-tile-card-container shadow-small">
          <div className="second-tile-card-header black">Trending Plans</div>
          <div className="second-tile-card-body">
            {!!woPlans.length &&
              woPlans.map(x => <PlanCard key={x._id} plan={x} />)}
          </div>
        </div> */}
      </SecondTile>
    </MainContainer>
  );
};

export default Plans;
