import React from "react";

import { ensureDecimal } from "../../utils/ensureDecimal";
import { useUser } from "../../context/userContext";

const ExerciseText = ({ exercise }) => {
  const user = useUser();
  const { defaultUnit } = user;
  const {
    exercise: { name, unit },
    sets
  } = exercise;

  let setsView = sets.map(x => {
    return <Row key={x._id} set={x} defaultUnit={defaultUnit} unit={unit} />;
  });
  return (
    <div>
      <div className="history-exercise-input-header color-gray font-w-500 font-14">
        {name}
      </div>
      {setsView}
    </div>
  );
};

const Row = ({ set, defaultUnit, unit }) => {
  const { reps, weight } = set;

  let lastRowUnit;
  if (unit === "s") {
    lastRowUnit = "seconds";
  } else {
    lastRowUnit = "reps";
  }

  return (
    <div className="history-exercise-text-row">
      <div className="history-mobile-exercise-list-label-wrapper">
        {unit === "r+w" && (
          <>
            <b className="color-gray mr-1 font-14">{ensureDecimal(weight)}</b>
            <span className="black font-12 font-w-300">{defaultUnit}</span>
          </>
        )}
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <b className="color-gray mr-1 font-14">{reps}</b>
        <span className="black font-12 font-w-300">{lastRowUnit}</span>
      </div>
    </div>
  );
};

export { ExerciseText, Row };
