import React from "react";
import axios from "axios";
import { isSuccessful, getErrorMessage } from "../../utils/errorHandling";
import useMobile from "../../hooks/useMobile";
import { useAuth } from "../../context/authContext";

import { Formik, Form, Field } from "formik";
import MobileInput from "../shared/Form/MobileInput";

const EmailView = ({ hideView }) => {
  const { updateUser } = useAuth();
  const isMobile = useMobile();
  return (
    <Formik
      initialValues={{
        password: "",
        email: ""
      }}
      validate={({ password, email }) => {
        let errors = {};
        if (!email) {
          errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
          errors.email = "Invalid email address";
        }

        if (!password.length) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        axios
          .post("/api/user/edit/email", { ...values })
          .then(res => {
            const isSucc = isSuccessful(res);
            if (isSucc) {
              hideView();
              updateUser();
            }
          })
          .catch(err => {
            let details = getErrorMessage(err);
            const { message } = details[0];
            if (message === "Incorrect password. Please try again") {
              setFieldError("password", message);
            } else if (message === "Email has already been taken.") {
              setFieldError("email", message);
            }
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="stretch flex-col width-100p border-box padding-10-0 create-plan-form">
          <Field
            name="email"
            type="email"
            component={MobileInput}
            label="New Email"
            autoComplete="email"
          />

          <Field
            name="password"
            type="password"
            component={MobileInput}
            label="Password"
            autoComplete="off"
          />

          <div className="padding-10-15">
            <button
              className={
                isMobile
                  ? "mobile-modal-submit-btn"
                  : "web-modal-submit-btn theme-btn-filled"
              }
              type="submit"
              disabled={isSubmitting}
            >
              Set Email
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailView;
