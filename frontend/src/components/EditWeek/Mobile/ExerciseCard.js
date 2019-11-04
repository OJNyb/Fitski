import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { ensureDecimal } from "../../../utils/ensureDecimal";

import TrashBin from "../../shared/SVGs/TrashBin";

const ExerciseCard = ({
  dayId,
  exercise,
  onAddSet,
  onCardClick,
  handleEditSet,
  activeExercise,
  handleDeleteSet,
  onDeleteExercise
}) => {
  const {
    exercise: { name, _id: exerciseId },
    sets,
    _id: exerId
  } = exercise;

  let headDropdown = null;

  let cardView;

  let isActive = exerId === activeExercise;

  if (isActive) {
    cardView = sets.map((x, y) => (
      <EditColumn
        set={x}
        index={y}
        key={x._id}
        dayId={dayId}
        exerId={exerId}
        handleEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
      />
    ));
  } else {
    cardView = sets.map((x, y) => (
      <SetColumn
        set={x}
        index={y}
        key={x._id}
        dayId={dayId}
        exerId={exerId}
        handleEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
      />
    ));
  }

  return (
    <div
      className={
        "edit-week-mobile-add-card" +
        (isActive ? " edit-week-mobile-add-card-active" : "")
      }
      onClick={() => onCardClick(exerId)}
    >
      <div className="history-exercise-name">
        <span className="">{name}</span>

        <div className="add-card-btn-container">
          <button
            className="theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onAddSet(exerId, exerciseId);
            }}
          >
            <i className="material-icons ">add</i>
          </button>
          <button
            className="add-card-remove-btn theme-btn-no-border"
            onClick={e => {
              e.stopPropagation();
              onDeleteExercise(exerId);
            }}
          >
            <i className="material-icons ">delete_outline</i>
          </button>
        </div>
      </div>

      {headDropdown}
      <div className="add-card-body">{cardView}</div>
    </div>
  );
};

const SetColumn = ({ set, index, exerId, onDeleteSet, handleEditSet }) => {
  const { reps, _id: setId } = set;

  return (
    <div className="edit-week-mobile-card-column">
      <div>
        <span className="edit-week-card-rep-index">{reps || 0}</span>
        <span className="edit-week-card-rep-label"> reps</span>
      </div>
      <span className="edit-week-card-rep-index">{index + 1}</span>
    </div>
  );
};

const EditColumn = ({ set, index, exerId, onDeleteSet, handleEditSet }) => {
  const { reps, _id: setId } = set;

  return (
    <div className="edit-week-mobile-card-column edit-week-mobile-edit-card-col">
      <div className="flex-center" onClick={e => e.stopPropagation()}>
        <button className="edit-week-mobile-reps-btn">
          <i className="material-icons">remove</i>
        </button>
        <div className="edit-week-mobile-reps-input-wrapper">
          <input
            type="tel"
            value={reps || 0}
            onChange={() => 0}
            pattern="^[0-9]\d*\.?\d*$"
          />
          <div className="border-with-sides" />
        </div>
        <button className="edit-week-mobile-reps-btn">
          <i className="material-icons">add</i>
        </button>
      </div>
      <span className="edit-week-card-rep-index">{index + 1}</span>
    </div>
  );
};

export default withRouter(ExerciseCard);
