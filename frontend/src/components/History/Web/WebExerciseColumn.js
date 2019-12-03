import React, { useRef, useState, useEffect, useCallback } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";

const WebExerciseColumn = ({
  reps,
  setId,
  exerId,
  weight,
  onDeleteSet,
  handleEditSet
}) => {
  const [inputReps, setInputReps] = useState(reps || 0);
  const [inputWeight, setInputWeight] = useState(ensureDecimal(weight) || 0);
  const isDeleted = useRef(false);

  const repsRef = useRef();
  const weightRef = useRef();
  const lastSetsReqRef = useRef();
  const lastRepsReqRef = useRef();
  const lastWeightReqRef = useRef();

  const onEditSet = useCallback(() => {
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
  }, [reps, weight, setId, exerId, inputReps, handleEditSet]);

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

  useEffect(() => {
    return () => {
      if (!isDeleted.current) onEditSet();
    };
  }, [onEditSet]);

  return (
    <>
      <button
        className="add-card-remove-btn theme-btn-no-border flex-center"
        onClick={() => {
          isDeleted.current = true;
          onDeleteSet(exerId, setId);
        }}
        tabIndex="-1"
      >
        <i className="material-icons">remove</i>
      </button>
      <ExerciseForm
        onChange={onChange}
        inputReps={inputReps}
        inputWeight={inputWeight}
        onInputBlur={onInputBlur}
        setId={setId}
      />
    </>
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
    <form className="flex-ai-center width-100p">
      <div className="history-row">
        <label
          htmlFor={`weight-${setId}`}
          className="padding-5 font-12 color-gray font-w-300"
        >
          <input
            name="weight"
            id={`weight-${setId}`}
            type="number"
            value={inputWeight}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
            className="black font-14 mr-1 web-card-input"
          />
          kg
        </label>
      </div>

      <div className="history-row">
        <label
          htmlFor={`reps-${setId}`}
          className="padding-5 font-12 color-gray font-w-300"
        >
          <input
            name="reps"
            id={`reps-${setId}`}
            type="number"
            value={inputReps}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
            className="black font-14 mr-1 web-card-input"
          />
          reps
        </label>
      </div>
    </form>
  );
};

export default WebExerciseColumn;
