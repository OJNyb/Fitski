import React, { useState, useLayoutEffect } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import useLongPressAndClick from "../../../hooks/useLongPressAndClick";

import "../../../styles/exerciseCard.css";
import "../editDay.css";

const MobileExerciseCard = ({
  exercise,
  onCardHold,
  onCardClick,
  selectedExercises
}) => {
  const [isActive, setIsActive] = useState(false);
  const {
    exercise: { name },
    sets,
    _id: exerId
  } = exercise;
  const { onTouchEnd, onTouchStart, onTouchMove } = useLongPressAndClick(
    () => onCardHold(exerId),
    () => onCardClick(exerId)
  );

  useLayoutEffect(() => {
    function setActive() {
      if (selectedExercises.indexOf(exerId) > -1) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
    setActive();
  }, [selectedExercises, exerId]);

  let setDisplay = sets.map(set => <SetColumn set={set} key={set._id} />);

  return (
    <div
      className={
        "history-add-card margin-10 pointer" +
        (isActive ? " history-add-card-active" : "")
      }
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      <div className="history-exercise-name">
        <span className="black">{name}</span>
      </div>

      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

const SetColumn = ({ set }) => {
  const { reps, weight } = set;

  return (
    <div className="add-card-column flex-ai-center padding-4-20">
      <div className="history-row">
        <span>
          <span className="black mr-1">{ensureDecimal(weight) || 0.0}</span>
          <span className="color-gray font-12 font-w-300">kg</span>
        </span>
      </div>
      <div className="history-row">
        <span>
          <span className="black mr-1">{reps || 0}</span>
          <span className="color-gray font-12 font-w-300">reps</span>
        </span>
      </div>
    </div>
  );
};

export default MobileExerciseCard;
