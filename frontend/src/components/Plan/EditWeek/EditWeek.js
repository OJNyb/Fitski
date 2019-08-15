import React, { useState, useContext } from "react";
import { PlanContext } from "../../../context/planContext";

import Day from "./Day";
import Exercises from "./Exercises";
import EditWeekNav from "./EditWeekNav";
import "./editWeek.css";

const EditWeek = ({
  match: {
    params: { week_id: weekId }
  }
}) => {
  const {
    state: { woPlan }
  } = useContext(PlanContext);
  const [currentDayIndex, setCurrentDay] = useState(0);

  const { weeks } = woPlan;

  let weekIndex = weeks.map(x => x._id).indexOf(weekId);

  if (weekIndex === -1) {
    return <p>No week with this ID</p>;
  }

  let currentWeek = weeks[weekIndex];
  const { days } = currentWeek;
  const currentDay = days[currentDayIndex];

  const { _id: dayId } = currentDay;

  console.log(currentDay);

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
        <Exercises dayId={dayId} key={currentDay._id} />
      </div>
    </>
  );
};

export default EditWeek;
