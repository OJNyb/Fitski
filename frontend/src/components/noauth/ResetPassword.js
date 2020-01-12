import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import useSetLoading from "../../hooks/useSetLoading";
import { useParams, Redirect } from "react-router-dom";
import { getErrorMessage } from "../../utils/errorHandling";

import MobileInput from "../shared/Form/MobileInput";

import "./signXError.css";
import "./mobileSignX.css";

const ResetPassword = () => {
  useSetLoading(false);
  const { token } = useParams();
  const [emailSent, setEmailSent] = useState(false);
  const [backendError, setBackendError] = useState(false);

  if (emailSent) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="width-100p padding-0-14 margin-top-20 flex-col-cen border-box max-width-600 margin-a">
      <i className="material-icons tc font-30">fitness_center</i>
      <h2 className="font-21 margin-10-0">New Password</h2>
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validate={values => {
          let errors = {};
          if (!values.password) {
            errors.password = "Password is required";
          } else if (
            /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/.test(values.password)
          ) {
            errors.password =
              "Password must have at least one lower case, one upper case and one number and longer or equal to 8 characters";
          }

          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords does not match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post(`/api/user/reset/${token}`, values)
            .then(res => {
              console.log(res);
              setEmailSent(true);
            })
            .catch(err => {
              // TODO: If err.status !== 404 ???
              const { message } = getErrorMessage(err)[0];
              setBackendError(message);
              setSubmitting(false);
            });
        }}
      >
        {({ errors, values, isSubmitting }) => (
          <>
            <div
              className={
                "sign-x-alert-message" +
                (backendError ? " sign-x-alert-show" : "")
              }
            >
              <div className="sign-x-message">
                <p>{backendError}</p>
                <button
                  className="sign-x-error-close"
                  onClick={() => setBackendError(false)}
                >
                  &times;
                </button>
              </div>
            </div>

            <Form className="landing-mobile-sign-x-form stretch flex-col width-100p border-box">
              <Field
                type="password"
                name="password"
                label="Password"
                component={MobileInput}
                autoComplete="new-password"
              />

              <Field
                type="password"
                name="confirmPassword"
                label="Confirm password"
                component={MobileInput}
                autoComplete="new-password"
              />

              <div className="margin-15">
                <button
                  className="theme-btn-filled width-100p  border-box"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).length ||
                    !values.password.length
                  }
                >
                  Reset
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
