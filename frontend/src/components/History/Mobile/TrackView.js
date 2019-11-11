import React, { useState } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";

const TrackView = ({
  sets,
  exerId,
  exerciseId,
  onAddSet,
  onEditSet,
  onDeleteSet
}) => {
  const [selectedSet, setSelectedSet] = useState({});
  const [weight, setWeight] = useState(
    ensureDecimal(sets[sets.length - 1].weight)
  );
  const [reps, setReps] = useState(sets[sets.length - 1].reps);

  const { _id: setId } = selectedSet;

  function onItemClick(setId) {
    if (setId === selectedSet._id) {
      return setSelectedSet({});
    }
    let set = sets.filter(x => x._id === setId)[0];
    const { reps, weight } = set;

    setReps(reps || 0);
    setWeight(weight || 0);
    setSelectedSet(set);
  }

  function onSaveClick() {
    onAddSet(exerId, exerciseId, { reps, weight });
  }

  function onUpdateClick() {
    onEditSet({ reps, weight }, exerId, setId);
    setSelectedSet({});
  }

  function onClearClick() {
    setReps(0);
    setWeight(0);
  }

  function onDeleteClick() {
    onDeleteSet(exerId, setId);
    setSelectedSet({});
  }

  let setList = sets.map((x, y) => (
    <TrackListItem
      set={x}
      index={y}
      selectedSetId={setId}
      onItemClick={onItemClick}
      onCommentClick={() => console.log("c")}
    />
  ));

  function onWeightChange(e) {
    const { value, validity } = e.target;
    if (validity.valid) setWeight(value);
  }

  function onRepsChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0) setReps(value);
  }
  return (
    <>
      <TrackInput
        label={"WEIGHT (kg)"}
        onDecrement={() => {
          if (weight - 2.5 >= 0) {
            setWeight(ensureDecimal(Number(weight) - 2.5));
          }
        }}
        onIncrement={() => setWeight(ensureDecimal(Number(weight) + 2.5))}
        onChange={onWeightChange}
        value={weight}
      />

      <TrackInput
        label={"REPS"}
        onDecrement={() => {
          if (reps > 0) setReps(Number(reps) - 1);
        }}
        onIncrement={() => setReps(Number(reps) + 1)}
        onChange={onRepsChange}
        value={reps}
      />
      <div className="flex-center margin-top-20">
        <SUButton
          text={setId ? "UPDATE" : "SAVE"}
          onClick={setId ? onUpdateClick : onSaveClick}
        />
        <CDButton
          text={setId ? "DELETE" : "CLEAR"}
          setId={setId}
          onClick={setId ? onDeleteClick : onClearClick}
        />
      </div>
      <div className="history-mobile-exercise-list-container">{setList}</div>
    </>
  );
};

const SUButton = ({ text, onClick }) => {
  const style = { backgroundColor: "rgb(82, 206, 138)" };
  return (
    <button
      onClick={onClick}
      className="history-mobile-exercise-action-button"
      style={style}
    >
      <span>{text}</span>
    </button>
  );
};

const CDButton = ({ text, setId, onClick }) => {
  return (
    <button
      className="history-mobile-exercise-action-button"
      style={{
        backgroundColor: setId ? "#ff3838" : "rgba(92, 119, 240, 0.842)"
      }}
      onClick={onClick}
    >
      <span>{text}</span>
    </button>
  );
};

const TrackInput = ({ label, onDecrement, onIncrement, onChange, value }) => {
  return (
    <div className="history-mobile-exercise-input-wrapper">
      <div className="history-mobile-exercise-input-header font-w-700 font-13 color-gray">
        {label}:
      </div>
      <div className="history-mobile-exercise-input-box">
        <button onClick={onDecrement}>
          <i className="material-icons">remove</i>
        </button>
        <div className="history-mobile-exercise-input-shiizz">
          <input
            onFocus={e => e.target.select()}
            type="tel"
            value={value}
            onChange={onChange}
            type="number"
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides"></div>
        </div>
        <button onClick={onIncrement}>
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

const TrackListItem = ({
  set,
  index,
  onItemClick,
  selectedSetId,
  onCommentClick
}) => {
  const { reps, weight, _id: setId } = set;

  return (
    <div
      className={
        "history-mobile-exercise-list-item" +
        (setId === selectedSetId
          ? " history-mobile-exercise-list-item-active"
          : "")
      }
      onClick={() => onItemClick(setId)}
    >
      <div className="history-mobile-exercise-list-action-index flex-center-space-bw">
        <button onClick={onCommentClick}>
          <i className="material-icons">comment</i>
        </button>
        <b className="font-16">{index + 1}</b>
      </div>
      <div className="history-mobile-exercise-list-kg-reps">
        <div className="history-mobile-exercise-list-label-wrapper">
          <span>
            <b className="mr-1">{ensureDecimal(weight)}</b>
            <span className="font-12 color-gray font-w-400 color-light-gray">
              kg
            </span>
          </span>
        </div>
        <div className="history-mobile-exercise-list-label-wrapper">
          <span>
            <b className="mr-1 font-16 font-w-700">{reps}</b>
            <span className="font-12 font-w-400 color-light-gray">reps</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackView;
