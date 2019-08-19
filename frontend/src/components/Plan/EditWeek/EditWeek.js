import React, { useState, useContext } from "react";
import axios from "axios";
import { PlanContext } from "../../../context/planContext";
import { EDIT_EXERCISE } from "../../../reducers/planTypes";

import Day from "./Day";
import Exercises from "./Exercises";
import EditWeekNav from "./EditWeekNav";

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

  function handleMuscleGroupSubmit(muscleGroup) {
    axios
      .post(`/plan/day/${planId}/${weekId}/${dayId}`, { muscleGroup })
      .then(res => {
        const { data } = res;
        const { message } = data;
        if (message === "success") {
          dispatch({
            type: EDIT_EXERCISE,
            payload: { dayId, weekId, muscleGroup }
          });
        }
      })
      .catch(err => console.error(err.response));
  }

  function handleAddExercise(exercise) {
    axios
      .post(`/plan/exercise/${planId}/${weekId}/${dayId}`, {
        exercise: exercise._id
      })
      .then(res => {
        const { data } = res;
        const { _id } = data;
        if (_id) {
          dispatch({
            type: "ADD_EXERCISE",
            payload: { _id, weekId, dayId, exercise }
          });
        }
      })
      .catch(console.error);
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
          <Day day={currentDay} />
        </div>
        <Exercises key={currentDay._id} onAddExercise={handleAddExercise} />
      </div>
    </>
  );
};

export default EditWeek;
