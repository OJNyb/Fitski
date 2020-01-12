import React, { useRef, useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";

import "../../../styles/exerciseCard.css";

const ExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  onCardClick,
  handleEditSet,
  activeExercise,
  handleDeleteSet,
  onDeleteExercise,
  onAddExerciseRetry,
  handleAddSetRetry,
  handleEditSetRetry
}) => {
  const {
    sets,
    request,
    isPending,
    isRejected,
    _id: exerId,
    exercise: { name, _id: exerciseId }
  } = exercise;
  const [activeSet, setActiveSet] = useState(null);

  function handleSetClick(setId) {
    if (activeSet === setId) {
      setActiveSet(null);
    } else {
      setActiveSet(setId);
    }
  }

  function onRetryClick(e) {
    e.stopPropagation();

    if (request === "add") {
      onAddExerciseRetry(exercise);
    } else if (request === "delete") {
      onDeleteExercise(exerId);
    }
  }

  let headDropdown = null;

  let cardView;

  let isActive = exerId === activeExercise;

  if (isActive) {
    cardView = sets.map((x, y) => (
      <EditColumn
        set={x}
        index={y}
        key={x._id}
        dayId={dayId}
        exerId={exerId}
        activeSet={activeSet}
        onSetClick={handleSetClick}
        handleEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
        onAddSetRetry={handleAddSetRetry}
        onEditSetRetry={handleEditSetRetry}
      />
    ));
  } else {
    cardView = sets.map((x, y) => (
      <SetColumn
        set={x}
        index={y}
        key={x._id}
        dayId={dayId}
        exerId={exerId}
        onDeleteSet={handleDeleteSet}
        onAddSetRetry={handleAddSetRetry}
        onEditSetRetry={handleEditSetRetry}
      />
    ));
  }

  return (
    <div
      className={
        "history-add-card margin-10" +
        (isActive ? " edit-week-mobile-add-card-active" : "") +
        (isPending ? " exercise-card-pending" : "") +
        (isRejected ? " exercise-card-rejected" : "")
      }
      onClick={e => {
        e.stopPropagation();
        onCardClick(exerId);
      }}
    >
      <div className="history-exercise-name">
        <span className="black height-20 flex-ai-center">
          <span className="black font-16">{name}</span>
        </span>

        <div className="add-card-btn-container">
          {isRejected && (
            <div className="flex-ai-center exercise-card-rejected-container">
              <span className="color-gray text-center">Request failed</span>
              <button className="padding-5" onClick={onRetryClick}>
                <i className="material-icons">refresh</i>
              </button>
            </div>
          )}
          {isActive && !isRejected && (
            <>
              <button
                className="add-card-remove-btn theme-btn-no-border"
                onClick={e => {
                  e.stopPropagation();
                  onDeleteExercise(exerId);
                }}
              >
                <i className="material-icons ">delete_outline</i>
              </button>

              <button
                className="theme-btn-no-border"
                onClick={e => {
                  e.stopPropagation();
                  onAddSet(exerId, exerciseId);
                }}
              >
                <i className="material-icons ">add</i>
              </button>
            </>
          )}
        </div>
      </div>

      {headDropdown}
      <div className="add-card-body">{cardView}</div>
    </div>
  );
};

const SetColumn = ({
  set,
  index,
  exerId,
  onDeleteSet,
  onAddSetRetry,
  onEditSetRetry
}) => {
  const { reps, request, isPending, isRejected, _id: setId } = set;

  function onRetryClick(e) {
    e.stopPropagation();
    if (request === "add") {
      onAddSetRetry(exerId, set);
    } else if (request === "edit") {
      onEditSetRetry(exerId, set);
    } else if (request === "delete") {
      onDeleteSet(exerId, setId);
    }
  }

  return (
    <div
      className={
        "edit-week-mobile-card-column black" +
        (isPending ? " exercise-card-pending" : "") +
        (isRejected ? " exercise-card-rejected" : "")
      }
    >
      <div className="flex-ai-center edit-week-card-set-button-container">
        {isRejected && (
          <div className="flex-ai-center history-web-column-btn-wrapper">
            <div className="flex-ai-center exercise-card-rejected-container">
              <span className="color-light-gray">Request failed</span>
              <button className="padding-5 tc" onClick={onRetryClick}>
                <i className="material-icons">refresh</i>
              </button>
            </div>
          </div>
        )}
      </div>
      <span className="font-15 black edit-week-card-rep-index">
        {index + 1}
      </span>
      <div className="edit-week-mobile-reps-wrapper flex-ai-center">
        <span className="font-15 black mr-1 noselect">{reps || 0}</span>
        <span className="font-12 color-gray font-w-300 noselect">reps</span>
      </div>
    </div>
  );
};

