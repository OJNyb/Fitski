import React, { useRef, useState, useEffect, useCallback } from "react";
import { getDisplayUnits } from "../../../utils/cardUtils";

const WebExerciseColumn = ({
  set,
  unit,
  index,
  exerId,
  onDeleteSet,
  handleEditSet,
  onAddSetRetry,
  onEditSetRetry
}) => {
  const { reps, _id: setId, request, isPending, isRejected } = set;
  const [inputReps, setInputReps] = useState(reps || 0);
  const repsRef = useRef();
  const lastRepsReqRef = useRef(reps);
  const isDeleted = useRef(false);
  const isClosed = useRef(false);

  const onEditSet = useCallback(() => {
    let reps;

    const { current: currentReps } = repsRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (currentReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }

      if (reps !== currentReps && currentReps !== "") {
        reps = currentReps;
      }
      if (currentReps === "") {
        reps = 0;
      }
      lastRepsReqRef.current = currentReps;
      handleEditSet(exerId, setId, reps);
    }
  }, [setId, exerId, handleEditSet]);

  function onInputBlur() {
    onEditSet();
  }

  function onChange(e) {
    const { target } = e;
    let { value } = target;

    setInputReps(value);
    repsRef.current = value;
    setTimeout(() => {
      const { current } = repsRef;
      if (current === value && !isClosed.current) {
        onEditSet();
      }
    }, 5000);
  }

  useEffect(() => {
    return () => {
      if (!isDeleted.current) onEditSet();
      isClosed.current = true;
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
        "add-card-column flex-ai-center padding-0-20" +
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

      <span className="font-14 color-gray edit-week-card-rep-index">
        {index + 1}
      </span>

      <ExerciseForm
        unit={unit}
        onChange={onChange}
        inputReps={inputReps}
        onInputBlur={onInputBlur}
        setId={setId}
        index={index}
      />
    </div>
  );
};

const ExerciseForm = ({ unit, setId, onChange, inputReps, onInputBlur }) => {
  const inputEl = useRef(null);

  const { lastRowUnit } = getDisplayUnits(unit);

  return (
    <div className="edit-week-web-reps-wrapper flex-ai-center">
      <form
        onSubmit={e => {
          e.preventDefault();
          inputEl.current.blur();
        }}
        className="edit-week-mobile-reps-form"
      >
        <label
          htmlFor={`reps-${setId}`}
          className="flex-ai-center font-12 font-w-300 color-gray"
        >
          <input
            name="reps"
            id={`reps-${setId}`}
            type="number"
            ref={inputEl}
            value={inputReps}
            onChange={onChange}
            onBlur={onInputBlur}
            onFocus={e => e.target.select()}
            className="black font-14 mr-1 web-card-input"
          />
          {lastRowUnit}
        </label>
      </form>
    </div>
  );
};

export default WebExerciseColumn;
