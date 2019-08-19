import React from "react";
import { Link } from "react-router-dom";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import "./planText.css";

const PlanText = ({ week, index, planId }) => {
  const { days, _id: weekId } = week;

  const daysDisplay = days.map((day, index) => (
    <Day day={day} index={index} key={day._id} />
  ));

  return (
    <div className="plan-week-container">
      <h1>Week {index + 1}</h1>
      <Link to={`/plans/${planId}/${weekId}`}>Edit</Link>
      <div className="plan-days-container">{daysDisplay}</div>
    </div>
  );
};

const Day = ({ day, index }) => {
  const { exercises } = day;

  const muscleGroup = displayMuscleGroups(exercises);

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
  let {
    exercise: { name },
    sets,
    reps
  } = exercise;

  return (
    <div className="plan-exercise-container">
      {name}

      <span>
        {sets || 0} x {reps || 0}
      </span>
    </div>
  );
};
export default PlanText;
