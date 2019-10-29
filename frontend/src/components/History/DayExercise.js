import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { ensureDecimal } from "../../utils/ensureDecimal";

import TrashBin from "../shared/SVGs/TrashBin";

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
    exercise: { name },
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
      setShowExercise={setShowExercise}
    />
  ));

  return (
    <div className="history-add-card">
      <div className="history-exercise-name">
        <span className="">{name}</span>

        <div className="add-card-btn-container">
          <button
            className="theme-btn-no-border"
            onClick={() => onAddSet(exerId)}
          >
            <i className="material-icons ">add</i>
          </button>
          <button
            className="add-card-remove-btn theme-btn-no-border"
            onClick={() => onDeleteExercise(exerId)}
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

const SetColumn = ({
  set,
  exerId,
  isMobile,
  onDeleteSet,
  handleEditSet,
  setShowExercise
}) => {
  const { reps, weight, _id: setId } = set;
  const [inputReps, setInputReps] = useState(reps || "");
  const [inputWeight, setInputWeight] = useState(weight || "");
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
      {!isMobile && (
        <button
          className="add-card-remove-btn theme-btn-no-border"
          onClick={() => onDeleteSet(exerId, setId)}
          tabIndex="-1"
        >
          <TrashBin />
        </button>
      )}
      {(isMobile && (
        <div
          className="history-set-row"
          onClick={() => setShowExercise(exerId)}
        >
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
        <ExerciseForm
          onChange={onChange}
          inputReps={inputReps}
          inputWeight={inputWeight}
          onInputBlur={onInputBlur}
        />
      )}
    </div>
  );
};

const ExerciseForm = ({ onChange, inputWeight, inputReps, onInputBlur }) => {
  return (
    <form className="history-set-row">
      <div className="history-col">
        <input
          name="weight"
          type="number"
          value={ensureDecimal(inputWeight)}
          onChange={onChange}
          onBlur={onInputBlur}
        />
        <span>kg</span>
      </div>

      <div className="history-col">
        <input
          name="reps"
          type="number"
          value={inputReps}
          onChange={onChange}
          onBlur={onInputBlur}
        />
        <span>reps</span>
      </div>
    </form>
  );
};

export default withRouter(DayExercise);
