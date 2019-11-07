import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ensureDecimal } from "../../utils/ensureDecimal";

import TrashBin from "../shared/SVGs/TrashBin";
import "../../styles/exerciseCard.css";

const DayExercise = ({
  dayId,
  exercise,
  isMobile,
  onAddSet,
  handleEditSet,
  handleDeleteSet,
  setShowExercise,
  onDeleteExercise
}) => {
  const {
    exercise: { name, _id: exerciseId },
    sets,
    _id: exerId
  } = exercise;

  let headDropdown = null;

  let setDisplay = sets.map(set => (
    <SetColumn
      set={set}
      key={set._id}
      dayId={dayId}
      exerId={exerId}
      isMobile={isMobile}
      handleEditSet={handleEditSet}
      onDeleteSet={handleDeleteSet}
    />
  ));

  return (
    <div
      className="history-add-card"
      onClick={isMobile ? () => setShowExercise(exerId) : () => 0}
    >
      <div className="history-exercise-name">
        <span className="black">{name}</span>

        <div className="add-card-btn-container">
          <button
            className="theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onAddSet(exerId, exerciseId);
            }}
          >
            <i className="material-icons ">add</i>
          </button>
          <button
            className="add-card-remove-btn theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onDeleteExercise(exerId);
            }}
          >
            <i className="material-icons ">delete_outline</i>
          </button>
        </div>
      </div>

      {headDropdown}
      <div className="add-card-body">{setDisplay}</div>
    </div>
  );
};

const SetColumn = ({ set, exerId, isMobile, onDeleteSet, handleEditSet }) => {
  const { reps, weight, _id: setId } = set;
  const [inputReps, setInputReps] = useState(reps || "");
  const [inputWeight, setInputWeight] = useState(ensureDecimal(weight) || "");
  const repsRef = useRef();
  const weightRef = useRef();
  const lastSetsReqRef = useRef();
  const lastRepsReqRef = useRef();
  const lastWeightReqRef = useRef();

  useEffect(() => {
    return () => {
      onEditSet();
    };
  }, []);

  function onInputBlur() {
    onEditSet();
  }

  function onChange(e) {
    const { target } = e;
    let { name, value } = target;

    if (name === "reps") {
      setInputReps(value);
      repsRef.current = value;
      setTimeout(() => {
        const { current } = repsRef;
        if (current === value) {
          onEditSet();
        }
      }, 5000);
    } else if (name === "weight") {
      console.log(value);
      setInputWeight(value);
      weightRef.current = value;
      setTimeout(() => {
        const { current } = weightRef;
        if (current === value) {
          onEditSet();
        }
      }, 5000);
    }
  }

  function onEditSet() {
    let values = {};

    const { current: currentReps } = repsRef;
    const { current: currentWeight } = weightRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (inputReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }

      if (reps !== currentReps && currentReps !== "") {
        values.reps = currentReps;
      }
      if (currentReps === "") {
        values.reps = 0;
      }
    }

    if (currentWeight && currentWeight !== lastWeightReqRef.current) {
      if (weight !== currentWeight && currentWeight !== "") {
        values.weight = currentWeight;
      }
      if (currentWeight === "") {
        values.weight = 0;
      }
    }

    if (!Object.keys(values).length) return;
    const { sets: vSets, reps: vReps } = values;

    if (vSets) {
      lastSetsReqRef.current = vSets;
    }

    if (vReps) {
      lastRepsReqRef.current = vReps;
    }

    handleEditSet(values, exerId, setId);
  }

  return (
    <div className="add-card-column">
      {(isMobile && (
        <div className="history-set-row">
          <div className="history-row">
            {ensureDecimal(inputWeight) || 0.0}
            <span>kg</span>
          </div>
          <div className="history-row">
            {inputReps || 0}
            <span>reps</span>
          </div>
        </div>
      )) || (
        <>
          <ExerciseForm
            onChange={onChange}
            inputReps={inputReps}
            inputWeight={inputWeight}
            onInputBlur={onInputBlur}
            setId={setId}
          />
          <button
            className="add-card-remove-btn theme-btn-no-border"
            onClick={() => onDeleteSet(exerId, setId)}
            tabIndex="-1"
          >
            <TrashBin />
          </button>
        </>
      )}
    </div>
  );
};

const ExerciseForm = ({
  setId,
  onChange,
  inputWeight,
  inputReps,
  onInputBlur
}) => {
  return (
    <form className="history-set-row">
      <div className="history-col">
        <label for={`reps-${setId}`} className="padding-5">
          <input
            name="reps"
            id={`reps-${setId}`}
            type="number"
            value={inputReps}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
          />
          reps
        </label>
      </div>

      <div className="history-col">
        <label for={`weight-${setId}`} className="padding-5">
          <input
            name="weight"
            id={`weight-${setId}`}
            type="number"
            value={inputWeight}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
          />
          kg
        </label>
      </div>
    </form>
  );
};

export default withRouter(DayExercise);
