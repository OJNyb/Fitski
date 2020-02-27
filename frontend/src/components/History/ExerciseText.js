import React from "react";
import { getDisplayUnits } from "../../utils/cardUtils";
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

  const { firstRowUnit, lastRowUnit } = getDisplayUnits(unit, defaultUnit);

  return (
    <div className="history-exercise-text-row">
      <div className="history-mobile-exercise-list-label-wrapper">
        {firstRowUnit && (
          <>
            <span className="color-gray mr-1 font-14 font-w-500">
              {ensureDecimal(weight)}
            </span>
            <span className="black font-12 font-w-300">{firstRowUnit}</span>
          </>
        )}
      </div>
      <div className="history-mobile-exercise-list-label-wrapper">
        <span className="color-gray mr-1 font-14 font-w-500">{reps}</span>
        <span className="black font-12 font-w-300">{lastRowUnit}</span>
      </div>
    </div>
  );
};

export { ExerciseText, Row };
