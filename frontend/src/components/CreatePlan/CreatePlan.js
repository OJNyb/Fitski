import React from "react";
import { Formik, Form, Field } from "formik";
import useSetLoading from "../../hooks/useSetLoading";
import axios from "axios";

import "./createPlan.css";

const CreatePlan = () => {
  useSetLoading(false);

  return (
    <div className="create-plan-container">
      <Formik
        initialValues={{
          name: "",
          description: "",
          gainMuscle: false,
          loseWeight: false,
          gainStrength: false,
          difficulty: false
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("/plan", values)
            .then(res => {
              const { data } = res;
              const { message } = data;
              if (message === "success") {
                alert("Success");
              }
            })
            .catch(err => console.error(err.response));
          setSubmitting(false);
        }}
      >
        {({ errors, handleSubmit, isSubmitting, values }) => (
          <>
            <h2>Create plan</h2>
            <Form className="create-plan-form">
              <Field
                type="name"
                name="name"
                placeholder="Name"
                className="create-plan-name-input"
                autoFocus
              />
              <Field
                type="textarea"
                name="description"
                component="textarea"
                placeholder="Description"
              />

              <div className="create-plan-check-container">
                <div>
                  <h6>Goal</h6>
                  <Field
                    component={CustomCheckbox}
                    text="Gain strength"
                    name="gainStrength"
                  />

                  <Field
                    component={CustomCheckbox}
                    text="Gain muscle"
                    name="gainMuscle"
                  />

                  <Field
                    component={CustomCheckbox}
                    text="Lose weight"
                    name="loseWeight"
                  />
                </div>
                <div>
                  <h6>Difficulty</h6>

                  <Field
                    component={CustomRadio}
                    text="Beginner"
                    name="difficulty"
                    value="beginner"
                  />

                  <Field
                    component={CustomRadio}
                    text="Intermediate"
                    name="difficulty"
                    value="intermediate"
                  />

                  <Field
                    component={CustomRadio}
                    text="Advanced"
                    name="difficulty"
                    value="advanced"
                  />
                </div>
              </div>
              <button
                className="theme-btn-filled"
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

const CustomCheckbox = ({ text, field }) => {
  return (
    <label className="custom-checkbox-container">
      <input type="checkbox" {...field} />
      {text}
      <span className="custom-checkmark"></span>
    </label>
  );
};

const CustomRadio = ({ text, field }) => {
  return (
    <label className="custom-checkbox-container">
      <input type="radio" {...field} />
      {text}
      <span className="custom-checkmark"></span>
    </label>
  );
};

export default CreatePlan;
