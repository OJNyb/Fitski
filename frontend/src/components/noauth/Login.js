import React, { useState } from "react";
import { Formik, Field } from "formik";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const [loginErr, setLoginErr] = useState(false);
  const { login } = useAuth();
  console.log(loginErr);
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
        login(values).catch(() => {
          // TODO: If err.status !== 404 ???
          setLoginErr(true);
          setSubmitting(false);
        });
      }}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <>
          {errors && !setLoginErr && setLoginErr(true)}
          <div
            className={
              "sign-x-alert-message" + (loginErr ? " sign-x-alert-show" : "")
            }
          >
            <div className="sign-x-message">
              <p>Incorrect username or password</p>
              <button
                className="sign-x-error-close"
                onClick={() => setLoginErr(false)}
              >
                &times;
              </button>
            </div>
          </div>

          <h2>Login</h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
            className="landing-sign-x-form flex-col flex-center"
          >
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="landing-input"
            />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="landing-input"
            />

            <button
              className="theme-btn-filled"
              type="submit"
              disabled={isSubmitting}
            >
              Log in
            </button>
          </form>
        </>
      )}
    </Formik>
  );
};

export default Login;
