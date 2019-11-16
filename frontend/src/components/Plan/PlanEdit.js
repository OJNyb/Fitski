import React from "react";
import MobileInput from "../shared/Form/MobileInput";
import { Formik, Form, Field } from "formik";

const PlanEdit = ({ woPlan, setEdit }) => {
  const { name, goals, difficulty, description } = woPlan;
  return (
    <Formik
      initialValues={{ name, goals, difficulty, description }}
      validate={values => {
        let errors = {};
        // if (!values.email) {
        //   errors.email = "Email is required";
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = "Invalid email address";
        // }

        // if (!values.password) {
        //   errors.password = "Password is required";
        // }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        //   editPlan(dispatch, values);
        setEdit(false);
      }}
    >
      {() => (
        <Form className="landing-mobile-sign-x-form stretch flex-col width-100p border-box">
          <Field name="name" component={MobileInput} label="Name" />
          <Field
            name="description"
            component={MobileInput}
            label="Description"
          />

          <div className="margin-15">
            <button
              className="theme-btn-filled width-100p  border-box"
              type="submit"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PlanEdit;
