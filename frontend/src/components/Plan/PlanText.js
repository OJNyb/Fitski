import React from "react";
import { Link } from "react-router-dom";

import "./planText.css";

const PlanText = ({ week, index, planId }) => {
  const { days, _id: weekId } = week;

  let exercises = days
    .map(x => x.exercises)
    .reduce((accu, curr) => (accu += curr.length), 0);

  let daysDisplay;

  if (exercises) {
    daysDisplay = days.map((day, index) => (
      <Day day={day} index={index} key={day._id} />
    ));
  } else {
    daysDisplay = <p className="margin-0">Rest Week</p>;
  }

  return (
    <div className="plan-week-container black flex-col-cen">
      <Link to={`/plans/${planId}/${weekId}`}>
        <h1 className="theme-btn-hover black font-w-500">Week {index + 1}</h1>
      </Link>
      <div className="plan-days-container">{daysDisplay}</div>
    </div>
  );
};

const Day = ({ day, index }) => {
  const { exercises } = day;

  if (!exercises.length) return null;
  const exerciseDisplay = exercises.map(exercise => (
    <Exercise exercise={exercise} key={exercise._id} />
  ));
  return (
    <div className="plan-day-container flex-col-cen">
      <h2 className="margin-0 font-w-500">Day {index + 1}</h2>
      <div className="plan-exercises-container">{exerciseDisplay}</div>
    </div>
  );
};

const Exercise = ({ exercise }) => {
  if (!exercise.exercise) return null;
  let {
    exercise: { name },
    sets
  } = exercise;

  const { length } = sets;

  let setText = "set";
  if (length !== 1) {
    setText += "s";
  }
  let reps = sets.map(x => x.reps);

  let displayReps;
  if (Math.max(...reps) === Math.min(...reps)) {
    displayReps = reps[0];
  } else {
    displayReps = reps.reduce((accu, curr) => (accu += `${curr} `), "");
  }
  return (
    <div className="plan-exercise-container flex-center-space-bw">
      <span className="plan-exercise-name">
        {name} - {length || 0} {setText} of {displayReps || 0} reps
      </span>

      {/* <span className="plan-exercise-volume">
        {sets || 0} x {reps || 0}
      </span> */}
    </div>
  );
};

export default PlanText;
