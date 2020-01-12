import React, { useState, useEffect, useCallback } from "react";
import { ensureDecimal } from "../../../utils/ensureDecimal";
import useSetLoading from "../../../hooks/useSetLoading";
import { useUser } from "../../../context/userContext";

import Plus20 from "../../shared/SVGs/Plus20";
import Minus20 from "../../shared/SVGs/Minus20";

const TrackView = ({
  sets,
  exerId,
  exerciseId,
  onAddSet,
  onEditSet,
  onDeleteSet,
  handleAddSetRetry,
  handleEditSetRetry
}) => {
  const [selectedSet, setSelectedSet] = useState({});
  const [weight, setWeight] = useState(ensureDecimal(0));
  const [reps, setReps] = useState(0);
  const user = useUser();
  const { defaultUnit } = user;

  const onItemClick = useCallback(
    setId => {
      if (setId === selectedSet._id) {
        return setSelectedSet({});
      }
      const set = sets.filter(x => x._id === setId)[0];
      const { reps, weight } = set;

      setReps(reps || 0);
      setWeight(weight || 0);
      setSelectedSet(set);
    },
    [sets, selectedSet._id]
  );

  useEffect(() => {
    function setInitialInput() {
      if (sets.length) {
        const { reps: dReps, weight: dWeight } = sets[sets.length - 1];
        setWeight(dWeight);
        setReps(dReps);
      }
    }
    function setInitialSet() {
      if (sets && !Object.keys(selectedSet).length) {
        const index = sets.map(x => x.weight).indexOf(0.0);
        if (index > -1) {
          onItemClick(sets[index]._id);
        }
      }
    }
    setInitialInput();
    setInitialSet();
  }, [exerId, selectedSet, sets, onItemClick]);

  useSetLoading(false);

  const { _id: setId } = selectedSet;

  function onSaveClick() {
    onAddSet(exerId, exerciseId, { reps, weight });
  }

  function onUpdateClick() {
    onEditSet({ reps, weight }, exerId, setId);
    let index = sets.map(x => x._id).indexOf(setId);
    if (index > -1) {
      const nextSet = sets[index + 1];
      if (nextSet && nextSet.weight === 0) {
        setSelectedSet(nextSet);
      } else {
        setSelectedSet({});
      }
    }
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
      key={x._id}
      set={x}
      index={y}
      exerId={exerId}
      selectedSetId={setId}
      onDeleteSet={onDeleteSet}
      defaultUnit={defaultUnit}
      onItemClick={onItemClick}
      onCommentClick={() => console.log("c")}
      onAddSetRetry={handleAddSetRetry}
      onEditSetRetry={handleEditSetRetry}
    />
  ));

  function onWeightChange(e) {
    const { value } = e.target;

    setWeight(value);
  }

  function onRepsChange(e) {
    const { value } = e.target;
    if (value % 1 === 0) {
      setReps(value);
    }
  }

  return (
    <>
      <TrackInput
        label={`WEIGHT (${defaultUnit})`}
        onChange={onWeightChange}
        onDecrement={() => {
          if (weight - 2.5 >= 0) {
            setWeight(ensureDecimal(Number(weight) - 2.5));
          }
        }}
        onIncrement={() => setWeight(ensureDecimal(Number(weight) + 2.5))}
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
    <div className="history-mobile-exercise-input-wrapper flex-col">
      <div className="history-exercise-input-header font-w-700 font-13 color-gray">
        {label}:
      </div>
      <div className="history-mobile-exercise-input-box flex-center font-24">
        <button onClick={onDecrement}>
          <Minus20 fill={"#fff"} />
        </button>
        <div className="history-mobile-exercise-input-shiizz">
          <input
            onFocus={e => e.target.select()}
            value={value}
            onChange={onChange}
            type="number"
          />
          <div className="border-with-sides"></div>
        </div>
        <button onClick={onIncrement}>
          <Plus20 fill={"#fff"} />
        </button>
      </div>
    </div>
  );
};

const TrackListItem = ({
  set,
  index,
  exerId,
  defaultUnit,
  onItemClick,
  onDeleteSet,
  selectedSetId,
  onAddSetRetry,
  onEditSetRetry,
  onCommentClick
}) => {
  const { reps, weight, _id: setId, isRejected, isPending, request } = set;

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
    <>
      <div
        className={
          "history-mobile-exercise-list-item" +
          (setId === selectedSetId
            ? " history-mobile-exercise-list-item-active"
            : "") +
          (isPending ? " history-mobile-set-pending" : "") +
          (isRejected ? " history-mobile-set-rejected" : "")
        }
        onClick={() => onItemClick(setId)}
      >
        <div className="history-mobile-exercise-list-action-index flex-center-space-bw">
          {/* <button onClick={onCommentClick}>
            <i className="material-icons">comment</i>
          </button> */}
          <b className="font-16">{index + 1}</b>
        </div>
        <div className="history-mobile-exercise-list-kg-reps">
          <div className="history-mobile-exercise-list-label-wrapper">
            <span>
              <b className="mr-1">{ensureDecimal(weight)}</b>
              <span className="font-12 color-gray font-w-400 color-light-gray">
                {defaultUnit}
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
      {isRejected && (
        <div className="flex-ai-center history-mobile-set-rejected-container">
          <span className="color-light-gray">Request failed</span>
          <button className="padding-5 tc" onClick={onRetryClick}>
            <i className="material-icons">refresh</i>
          </button>
        </div>
      )}
    </>
  );
};

export default TrackView;
