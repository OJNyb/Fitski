import React, { useState, useContext } from "react";
import useSetLoading from "../../hooks/useSetLoading";
import { PlanContext } from "../../context/planContext";
import useNavRedBack from "../../hooks/useNavRedBack";
import useTitle from "../../hooks/useTitle";
import MobileNavMidContainer from "../shared/NavMid/MobileNavMidContainer";
import { Link } from "react-router-dom";

const Overview = () => {
  const {
    state: { woPlan }
  } = useContext(PlanContext);
  const {
    _id: planId,
    name,
    user,
    description,
    goals,
    weeks,
    difficulty
  } = woPlan;
  useNavRedBack(`/plans/${planId}`);
  useTitle(`${name}`);
  useSetLoading(false);
  const [edit, setEdit] = useState(false);
  const { avatar, username } = user;
  const goalsDisplay = goals.join(", ");

  return (
    <>
      <MobileNavMidContainer
        children={
          <>
            <h2 className="margin-0 nav-h2 font-18 color-white">Overview</h2>
            <Link
              to={`/plans/${planId}/edit`}
              className="white-material-btn padding-5"
            >
              <i className="material-icons-outlined">edit</i>
            </Link>
          </>
        }
      />
      <div className="padding-10">
        <div>
          <Label label={"Name"} />
          <Content content={name} />
        </div>
        <div>
          <Label label={"Author"} />
          <Content content={username} />
        </div>
        <div>
          <Label label={"Goals"} />
          <Content content={goalsDisplay} />
        </div>
        <div>
          <Label label={"Difficulty"} />
          <Content content={difficulty} />
        </div>
        <div>
          <Label label={"Length"} />
          <Content
            content={`${weeks.length} ${weeks.length === 1 ? "week" : "weeks"}`}
          />
        </div>
        <div>
          <Label label={"Description"} />
          <Content content={description} />
        </div>
      </div>
    </>
  );
};

const Label = ({ label }) => {
  return <span className="black font-18">{label}: </span>;
};
const Content = ({ content }) => {
  return <span className="color-gray font-w-300 font-18">{content}</span>;
};

export default Overview;
