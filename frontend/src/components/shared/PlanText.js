import React from "react";
import { Link } from "react-router-dom";

import "./planText.css";

const PlanText = ({ week, planId }) => {
  const { week: weekNumber, days, _id: weekId } = week;

  const daysDisplay = days.map((day, index) => (
    <Day day={day} index={index} key={day._id} />
  ));

  return (
    <div className="plan-week-container">
      <h1>Week {weekNumber}</h1>
      <Link to={`/plans/${planId}/${weekId}`}>Edit</Link>
      <div className="plan-days-container">{daysDisplay}</div>
    </div>
  );
};

const Day = ({ day, index }) => {
  const { exercises, muscleGroup } = day;

  if (!exercises.length) return null;
  const exerciseDisplay = exercises.map(exercise => (
    <Exercise exercise={exercise} key={exercise._id} />
  ));
  return (
    <div className="plan-day-container">
      <h2>Day {index + 1}</h2>
      <h3>{muscleGroup}</h3>

      {exerciseDisplay}
    </div>
  );
};

const Exercise = ({ exercise }) => {
  const {
    exercise: { name },
    sets,
    reps
  } = exercise;

  return (
    <div className="plan-exercise-container">
      {name}
      <span>
        {sets} x {reps}
      </span>
    </div>
  );
};
export default PlanText;
