import React, { useRef, useState, useEffect } from "react";
import TrashBin from "../../shared/SVGs/TrashBin";

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
  const lastRepsReqRef = useRef();
  const isDeleted = useRef(false);
  const isClosed = useRef(false);

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
  }, []);

  function onEditSet() {
    let reps;

    const { current: currentReps } = repsRef;

    if (currentReps && currentReps !== lastRepsReqRef.current) {
      if (inputReps % 1 !== 0) {
        return alert("Reps must be a whole number");
      }

      if (reps !== currentReps && currentReps !== "") {
        reps = currentReps;
      }
      if (currentReps === "") {
        reps = 0;
      }
      handleEditSet(exerId, setId, reps);
    }
  }
  return (
    <div className="add-card-column flex-center-space-bw padding-0-20">
      <button
        className="add-card-remove-btn theme-btn-no-border"
        onClick={() => {
          isDeleted.current = true;
          onDeleteSet(exerId, setId);
        }}
        tabIndex="-1"
      >
        <TrashBin />
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

const ExerciseForm = ({ index, setId, onChange, inputReps, onInputBlur }) => {
  return (
    <div className="">
      <form>
        <label
          htmlFor={`reps-${setId}`}
          className="padding-5 flex-ai-center font-12 font-w-300 color-gray"
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
      </form>
    </div>
  );
};

export default WebExerciseColumn;
