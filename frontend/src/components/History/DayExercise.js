import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const DayExercise = ({
  dayId,
  exercise,
  showWeight,
  onAddSet,
  handleEditSet,
  onDeleteExercise
}) => {
  const {
    exercise: { name },
    sets,
    reps,
    weight,
    _id: exerId
  } = exercise;

  let headDropdown = null;

  let setDisplay = sets.map(set => (
    <SetColumn
      set={set}
      dayId={dayId}
      exerId={exerId}
      handleEditSet={handleEditSet}
      showWeight={showWeight}
      key={set._id}
    />
  ));

  return (
    <div className="history-add-column">
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
            onClick={() => console.log("")}
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

const SetColumn = ({ set, dayId, exerId, showWeight, handleEditSet }) => {
  const { _id, reps, weight } = set;
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

    handleEditSet(values, dayId, exerId, _id);
  }

  return (
    <div className="add-card-column">
      <button
        className="add-card-remove-btn theme-btn-no-border"
        onClick={() => console.log("")}
      >
        <i className="material-icons ">delete_outline</i>
      </button>
      <form className="history-set-row">
        {showWeight && (
          <div className="history-row">
            <input
              name="weight"
              type="number"
              value={inputWeight}
              onChange={onChange}
              onBlur={onInputBlur}
            />
            <span>kg</span>
          </div>
        )}

        <div className="history-row">
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
    </div>
  );
};

export default withRouter(DayExercise);
