import React from "react";
import Modal from "../shared/Modal/Modal";
import axios from "axios";
import { ADD_PLAN } from "../../types/plansTypes";
import { useUser } from "../../context/userContext";

import { Formik, Form, Field } from "formik";

// TOOD: Categories
const CreatePlanModal = ({ dispatch, hideModal }) => {
  const user = useUser();

  console.log(user);

  let children = (
    <Formik
      initialValues={{ name: "", description: "", categories: [] }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        axios
          .post(`/plan`, { ...values })
          .then(res => {
            const { data } = res;
            const { _id, message } = data;
            if (message === "success") {
              hideModal();
              dispatch({ type: ADD_PLAN, payload: { _id, user, values } });
            } else {
              console.log("Message wasn't success");
            }
          })
          .catch(err => console.log(err.response));
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form className="add-plan-form">
          Name:
          <Field name="name" />
          Description:
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          <button type="submit" className="theme-btn" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal header={"Create plan"} children={children} toggleModal={hideModal} />
  );
};

export default CreatePlanModal;
