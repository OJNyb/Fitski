import React from "react";

import { Formik, Form, Field } from "formik";
import MobileInput from "../shared/Form/MobileInput";
import axios from "axios";
import useMobile from "../../hooks/useMobile";
import { isSuccessful, getErrorMessage } from "../../utils/errorHandling";

const PasswordView = ({ hideView }) => {
  const isMobile = useMobile();
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: ""
      }}
      validate={({ oldPassword, newPassword, newPasswordConfirm }) => {
        let errors = {};
        if (!oldPassword.length) {
          errors.oldPassword = "Old Password is required";
        }

        if (!newPassword.length) {
          errors.newPassword = "New Password is required";
        }

        if (newPassword !== newPasswordConfirm) {
          errors.newPasswordConfirm = "The new password does not match.";
        }

        if (!newPassword) {
          errors.newPassword = "New Password is required";
        } else if (/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/.test(newPassword)) {
          errors.newPassword =
            "Password must have at least one lower case, one upper case and one number";
        }
        return errors;
      }}
      onSubmit={(
        { oldPassword, newPassword },
        { setSubmitting, setFieldError }
      ) => {
        axios
          .post("/api/user/password/set", { oldPassword, newPassword })
          .then(res => {
            const isSucc = isSuccessful(res);
            if (isSucc) {
              hideView();
            }
          })
          .catch(err => {
            let details = getErrorMessage(err);
            if (details[0].message === "Incorrect password. Please try again") {
              setFieldError(
                "oldPassword",
                "Incorrect password. Please try again"
              );
            }
          });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="stretch flex-col width-100p border-box padding-10-0 create-plan-form">
          <Field
            name="oldPassword"
            type="password"
            component={MobileInput}
            label="Current Password"
            autoComplete="password"
          />

          <Field
            name="newPassword"
            type="password"
            component={MobileInput}
            label="New Password"
            autoComplete="off"
          />

          <Field
            name="newPasswordConfirm"
            type="password"
            component={MobileInput}
            label="Confirm Password"
            autoComplete="off"
          />

          <button
            className={
              isMobile
                ? "mobile-modal-submit-btn"
                : "web-modal-submit-btn theme-btn-filled"
            }
            type="submit"
            disabled={isSubmitting}
          >
            Set Password
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordView;
