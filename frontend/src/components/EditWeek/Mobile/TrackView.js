import React, { useState } from "react";

const TrackView = ({ exer, onAddSet, onEditSet, onDeleteSet }) => {
  const {
    sets,
    _id: exerId,
    exercise: { name, _id: exerciseId }
  } = exer;
  console.log(exer);
  const [selectedSet, setSelectedSet] = useState({});
  const [reps, setReps] = useState(sets[sets.length - 1].reps || 0);

  const { _id: setId } = selectedSet;

  function onItemClick(setId) {
    if (setId === selectedSet._id) {
      return setSelectedSet({});
    }
    let set = sets.filter(x => x._id === setId)[0];
    const { reps } = set;

    setReps(reps || 0);
    setSelectedSet(set);
  }

  function onSaveClick() {
    onAddSet(exerId, exerciseId, { reps });
  }

  function onUpdateClick() {
    onEditSet({ reps }, exerId, setId);
    setSelectedSet({});
  }

  function onClearClick() {
    setReps(0);
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

  function onRepsChange(e) {
    const { value, validity } = e.target;
    if (validity.valid && value % 1 === 0) setReps(value);
  }
  return (
    <>
      {/* <TrackInput
        label={"REPS"}
        onDecrement={() => {
          if (reps > 0) setReps(Number(reps) - 1);
        }}
        onIncrement={() => setReps(Number(reps) + 1)}
        onChange={onRepsChange}
        value={reps}
      /> */}
      <div class="add-weeks-modal-mobile-input-wrapper">
        <button>
          <div class="minus-container">
            <div></div>
          </div>
        </button>
        <div class="add-weeks-modal-mobile-input-shiizz">
          <input type="tel" pattern="^[0-9]\d*\.?\d*$" value="1" />
          <div class="border-with-sides"></div>
        </div>
        <button>
          <div class="plus-container">
            <div></div>
            <div></div>
          </div>
        </button>
      </div>
      <div className="history-mobile-exercise-button-container">
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
  return (
    <button onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

const CDButton = ({ text, setId, onClick }) => {
  return (
    <button
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
      <span className="edit-week-mobile-exercise-input-header">{label}</span>
      <div className="history-mobile-exercise-input-box">
        <button onClick={onDecrement}>
          <i className="material-icons">remove</i>
        </button>
        <div className="history-mobile-exercise-input-shiizz">
          <input
            type="tel"
            value={value}
            onChange={onChange}
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

const TrackListItem = ({ set, index, onItemClick, selectedSetId }) => {
  const { reps, _id: setId } = set;

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
      <div className="history-mobile-exercise-list-action-index">
        <span className="history-mobile-exercise-list-bold-span">
          {index + 1}
        </span>
      </div>
      <div className="history-mobile-exercise-list-kg-reps">
        <div className="history-mobile-exercise-list-label-wrapper">
          <span className="history-mobile-exercise-list-bold-span">
            {reps || 0}
          </span>
          <span className="history-mobile-exercise-list-small-span">reps</span>
        </div>
      </div>
    </div>
  );
};

export default TrackView;
