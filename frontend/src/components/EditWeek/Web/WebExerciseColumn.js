import React, { useRef, useState, useEffect, useCallback } from "react";

const WebExerciseColumn = ({
  set,
  index,
  exerId,
  onDeleteSet,
  handleEditSet
}) => {
  const { reps, _id: setId } = set;
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

  return (
    <div className="add-card-column flex-center-space-bw padding-0-20">
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
      <span className="black font-14 font-w-500">{index + 1}</span>
      <ExerciseForm
        onChange={onChange}
        inputReps={inputReps}
        onInputBlur={onInputBlur}
        setId={setId}
        index={index}
      />
    </div>
  );
};

const ExerciseForm = ({ setId, onChange, inputReps, onInputBlur }) => {
  const inputEl = useRef(null);

  return (
    <div className="">
      <form
        onSubmit={e => {
          e.preventDefault();
          inputEl.current.blur();
        }}
      >
        <label
          htmlFor={`reps-${setId}`}
          className="padding-5 flex-ai-center font-12 font-w-300 color-gray"
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
          reps
        </label>
      </form>
    </div>
  );
};

export default WebExerciseColumn;
