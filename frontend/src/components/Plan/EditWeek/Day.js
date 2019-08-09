import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import { PlanContext } from "../../../context/planContext";
import axios from "axios";
import { EDIT_EXERCISE, DELETE_EXERCISE } from "../../../reducers/planTypes";

// TODO: When to submit?

const Day = ({ day, match: { params } }) => {
  const { dispatch } = useContext(PlanContext);

  const { _id: dayId, exercises } = day;
  const { plan_id: planId, week_id: weekId } = params;

  function handleExerciseEdit(values, exerciseId) {
    console.log(values);
    axios
      .post(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerciseId}`, {
        ...values
      })
      .then(res => {
        const { data } = res;
        const { message } = data;
        if (message === "success") {
          console.log("gay2");
          dispatch({
            type: EDIT_EXERCISE,
            payload: { weekId, dayId, exerciseId, values }
          });
        }
      })
      .catch(err => console.error(err.response));
  }

  function handleExerciseDelete(exerciseId) {
    axios
      .delete(`/plan/exercise/${planId}/${weekId}/${dayId}/${exerciseId}`)
      .then(res => {
        const { data } = res;
        const { message } = data;
        if (message === "success") {
          dispatch({
            type: DELETE_EXERCISE,
            payload: { weekId, dayId, exerciseId }
          });
        }
      })
      .catch(console.error);
  }

  let exerciseDisplay = exercises.map(exercise => (
    <Exercise
      key={exercise._id}
      exercise={exercise}
      onExerciseEdit={handleExerciseEdit}
      onExerciseDelete={handleExerciseDelete}
    />
  ));
  return (
    <>
      <div className="edit-week-add-muscle-group-container">
        <p className="edit-week-muscle-group-label">Muscle group</p>
        <h3 className="edit-week-muscle-group">Chest</h3>
      </div>

      <div className="edit-week-add-header">
        <div className="edit-week-exercise-row">Exercise</div>
        <div className="edit-week-sets-row">Sets</div>
        <div className="edit-week-reps-row">Reps</div>
      </div>
      <div className="edit-week-add-body">{exerciseDisplay}</div>
    </>
  );
};

const Exercise = ({ exercise, onExerciseEdit, onExerciseDelete }) => {
  const {
    exercise: { name },
    sets,
    reps,
    _id: exerciseId
  } = exercise;

  return (
    <div className="edit-week-add-column">
      <span className="edit-week-exercise-row">{name}</span>
      <Formik
        initialValues={{ sets: sets || "", reps: reps || "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          onExerciseEdit(values, exerciseId);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div className="edit-week-sets-row">
              <Field name="sets" type="number" />
            </div>
            <div className="edit-week-reps-row">
              <Field name="reps" type="number" />
            </div>
            {(values.reps !== reps || values.sets !== sets) && (
              <button type="submit">
                <i className="material-icons">check_circle_outline</i>
              </button>
            )}
          </Form>
        )}
      </Formik>
      <button onClick={() => onExerciseDelete(exerciseId)}>
        <i className="material-icons">delete_outline</i>
      </button>
    </div>
  );
};

export default withRouter(Day);
