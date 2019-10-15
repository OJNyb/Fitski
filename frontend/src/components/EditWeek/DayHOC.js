import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../context/planContext";
import { editExercise, deleteExercise } from "../../utils/planClient";

import EditDay from "./EditDay";

const DayHOC = ({ day, match }) => {
  const { dispatch } = useContext(PlanContext);
  const { params } = match;

  const { plan_id: planId, week_id: weekId } = params;

  function handleEditExercise(values, dayId, exerciseId) {
    editExercise(dispatch, values, planId, weekId, dayId, exerciseId);
  }

  function handleDeleteExercise(dayId, exerId) {
    deleteExercise(dispatch, planId, weekId, dayId, exerId);
  }

  return (
    <EditDay
      day={day}
      handleEditExercise={handleEditExercise}
      handleDeleteExercise={handleDeleteExercise}
    />
  );
};

export default withRouter(DayHOC);
