import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { addExercise } from "../../utils/planClient";
import { PlanContext } from "../../context/planContext";

import Exercises from "../shared/Exercises/Exercises";

const ExercisesHOC = ({ dayId, match: { params } }) => {
  const { dispatch } = useContext(PlanContext);

  const { plan_id: planId, week_id: weekId } = params;

  function handleAddExercise(exercise) {
    addExercise(dispatch, planId, weekId, dayId, exercise);
  }

  return (
    <div className="edit-week-exercise-container">
      <h2>Exercises</h2>
      <Exercises onAddExercise={handleAddExercise} />;
    </div>
  );
};

export default withRouter(ExercisesHOC);
