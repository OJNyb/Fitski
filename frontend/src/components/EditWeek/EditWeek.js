import React, { useState, useContext } from "react";
import { PlanContext } from "../../context/planContext";
import { addExercise } from "../../utils/planClient";

import DayHOC from "./DayHOC";
import EditWeekNav from "./EditWeekNav";
import Exercises from "../shared/Exercises/Exercises";

import "./editWeek.css";

const EditWeek = ({ match: { params } }) => {
  const { state, dispatch } = useContext(PlanContext);
  const [currentDayIndex, setCurrentDay] = useState(0);

  const { woPlan } = state;
  const { weeks } = woPlan;
  const { plan_id: planId, week_id: weekId } = params;

  let weekIndex = weeks.map(x => x._id).indexOf(weekId);

  if (weekIndex === -1) {
    return <p>No week with this ID</p>;
  }

  let currentWeek = weeks[weekIndex];
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];
  const { _id: dayId } = currentDay;

  function handleAddExercise(exercise) {
    addExercise(dispatch, planId, weekId, dayId, exercise);
  }

  let dayBtns = days.map((day, index) => (
    <button
      key={day._id}
      onClick={() => setCurrentDay(index)}
      className={currentDayIndex === index ? "edit-week-day-active" : ""}
    >
      {index + 1}
    </button>
  ));

  return (
    <>
      <EditWeekNav weeks={weeks} weekIndex={weekIndex} key={currentWeek._id} />
      <div className="edit-week-container">
        <div className="edit-week-add-container">
          <h2 className="edit-week-header">Days</h2>

          <div className="edit-week-add-days-container">{dayBtns}</div>
          <DayHOC day={currentDay} />
        </div>
        <div className="edit-week-exercise-container">
          <h2 className="edit-week-header">Exercises</h2>
          <Exercises handleAddExercise={handleAddExercise} />;
        </div>
      </div>
    </>
  );
};

export default EditWeek;
