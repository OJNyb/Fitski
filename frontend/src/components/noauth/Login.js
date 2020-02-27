import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useAuth } from "../../context/authContext";
import { getErrorMessage } from "../../utils/errorHandling";

import "./signXError.css";

const Login = () => {
  const [loginErr, setLoginErr] = useState(false);
  const { login } = useAuth();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        login(values).catch(err => {
          const { message } = getErrorMessage(err)[0];
          setLoginErr(message);
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <>
          <div
            className={
              "sign-x-alert-message" + (loginErr ? " sign-x-alert-show" : "")
            }
          >
            <div className="sign-x-message">
              <p>{loginErr}</p>
              <button
                className="sign-x-error-close"
                onClick={() => setLoginErr(false)}
              >
                &times;
              </button>
            </div>
          </div>

          <h2>Login</h2>

          <Form className="landing-sign-x-form flex-col flex-center">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="landing-input"
              autoComplete="email"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="landing-input"
              autoComplete="password"
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
  );
};

export default Login;
