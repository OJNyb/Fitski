import React, { useState, useLayoutEffect } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import useLongPressAndClick from "../../../hooks/useLongPressAndClick";

import { Draggable } from "react-beautiful-dnd";
import DragIcon from "../../shared/SVGs/DragIcon";

import "../../../styles/exerciseCard.css";
import "../editDay.css";

const MobileExerciseCard = ({
  index,
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
    exercise: { name, unit }
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
    <SetColumn set={set} key={set._id} defaultUnit={defaultUnit} unit={unit} />
  ));

  return (
    <Draggable
      draggableId={exerId}
      index={index}
      isDragDisabled={!selectedExercises.length}
    >
      {(provided, snapshot) => (
        <div
          className="pt-10"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={
              "history-add-card pointer" +
              (isActive ? " history-add-card-active" : "") +
              (isPending || dayPending ? " exercise-card-pending" : "") +
              (isRejected || dayRejected ? " exercise-card-rejected" : "") +
              (snapshot.isDragging ? " exercise-card-dragging" : "")
            }
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}
          >
            <div className="history-exercise-name noselect">
              <span className="black font-16">{name}</span>
              {!!selectedExercises.length && (!isRejected || !dayRejected) && (
                <div
                  className="exercise-drag-handle padding-5"
                  {...provided.dragHandleProps}
                  onTouchStart={e => e.stopPropagation()}
                >
                  <DragIcon fill={"#a60000"} />
                </div>
              )}
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
        </div>
      )}
    </Draggable>
  );
};

const SetColumn = ({ set, defaultUnit, unit }) => {
  const { reps, weight } = set;

  let lastRowUnit;
  if (unit === "s") {
    lastRowUnit = "seconds";
  } else {
    lastRowUnit = "reps";
  }

  return (
    <div className="add-card-column flex-ai-center padding-4-20">
      <div className="history-row">
        <span>
          {unit === "r+w" && (
            <>
              <span className="black mr-1 noselect">
                {ensureDecimal(weight) || 0.0}
              </span>
              <span className="color-gray font-12 font-w-300 noselect">
                {defaultUnit}
              </span>
            </>
          )}
        </span>
      </div>
      <div className="history-row">
        <span>
          <span className="black mr-1 noselect">{reps || 0}</span>
          <span className="color-gray font-12 font-w-300 noselect">
            {lastRowUnit}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MobileExerciseCard;
