import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import axios from "axios";
import useSetLoading from "../../hooks/useSetLoading";

import MobileInput from "../shared/Form/MobileInput";

import "./signXError.css";
import "./mobileSignX.css";
import { isSuccessful } from "../../utils/errorHandling";

const ForgotPassword = () => {
  const [backendError, setBackendError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  useSetLoading(false);

  let view;
  if (emailSent) {
    view = <p className="text-center">Email sent to {emailSent}</p>;
  } else {
    view = (
      <div className="width-100p padding-0-14 margin-top-20 flex-col-cen border-box max-width-600 margin-a">
        <i className="material-icons tc font-30">fitness_center</i>
        <h2 className="font-21 margin-10-0">Reset Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("/api/user/forgot", values)
              .then(res => {
                let isSucc = isSuccessful(res);
                if (isSucc) {
                  setEmailSent(values.email);
                } else {
                  setBackendError("Something went wrong...");
                }
              })
              .catch(err => {
                // TODO: If err.status !== 404 ???
                console.log(err.response);
                const { response } = err;
                const { data } = response;
                const { error } = data;
                const { details } = error;
                console.log(response);

                setBackendError(details[0].message);
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
                  type="email"
                  name="email"
                  component={MobileInput}
                  label="Email"
                  autoComplete="email"
                />

                <div className="margin-15">
                  <button
                    className="theme-btn-filled width-100p  border-box"
                    type="submit"
                    disabled={isSubmitting || !values.email.length}
                  >
                    Send email
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    );
  }

  return view;
};

export default ForgotPassword;
