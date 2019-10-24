import React, { useContext } from "react";
import Modal from "../shared/Modal/Modal";
import axios from "axios";
import { ADD_WEEK } from "../../types/planTypes";
import { PlanContext } from "../../context/planContext";
import { Formik, Form, Field } from "formik";

const AddWeeksModal = ({ planId, hideModal }) => {
  const { dispatch } = useContext(PlanContext);
  let children = (
    <Formik
      initialValues={{ numberOfWeeks: 1 }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        axios
          .post(`/plan/week/${planId}`, { ...values })
          .then(res => {
            const { data } = res;
            const { message, weekArray } = data;
            if (message === "success") {
              hideModal();
              dispatch({ type: ADD_WEEK, payload: { weekArray } });
            } else {
              console.log("err");
              setSubmitting(false);
            }
          })
          .catch(err => console.log(err.response));
      }}
    >
      {({ isSubmitting }) => (
        <Form className="add-weeks-form">
          <div>
            Weeks to add:
            <Field type="number" name="numberOfWeeks" />
          </div>

          <button type="submit" className="theme-btn" disabled={isSubmitting}>
            Add
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal header={"Add weeks"} children={children} toggleModal={hideModal} />
  );
};

export default AddWeeksModal;
