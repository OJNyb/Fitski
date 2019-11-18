import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import useSetLoading from "../../hooks/useSetLoading";
import axios from "axios";
import { Types } from "mongoose";
import { Redirect } from "react-router-dom";
import CustomCheckbox from "../shared/Form/CustomCheckbox";
import CustomRadio from "../shared/Form/CustomRadio";
import MobileInput from "../shared/Form/MobileInput";

import useNavRedDehaze from "../../hooks/useNavRedDehaze";

import "./createPlan.css";
const { ObjectId } = Types;

const CreatePlan = () => {
  const [redir, setRedir] = useState(false);
  useSetLoading(false);
  useNavRedDehaze();

  if (redir) {
    return <Redirect to={`plans/${redir}`} />;
  }

  return (
    <div className="create-plan-container">
      <Formik
        initialValues={{
          name: "",
          description: "",
          gainMuscle: false,
          loseWeight: false,
          gainStrength: false,
          difficulty: ""
        }}
        validate={({ name }) => {
          let errors = {};
          if (!name.length) {
            errors.name = "Name is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { gainMuscle, gainStrength, loseWeight, difficulty } = values;
          let goals = [];

          if (gainMuscle) goals.push("Gain muscle");
          if (gainStrength) goals.push("Gain strength");
          if (loseWeight) goals.push("Lose weight");
          if (difficulty === "") delete values.difficulty;

          const planId = new ObjectId().toHexString();
          axios
            .post("/plan", { planId, goals, ...values })
            .then(res => {
              const { data } = res;
              const { message } = data;
              if (message === "success") {
                setRedir(planId);
              }
            })
            .catch(err => console.error(err.response));
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            <h2>Create plan</h2>
            {/* <Form className="create-plan-form">
              <div className="create-plan-name-input-wrapper">
                <Field
                  name="name"
                  placeholder="Name"
                  className="create-plan-name-input"
                  autoFocus
                  autoComplete="off"
                />
                {errors.name && touched.name && (
                  <i className="material-icons">warning</i>
                )}
              </div>
              <Field
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
                    valueski="Beginner"
                  />

                  <Field
                    component={CustomRadio}
                    text="Intermediate"
                    name="difficulty"
                    valueski="Intermediate"
                  />

                  <Field
                    component={CustomRadio}
                    text="Advanced"
                    name="difficulty"
                    valueski="Advanced"
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
            </Form> */}
            <Form className="stretch flex-col width-100p border-box padding-10-0">
              <Field
                name="name"
                component={MobileInput}
                label="Name"
                maxLength={30}
                autoComplete="off"
              />
              <Field
                name="description"
                component={MobileInput}
                label="Description"
                textarea={true}
                maxLength={1000}
              />

              <div className="flex-center-space-bw border-box padding-10-15 width-80p">
                <div className="flex-col">
                  <span className="font-13 black font-w-500">Goal</span>
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
                  <span>Difficulty</span>

                  <Field
                    component={CustomRadio}
                    text="Beginner"
                    name="difficulty"
                    valueski="Beginner"
                  />

                  <Field
                    component={CustomRadio}
                    text="Intermediate"
                    name="difficulty"
                    valueski="Intermediate"
                  />

                  <Field
                    component={CustomRadio}
                    text="Advanced"
                    name="difficulty"
                    valueski="Advanced"
                  />
                </div>
              </div>

              <div className="margin-15">
                <button className="mobile-modal-submit-btn" type="submit">
                  Create
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreatePlan;
