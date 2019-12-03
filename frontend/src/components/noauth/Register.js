import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/authContext";

import "./signXError.css";
import Disclaimer from "./Disclaimer";

const Register = () => {
  const { register } = useAuth();
  const [serverErr, setServerErr] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: ""
        }}
        validate={values => {
          let errors = {};
          if (!values.username) {
            errors.username = "Username is required";
          }

          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (
            /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/.test(values.password)
          ) {
            errors.password =
              "Password must have at least one lower case, one upper case and one number";
          }

          if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords does not match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setServerErr(false);
          register(values).catch(err => {
            setServerErr(err);
          });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <>
            <div
              className={
                "sign-x-alert-message" + (serverErr ? " sign-x-alert-show" : "")
              }
            >
              <div className="sign-x-message">
                {Object.keys(serverErr).length > 0 &&
                  (serverErr.isJoi ||
                    serverErr.isCustom ||
                    serverErr.isMongo) && (
                    <>
                      {serverErr.error.details.map((error, index) => (
                        <p key={index}>{error.message}</p>
                      ))}
                    </>
                  )}
                <button
                  className="sign-x-error-close"
                  onClick={() => setServerErr(false)}
                >
                  &times;
                </button>
              </div>
            </div>

            <h2>Sign up</h2>

            <Form className="landing-sign-x-form flex-col flex-center">
              <div>
                <Field
                  autoComplete="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={
                    "landing-input" +
                    (errors.email && touched.email ? " error-input-border" : "")
                  }
                />
                <InputError error={errors.email} touched={touched.email} />
              </div>
              <div>
                <Field
                  autoComplete="username"
                  type="username"
                  name="username"
                  placeholder="Username"
                  className={
                    "landing-input" +
                    (errors.username && touched.username
                      ? " error-input-border"
                      : "")
                  }
                />
                <InputError
                  error={errors.username}
                  touched={touched.username}
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  className={
                    "landing-input" +
                    (errors.password && touched.password
                      ? " error-input-border"
                      : "")
                  }
                />
                <InputError
                  error={errors.password}
                  touched={touched.password}
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className={
                    "landing-input" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " error-input-border"
                      : "")
                  }
                />
                <InputError
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </div>
              <Disclaimer />
              <button
                type="submit"
                disabled={isSubmitting}
                className="theme-btn-filled"
              >
                Create Account
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

const InputError = ({ error, touched }) => {
  if (error && touched) {
    return (
      <>
        <i className="material-icons error-input-icon">error</i>
        <p className="landing-signup-error">{error}</p>
      </>
    );
  }
  return null;
};

export default Register;
