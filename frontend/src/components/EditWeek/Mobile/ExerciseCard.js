import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ensureDecimal } from "../../../utils/ensureDecimal";

import TrashBin from "../../shared/SVGs/TrashBin";

const ExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  onCardClick,
  handleEditSet,
  activeExercise,
  handleDeleteSet,
  onDeleteExercise
}) => {
  const {
    exercise: { name, _id: exerciseId },
    sets,
    _id: exerId
  } = exercise;
  const [activeSet, setActiveSet] = useState(null);

  function handleSetClick(setId) {
    if (activeSet === setId) {
      setActiveSet(null);
    } else {
      setActiveSet(setId);
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
        handleEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
      />
    ));
  }

  return (
    <div
      className={
        "edit-week-mobile-add-card" +
        (isActive ? " edit-week-mobile-add-card-active" : "")
      }
      onClick={e => {
        e.stopPropagation();
        onCardClick(exerId);
      }}
    >
      <div className="history-exercise-name">
        <span className="black">{name}</span>

        <div className="add-card-btn-container">
          {isActive && (
            <button
              className="add-card-remove-btn theme-btn-no-border"
              onClick={e => {
                e.stopPropagation();
                onDeleteExercise(exerId);
              }}
            >
              <i className="material-icons ">delete_outline</i>
            </button>
          )}
          <button
            className="theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onAddSet(exerId, exerciseId);
            }}
          >
            <i className="material-icons ">add</i>
          </button>
        </div>
      </div>

      {headDropdown}
      <div className="edit-week-mobile-card-body">{cardView}</div>
    </div>
  );
};

const SetColumn = ({ set, index }) => {
  const { reps, _id: setId } = set;

  return (
    <div className="edit-week-mobile-card-column">
      <div>
        <span className="edit-week-card-rep-index">{reps || 0}</span>
        <span className="edit-week-card-rep-label">reps</span>
      </div>
      <span className="edit-week-card-rep-index">{index + 1}</span>
    </div>
  );
};

const EditColumn = ({ set, index, exerId, onDeleteSet, handleEditSet }) => {
  const { reps, _id: setId } = set;
  const [inputReps, setInputReps] = useState(reps || 0);
  const repsRef = useRef();
  const lastRepsReqRef = useRef();

  useEffect(() => {
    return () => {
      onExerciseEdit();
    };
  }, []);

  function onRepsChange(e) {
    const { target } = e;
    const { value, validity } = target;

    if (validity.valid) {
      handleRepsChange(value);
    }
  }

  function handleRepsChange(value) {
    setInputReps(value);
    repsRef.current = value;
    setTimeout(() => {
      const { current } = repsRef;
      if (current === value) {
        onExerciseEdit();
      }
    }, 5000);
  }

  function onExerciseEdit() {
    const { current: currentReps } = repsRef;
    if (currentReps && currentReps !== lastRepsReqRef.current) {
      handleEditSet(exerId, setId, currentReps);
    }
  }

  function onInputBlur() {
    onExerciseEdit();
  }

  return (
    <div className="edit-week-mobile-card-column edit-week-mobile-edit-card-col">
      <button
        className="edit-week-mobile-set-delete-btn"
        onClick={e => {
          e.stopPropagation();
          onDeleteSet(exerId, setId);
        }}
      >
        <i className="material-icons">remove</i>
      </button>

      <div className="flex-center">
        <div className="flex-center" onClick={e => e.stopPropagation()}>
          <button
            className="edit-week-mobile-reps-btn"
            onClick={() => handleRepsChange(inputReps - 1)}
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
            />
            <div className="border-with-sides" />
          </div>
          <button
            className="edit-week-mobile-reps-btn"
            onClick={() => handleRepsChange(inputReps + 1)}
          >
            <i className="material-icons">add</i>
          </button>
        </div>
      </div>
      <span className="edit-week-card-rep-index">{index + 1}</span>
    </div>
  );
};

export default withRouter(ExerciseCard);
