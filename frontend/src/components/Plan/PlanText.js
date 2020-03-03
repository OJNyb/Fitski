import React from "react";
import { Link } from "react-router-dom";

import "./planText.css";
import { getDisplayUnits } from "../../utils/cardUtils";
import { useUser } from "../../context/userContext";

const PlanText = ({ week, index, isSelf, planId }) => {
  const { days, _id: weekId } = week;
  const { defaultUnit } = useUser();

  let exercises = days
    .map(x => x.exercises)
    .reduce((accu, curr) => (accu += curr.length), 0);

  let daysDisplay;

  if (exercises) {
    daysDisplay = days.map((day, index) => (
      <Day day={day} index={index} key={day._id} defaultUnit={defaultUnit} />
    ));
  } else {
    daysDisplay = <p className="margin-0">Rest Week</p>;
  }

  let weekHeader;
  if (isSelf) {
    weekHeader = (
      <Link to={`/plans/${planId}/${weekId}`}>
        <h1 className="tc font-fam-babas font-40 plan-text-week-header-link noselect">
          WEEK {index + 1}
        </h1>
      </Link>
    );
  } else {
    weekHeader = (
      <h1 className="tc font-fam-babas font-40">WEEK {index + 1}</h1>
    );
  }

  return (
    <div className="plan-week-container flex-col-cen">
      {weekHeader}
      <div className="plan-days-container">{daysDisplay}</div>
    </div>
  );
};

const Day = ({ day, index, defaultUnit }) => {
  const { exercises } = day;

  if (!exercises.length) return null;
  const exerciseDisplay = exercises.map(exercise => (
    <Exercise
      exercise={exercise}
      key={exercise._id}
      defaultUnit={defaultUnit}
    />
  ));
  return (
    <div className={"plan-day-container flex-col-cen"}>
      <h2 className="margin-0 color-gray font-30 font-fam-babas">
        DAY {index + 1}
      </h2>
      <div className={"plan-exercises-container"}>{exerciseDisplay}</div>
    </div>
  );
};

const Exercise = ({ exercise, defaultUnit }) => {
  if (!exercise.exercise) return null;

  let {
    exercise: { name, unit },
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
    displayReps = reps.reduce((accu, curr, i) => {
      accu += `${curr}`;
      if (i !== reps.length - 1) {
        accu += ", ";
      }
      return accu;
    }, "");
  }

  const { lastRowUnit, rpeRow } = getDisplayUnits(unit, defaultUnit);
  let rpeText = "";

  if (rpeRow) {
    let rpe = sets.map(x => x.rpe);

    if (Math.max(...rpe) === Math.min(...rpe)) {
      rpeText = "@RPE " + rpe[0];
    } else {
      rpeText = rpe.reduce((accu, curr, i) => {
        accu += `${curr}`;
        if (i !== rpe.length - 1) {
          accu += ", ";
        }
        return accu;
      }, "\n@RPE ");
    }
  }

  return (
    <ExerciseRow
      name={name}
      unit={unit}
      length={length}
      setText={setText}
      displayReps={displayReps}
      defaultUnit={defaultUnit}
      lastRowUnit={lastRowUnit}
      rpeText={rpeText}
    />
  );
};

const ExerciseRow = ({
  name,
  length,
  setText,
  displayReps,
  lastRowUnit,
  rpeText
}) => {
  return (
    <div className="plan-exercise-container plan-mobile-exercise-container color-gray flex-center font-fam-oswald">
      <div className="font-15 font-w-400 mr-1 nowrap">
        {name}
        {" - "}
      </div>

      <span className="font-15 font-w-300 ws-pw">
        {length || 0} {setText} of {displayReps || 0} {lastRowUnit} {rpeText}
      </span>
    </div>
  );
};

export default PlanText;
