import React from "react";
import { Formik, Form, Field } from "formik";

import "./createPlan.css";
import axios from "axios";

// Just have modal in My workout plans?

const CreatePlan = () => {
  return (
    <div>
      <Formik
        initialValues={{ name: "", description: "", categories: [] }}
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
        {({ errors, handleSubmit, isSubmitting }) => (
          <>
            <h2>Create plan</h2>
            <Form className="create-plan-form">
              <Field type="name" name="name" placeholder="Name" />
              <Field
                type="description"
                name="description"
                placeholder="Description"
              />

              <button
                className="theme-btn-filled"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreatePlan;
