import React from "react";
import { Link } from "react-router-dom";
import { displayMuscleGroups } from "../../utils/displayMuscleGroups";

import "./planText.css";

const PlanText = ({ week, index, planId }) => {
  const { days, _id: weekId } = week;

  let exercises = days
    .map(x => x.exercises)
    .reduce((accu, curr) => (accu += curr.length), 0);

  console.log(exercises);

  let daysDisplay;

  if (exercises) {
    daysDisplay = days.map((day, index) => (
      <Day day={day} index={index} key={day._id} />
    ));
  } else {
    daysDisplay = (
      <p className="empty-week-text">
        Mark as <span>rest week</span> or <span>add exercises</span>
      </p>
    );
  }

  return (
    <div className="plan-week-container">
      <Link to={`/plans/${planId}/${weekId}`}>
        <h1 className="theme-btn-hover">Week {index + 1}</h1>
      </Link>
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
      {/* <h3>{muscleGroup}</h3> */}
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
      <span className="plan-exercise-name">{name}</span>

      <span className="plan-exercise-volume">
        {sets || 0} x {reps || 0}
      </span>
    </div>
  );
};

export default PlanText;
