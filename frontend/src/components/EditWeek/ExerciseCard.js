import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import DropDown from "../shared/DropDown/DropDown";
import TrashBin from "../shared/SVGs/TrashBin";

const DayExercise = ({ dayId, exercise, onEditExercise, onDeleteExercise }) => {
  const {
    exercise: { name },
    sets,
    reps,
    _id: exerId
  } = exercise;

  const [showMore, setShowMore] = useState(null);
  const [inputSets, setInputSets] = useState(sets || "");
  const [inputReps, setInputReps] = useState(reps || "");
  const setsRef = useRef();
  const repsRef = useRef();
  const lastSetsReqRef = useRef();
  const lastRepsReqRef = useRef();

  useEffect(() => {
    return () => {
      onExerciseEdit();
    };
  }, []);

  function onChange(e) {
    const { target } = e;
    let { name, value } = target;

    if (name === "sets") {
      setInputSets(value);
      setsRef.current = value;
      setTimeout(() => {
        const { current } = setsRef;
        if (current === value) {
          onExerciseEdit();
        }
      }, 5000);
    } else if (name === "reps") {
      setInputReps(value);
      repsRef.current = value;
      setTimeout(() => {
        const { current } = repsRef;
        if (current === value) {
          onExerciseEdit();
        }
      }, 5000);
    }
  }

  function onExerciseEdit() {
    let values = {};

    const { current: currentSets } = setsRef;
    const { current: currentReps } = repsRef;

    if (currentSets && currentSets !== lastSetsReqRef.current) {
      if (currentSets % 1 !== 0) {
        return alert("Sets must be a whole number");
      }

      if (sets !== currentSets && currentSets !== "") {
        values.sets = currentSets;
      }
      if (currentSets === "") {
        values.sets = 0;
      }
    }

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

    if (!Object.keys(values).length) return;
    const { sets: vSets, reps: vReps } = values;

    if (vSets) {
      lastSetsReqRef.current = vSets;
    }

    if (vReps) {
      lastRepsReqRef.current = vReps;
    }

    onEditExercise(values, dayId, exerId);
  }

  function onInputBlur() {
    onExerciseEdit();
  }

  function onMoreClick() {
    setShowMore(true);
  }

  const children = [
    // {
    //   icon: "edit",
    //   text: "Add note",
    //   action: () => console.log("gay"),
    //   outlined: true,
    //   minified: true
    // },
    {
      iconSvg: <TrashBin />,
      text: "Delete exercise",
      action: () => onDeleteExercise(dayId, exerId),
      customClass: " delete-color"
    }
  ];

  return (
    <div className="edit-week-add-card">
      <div>
        <button className="gray-btn" onClick={onMoreClick}>
          <i className="material-icons">more_vert</i>
        </button>
        {showMore && (
          <DropDown
            children={children}
            hideActionMenu={() => setShowMore(null)}
          />
        )}
      </div>
      <span className="edit-week-exercise-name">{name}</span>
      <form>
        <div>
          <input
            name="sets"
            type="number"
            value={inputSets}
            onChange={onChange}
            onBlur={onInputBlur}
          />
        </div>

        <div>
          <input
            name="reps"
            type="number"
            value={inputReps}
            onChange={onChange}
            onBlur={onInputBlur}
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(DayExercise);
