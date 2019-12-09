import React, { useRef, useState, useEffect, useCallback } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";

const WebExerciseColumn = ({
  reps,
  setId,
  exerId,
  weight,
  defaultUnit,
  onDeleteSet,
  handleEditSet
}) => {
  const [inputReps, setInputReps] = useState(reps || 0);
  const [inputWeight, setInputWeight] = useState(ensureDecimal(weight) || 0);
  const isDeleted = useRef(false);

  const repsRef = useRef(reps);
  const weightRef = useRef(weight);
  const lastRepsReqRef = useRef(reps);
  const lastWeightReqRef = useRef(weight);

  const onEditSet = useCallback(() => {
    let values = {};

    const { current: currentReps } = repsRef;
    const { current: currentWeight } = weightRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (currentReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }
      values.reps = currentReps;
    }

    if (currentWeight && currentWeight !== lastWeightReqRef.current) {
      values.weight = currentWeight;
    }

    if (!Object.keys(values).length) return;
    const { weight: vWeight, reps: vReps } = values;

    if (vWeight) {
      lastWeightReqRef.current = vWeight;
    }

    if (vReps) {
      lastRepsReqRef.current = vReps;
    }

    console.log(values);

    handleEditSet(values, exerId, setId);
  }, [setId, exerId, handleEditSet]);

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
        defaultUnit={defaultUnit}
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
  inputReps,
  inputWeight,
  onInputBlur,
  defaultUnit
}) => {
  const repsInputEl = useRef(null);
  const weightInputEl = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    repsInputEl.current.blur();
    weightInputEl.current.blur();
  }
  return (
    <form className="flex-ai-center width-100p" onSubmit={onSubmit}>
      <div className="history-row">
        <label
          htmlFor={`weight-${setId}`}
          className="padding-5 font-12 color-gray font-w-300"
        >
          <input
            name="weight"
            id={`weight-${setId}`}
            type="number"
            ref={weightInputEl}
            value={inputWeight}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
            className="black font-14 mr-1 web-card-input"
          />
          {defaultUnit}
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
            ref={repsInputEl}
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
