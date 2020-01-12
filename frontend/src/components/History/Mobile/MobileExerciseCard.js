import React, { useState, useLayoutEffect } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import useLongPressAndClick from "../../../hooks/useLongPressAndClick";

import "../../../styles/exerciseCard.css";
import "../editDay.css";

const MobileExerciseCard = ({
  exercise,
  onCardHold,
  dayPending,
  dayRequest,
  dayRejected,
  onCardClick,
  defaultUnit,
  selectedExercises,
  onDeleteExercises,
  onAddExerciseRetry
}) => {
  const [isActive, setIsActive] = useState(false);
  const {
    sets,
    isPending,
    isRejected,
    request,
    _id: exerId,
    exercise: { name }
  } = exercise;
  const { onTouchEnd, onTouchStart, onTouchMove } = useLongPressAndClick(
    () => onCardHold(exerId),
    () => onCardClick(exerId)
  );

  function onRetryClick(e) {
    e.stopPropagation();

    if (request === "add" || dayRequest === "add") {
      onAddExerciseRetry(exercise);
    } else if (request === "delete" || dayRequest === "delete") {
      onDeleteExercises([exerId]);
    }
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

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

  let setDisplay = sets.map(set => (
    <SetColumn set={set} key={set._id} defaultUnit={defaultUnit} />
  ));

  return (
    <div
      className={
        "history-add-card margin-10 pointer" +
        (isActive ? " history-add-card-active" : "") +
        (isPending || dayPending ? " exercise-card-pending" : "") +
        (isRejected || dayRejected ? " exercise-card-rejected" : "")
      }
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      <div className="history-exercise-name noselect">
        <span className="black font-16">{name}</span>
        {(isRejected || dayRejected) && (
          <div className="flex-ai-center exercise-card-rejected-container">
            <span className="color-gray text-center">Request failed</span>
            <button
              className="padding-5"
              onClick={onRetryClick}
              onTouchEnd={stopPropagation}
              onTouchStart={stopPropagation}
            >
              <i className="material-icons">refresh</i>
            </button>
          </div>
        )}
      </div>

      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

const SetColumn = ({ set, defaultUnit }) => {
  const { reps, weight } = set;

  return (
    <div className="add-card-column flex-ai-center padding-4-20">
      <div className="history-row">
        <span>
          <span className="black mr-1 noselect">
            {ensureDecimal(weight) || 0.0}
          </span>
          <span className="color-gray font-12 font-w-300 noselect">
            {defaultUnit}
          </span>
        </span>
      </div>
      <div className="history-row">
        <span>
          <span className="black mr-1 noselect">{reps || 0}</span>
          <span className="color-gray font-12 font-w-300 noselect">reps</span>
        </span>
      </div>
    </div>
  );
};

export default MobileExerciseCard;
