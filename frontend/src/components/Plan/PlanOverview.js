import React, { useState, useContext } from "react";
import useSetLoading from "../../hooks/useSetLoading";
import { PlanContext } from "../../context/planContext";
import useNavRedBack from "../../hooks/useNavRedBack";
import useTitle from "../../hooks/useTitle";
import MobileNavMidContainer from "../shared/NavMid/MobileNavMidContainer";
import PlanEdit from "./PlanEdit";

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
  function onEditClick() {
    setEdit(true);
  }

  let navBtn;
  let view;

  if (edit) {
    navBtn = (
      <button className="white-material-btn padding-5" onClick={onEditClick}>
        <i className="material-icons-outlined">edit</i>
      </button>
    );
    view = <PlanEdit woPlan={woPlan} setEdit={setEdit} />;
  } else {
    navBtn = (
      <button className="white-material-btn padding-5" onClick={onEditClick}>
        <i className="material-icons-outlined">edit</i>
      </button>
    );
    view = (
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
    );
  }

  return (
    <>
      <MobileNavMidContainer
        children={
          <>
            <h2 className="margin-0 nav-h2 font-18 color-white">Overview</h2>
            {navBtn}
          </>
        }
      />
      {view}
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