const EditColumn = ({
  set,
  index,
  exerId,
  onDeleteSet,
  handleEditSet,
  onAddSetRetry,
  onEditSetRetry
}) => {
  const { reps, _id: setId, request, isPending, isRejected } = set;
  const [inputReps, setInputReps] = useState(reps || 0);
  const isDeleted = useRef(false);
  const isClosed = useRef(false);
  const repsRef = useRef();
  const lastRepsReqRef = useRef(reps);

  const onExerciseEdit = useCallback(() => {
    const { current: currentReps } = repsRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      handleEditSet(exerId, setId, currentReps);
      lastRepsReqRef.current = currentReps;
    }
  }, [setId, exerId, repsRef, handleEditSet]);

  useEffect(() => {
    return () => {
      if (!isDeleted.current) onExerciseEdit();
      isClosed.current = true;
    };
  }, [onExerciseEdit]);

  function onRepsChange(e) {
    const { target } = e;
    const { value, validity } = target;

    if (validity.valid) {
      handleRepsChange(value);
    }
  }

  function onRetryClick(e) {
    e.stopPropagation();
    if (request === "add") {
      onAddSetRetry(exerId, set);
    } else if (request === "edit") {
      onEditSetRetry(exerId, set);
    } else if (request === "delete") {
      onDeleteSet(exerId, setId);
    }
  }

  function handleRepsChange(value) {
    setInputReps(value);
    repsRef.current = value;
    setTimeout(() => {
      const { current } = repsRef;
      if (current === value && !isClosed.current) {
        onExerciseEdit();
      }
    }, 5000);
  }

  function onInputBlur() {
    onExerciseEdit();
  }

  return (
    <div
      className={
        "edit-week-mobile-card-column edit-week-mobile-edit-card-col" +
        (isPending ? " exercise-card-pending" : "") +
        (isRejected ? " exercise-card-rejected" : "")
      }
    >
      <div className="flex-ai-center edit-week-card-set-button-container">
        {isRejected ? (
          <div className="flex-ai-center exercise-card-rejected-container">
            <span className="color-light-gray">Request failed</span>
            <button className="padding-5 tc" onClick={onRetryClick}>
              <i className="material-icons">refresh</i>
            </button>
          </div>
        ) : (
          <button
            className="edit-week-mobile-set-delete-btn"
            onClick={e => {
              e.stopPropagation();
              isDeleted.current = true;
              onDeleteSet(exerId, setId);
            }}
          >
            <i className="material-icons">remove</i>
          </button>
        )}
      </div>

      <span className="font-w-500 color-gray edit-week-card-rep-index noselect">
        {index + 1}
      </span>

      <div className="flex-center edit-week-mobile-reps-wrapper">
        <div className="flex-center" onClick={e => e.stopPropagation()}>
          <button
            className="edit-week-mobile-reps-btn"
            onClick={() => handleRepsChange(Number(inputReps) - 1)}
            onBlur={onInputBlur}
          >
            <i className="material-icons">remove</i>
          </button>
          <div className="edit-week-mobile-reps-input-wrapper">
            <input
              type="tel"
              value={inputReps}
              onChange={onRepsChange}
              pattern="^[0-9]\d*\.?\d*$"
              onBlur={onInputBlur}
              onFocus={e => e.target.select()}
              className="color-gray"
            />
            <div className="border-with-sides" />
          </div>
          <button
            className="edit-week-mobile-reps-btn"
            onClick={() => handleRepsChange(Number(inputReps) + 1)}
            onBlur={onInputBlur}
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ExerciseCard);
