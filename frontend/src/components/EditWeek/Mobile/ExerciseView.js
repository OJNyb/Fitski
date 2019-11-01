import React from "react";

import TrackView from "./TrackView";
import HistoryView from "./HistoryView";
import GraphView from "./GraphView";

import "./exerciseView.css";

const ExerciseView = ({
  view,
  exer,
  historyDays,
  handleAddSet,
  handleEditSet,
  handleDeleteSet
}) => {
  const { _id: exerId, sets, exercise } = exer;
  const { _id: exerciseId } = exercise;

  let viewDisplay;
  if (view === "track") {
    viewDisplay = (
      <TrackView
        sets={sets}
        exerId={exerId}
        exerciseId={exerciseId}
        onAddSet={handleAddSet}
        onEditSet={handleEditSet}
        onDeleteSet={handleDeleteSet}
      />
    );
  } else if (view === "history") {
    viewDisplay = <HistoryView exercise={exercise} historyDays={historyDays} />;
  } else {
    viewDisplay = <GraphView />;
  }
  return (
    <>
      <div className="history-mobile-exercise-body">{viewDisplay}</div>
    </>
  );
};

export default ExerciseView;
