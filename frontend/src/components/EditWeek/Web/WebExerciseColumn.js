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
  const { rpe, reps, _id: setId, request, isPending, isRejected } = set;
  const [inputRpe, setInputRpe] = useState(rpe || 0);
  const [inputReps, setInputReps] = useState(reps || 0);
  const rpeRef = useRef();
  const repsRef = useRef();
  const lastRpeReqRef = useRef(rpe);
  const lastRepsReqRef = useRef(reps);
  const isDeleted = useRef(false);
  const isClosed = useRef(false);

  const onEditSet = useCallback(() => {
    let update = {};

    const { current: currentRpe } = rpeRef;
    const { current: currentReps } = repsRef;

    if (currentRpe && currentRpe !== lastRpeReqRef.current) {
      if (currentRpe % 1 !== 0) {
        return alert("RPE must be a whole number");
      }

      update.rpe = currentRpe;
      lastRpeReqRef.current = currentRpe;

      if (currentRpe === "") {
        update.rpe = 0;
      }
    }

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (currentReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }

      update.reps = currentReps;
      lastRepsReqRef.current = currentReps;

      if (currentReps === "") {
        update.reps = 0;
      }
    }

    if (Object.keys(update).length) {
      handleEditSet(exerId, setId, update);
    }
  }, [setId, exerId, handleEditSet]);

  function onInputBlur() {
    onEditSet();
  }

  function handleRepsChange(e) {
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

  function handleRpeChange(e) {
    const { target } = e;
    let { value } = target;

    setInputRpe(value);
    rpeRef.current = value;
    setTimeout(() => {
      const { current } = rpeRef;
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
  const { rpeRow } = getDisplayUnits(unit);

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

      {!rpeRow && (
        <span className="font-14 color-gray edit-week-card-rep-index">
          {index + 1}
        </span>
      )}

      <ExerciseForm
        unit={unit}
        onRpeChange={handleRpeChange}
        onRepsChange={handleRepsChange}
        inputRpe={inputRpe}
        inputReps={inputReps}
        onInputBlur={onInputBlur}
        setId={setId}
        index={index}
      />
    </div>
  );
};

const ExerciseForm = ({
  unit,
  setId,
  inputRpe,
  inputReps,
  onRpeChange,
  onRepsChange,
  onInputBlur
}) => {
  const inputEl = useRef(null);

  const { lastRowUnit, rpeRow } = getDisplayUnits(unit);

  return (
    <>
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
              onChange={onRepsChange}
              onBlur={onInputBlur}
              onFocus={e => e.target.select()}
              className="black font-14 mr-1 web-card-input"
            />
            {lastRowUnit}
          </label>
        </form>
      </div>
      {rpeRow && (
        <div className="edit-week-web-reps-wrapper flex-ai-center">
          <form
            onSubmit={e => {
              e.preventDefault();
              inputEl.current.blur();
            }}
            className="edit-week-mobile-reps-form"
          >
            <label
              htmlFor={`rpe-${setId}`}
              className="flex-ai-center font-12 font-w-300 color-gray"
            >
              <input
                name="rpe"
                id={`rpe-${setId}`}
                type="number"
                ref={inputEl}
                value={inputRpe}
                onChange={onRpeChange}
                onBlur={onInputBlur}
                onFocus={e => e.target.select()}
                className="black font-14 mr-1 web-card-input"
              />
              RPE
            </label>
          </form>
        </div>
      )}
    </>
  );
};

export default WebExerciseColumn;
