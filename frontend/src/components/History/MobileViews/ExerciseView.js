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
  const { _id, sets, exercise } = exer;
  console.log(exer);

  let viewDisplay;
  if (view === "track") {
    viewDisplay = (
      <TrackView
        sets={sets}
        exerId={_id}
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
