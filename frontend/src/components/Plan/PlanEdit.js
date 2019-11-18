import React, { useContext } from "react";
import { PlanContext } from "../../context/planContext";

import MobileInput from "../shared/Form/MobileInput";
import CustomCheckbox from "../shared/Form/CustomCheckbox";
import CustomRadio from "../shared/Form/CustomRadio";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import useSetLoading from "../../hooks/useSetLoading";
import useTitle from "../../hooks/useTitle";
import useNavRedBack from "../../hooks/useNavRedBack";
import MobileNavMidContainer from "../shared/NavMid/MobileNavMidContainer";
import { editPlan } from "../../utils/planClient";

const PlanEdit = () => {
  const {
    dispatch,
    state: { woPlan }
  } = useContext(PlanContext);
  const { name, goals, difficulty, description, _id: planId } = woPlan;
  useTitle(name);
  useSetLoading(false);
  useNavRedBack(`/plans/${planId}`);
  const { push } = useHistory();

  return (
    <>
      <Formik
        initialValues={{
          name,
          gainMuscle: goals.indexOf("Gain muscle") > -1,
          loseWeight: goals.includes("Lose weight"),
          gainStrength: goals.includes("Gain strength"),
          difficulty,
          description
        }}
        validate={values => {
          let errors = {};
          const {
            name,
            gainMuscle,
            loseWeight,
            gainStrength,
            description
          } = values;
          if (!name) {
            errors.name = "Name is required";
          } else if (name.length > 30) {
            errors.name = "Name must be shorter than 30 characters";
          }

          if (description.length > 1000) {
            errors.description =
              "Description must be shorter than 1000 characters";
          }

          if (gainMuscle && loseWeight && gainStrength) {
            errors.goals = "Plan can only have a maximum of 2 goals";
          }

          return errors;
        }}
        onSubmit={values => {
          const {
            name: fName,
            description: fDesc,
            gainMuscle,
            gainStrength,
            loseWeight,
            difficulty: fDiff
          } = values;
          let fGoals = [];
          if (gainMuscle) fGoals.push("Gain muscle");
          if (gainStrength) fGoals.push("Gain strength");
          if (loseWeight) fGoals.push("Lose weight");
          let update = {};
          if (name !== fName) {
            update.name = fName;
          }
          if (description !== fDesc) {
            update.description = fDesc;
          }
          if (fDiff !== difficulty) {
            update.difficulty = fDiff;
          }

          if (JSON.stringify(fGoals) !== JSON.stringify(goals)) {
            update.goals = fGoals;
          }

          if (Object.keys(update).length) {
            editPlan(dispatch, planId, update);
          }
          push(`/plans/${planId}/overview`);
        }}
      >
        {({ values, errors, handleSubmit }) => (
          <>
            <MobileNavMidContainer
              children={
                <>
                  <h2 className="margin-0 nav-h2 font-18 color-white">
                    Edit plan
                  </h2>
                  <button
                    type="submit"
                    onClick={() => handleSubmit(values)}
                    className="white-material-btn padding-5"
                  >
                    <i className="material-icons font-28 pt-5">check</i>
                  </button>
                </>
              }
            />
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
                  <span className="font-15 black font-w-500 mb-2">Goal</span>
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
                  <span className="font-15 black font-w-500 mb-2">
                    Difficulty
                  </span>

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
                className="mobile-modal-submit-btn"
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                Save
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
export default PlanEdit;
