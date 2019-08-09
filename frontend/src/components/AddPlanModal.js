import React, { useContext } from "react";
import Modal from "./shared/Modal/Modal";
import axios from "axios";
import { ADD_PLAN } from "../reducers/plansTypes";
import { Formik, Form, Field } from "formik";

// TOOD: Categories

const AddWeeksModal = ({ dispatch, hideModal }) => {
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
              dispatch({ type: ADD_PLAN, payload: { values, _id } });
            } else {
              console.log("err");
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
            Add
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal header={"Add plan"} children={children} toggleModal={hideModal} />
  );
};

export default AddWeeksModal;
