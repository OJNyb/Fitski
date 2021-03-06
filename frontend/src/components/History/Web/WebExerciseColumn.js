import React, { useRef, useState, useEffect, useCallback } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import { getDisplayUnits } from "../../../utils/cardUtils";

const WebExerciseColumn = ({
  set,
  exerId,
  unit,
  defaultUnit,
  onDeleteSet,
  handleEditSet,
  onAddSetRetry,
  onEditSetRetry
}) => {
  const { rpe, reps, weight, request, isPending, isRejected, _id: setId } = set;
  const [inputRpe, setInputRpe] = useState(rpe || 0);
  const [inputReps, setInputReps] = useState(reps || 0);
  const [inputWeight, setInputWeight] = useState(ensureDecimal(weight) || 0);
  const isDeleted = useRef(false);

  const rpeRef = useRef(rpe);
  const repsRef = useRef(reps);
  const weightRef = useRef(weight);
  const lastRpeReqRef = useRef(rpe);
  const lastRepsReqRef = useRef(reps);
  const lastWeightReqRef = useRef(weight);

  const onEditSet = useCallback(() => {
    let values = {};

    const { current: currentRpe } = rpeRef;
    const { current: currentReps } = repsRef;
    const { current: currentWeight } = weightRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (currentReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }
      values.reps = currentReps;
      lastRepsReqRef.current = currentReps;
    }

    if (currentRpe && currentRpe !== lastRpeReqRef.current) {
      if (currentRpe % 1 !== 0) {
        return alert("Reps must be a whole number");
      }
      values.rpe = currentRpe;
      lastRpeReqRef.current = currentRpe;
    }

    if (currentWeight && currentWeight !== lastWeightReqRef.current) {
      values.weight = currentWeight;
      lastWeightReqRef.current = currentWeight;
    }

    if (!Object.keys(values).length) return;

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
    } else if (name === "rpe") {
      setInputRpe(value);
      rpeRef.current = value;
      setTimeout(() => {
        const { current } = rpeRef;
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
        "add-card-column flex-ai-center padding-0-20 history-web-add-card-column" +
        (isPending ? " exercise-card-pending" : "") +
        (isRejected ? " history-web-set-rejected" : "")
      }
    >
      <div className="flex-ai-center history-web-column-btn-wrapper">
        {isRejected ? (
          <div className="flex-center-space-bw width-100p history-web-set-rejected-container">
            <span className="color-light-gray">Request failed</span>
            <button className="padding-5 tc" onClick={onRetryClick}>
              <i className="material-icons">refresh</i>
            </button>
          </div>
        ) : (
          <button
            className="add-card-set-remove-btn theme-btn-no-border flex-center"
            onClick={() => {
              isDeleted.current = true;
              onDeleteSet(exerId, setId);
            }}
            tabIndex="-1"
          >
            <i className="material-icons">remove</i>
          </button>
        )}
      </div>

      <ExerciseForm
        unit={unit}
        onChange={onChange}
        inputRpe={inputRpe}
        inputReps={inputReps}
        defaultUnit={defaultUnit}
        inputWeight={inputWeight}
        onInputBlur={onInputBlur}
        setId={setId}
      />
    </div>
  );
};

const ExerciseForm = ({
  unit,
  setId,
  onChange,
  inputRpe,
  inputReps,
  inputWeight,
  onInputBlur,
  defaultUnit
}) => {
  const rpeInputEl = useRef(null);
  const repsInputEl = useRef(null);
  const weightInputEl = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    repsInputEl.current.blur();
    weightInputEl.current.blur();
  }

  const { firstRowUnit, lastRowUnit, rpeRow } = getDisplayUnits(
    unit,
    defaultUnit
  );

  return (
    <form
      className="flex-ai-center history-web-column-form"
      onSubmit={onSubmit}
    >
      <div className="history-web-row">
        {firstRowUnit && (
          <label
            htmlFor={`weight-${setId}`}
            className="padding-3 font-12 color-gray font-w-300"
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
            {firstRowUnit}
          </label>
        )}
      </div>

      <div className="history-web-row">
        <label
          htmlFor={`reps-${setId}`}
          className="padding-3 font-12 color-gray font-w-300"
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
          {lastRowUnit}
        </label>
      </div>
      {rpeRow && (
        <div className="history-web-row">
          <label
            htmlFor={`rpe-${setId}`}
            className="padding-3 font-12 color-gray font-w-300"
          >
            <input
              name="rpe"
              id={`rpe-${setId}`}
              type="number"
              ref={rpeInputEl}
              value={inputRpe}
              onChange={onChange}
              onBlur={onInputBlur}
              onFocus={e => e.target.select()}
              className="black font-14 mr-1 web-card-input"
            />
            RPE
          </label>
        </div>
      )}
    </form>
  );
};

export default WebExerciseColumn;
