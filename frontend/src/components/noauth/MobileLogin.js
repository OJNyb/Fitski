import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import { useAuth } from "../../context/authContext";
import useSetLoading from "../../hooks/useSetLoading";
import { Link } from "react-router-dom";

import MobileInput from "../shared/Form/MobileInput";

import "./signXError.css";
import "./mobileSignX.css";

const Login = () => {
  const [loginErr, setLoginErr] = useState(false);

  const { login } = useAuth();
  useSetLoading(false);

  return (
    <div className="width-100p padding-0-14 margin-top-20 flex-col-cen border-box max-width-600 margin-a">
      <i className="material-icons tc font-30">fitness_center</i>
      <h2 className="font-21 margin-10-0">Log in to Fitnut</h2>
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
        {({ errors, values, isSubmitting }) => (
          <>
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

            <Form className="landing-mobile-sign-x-form stretch flex-col width-100p border-box">
              <Field
                type="email"
                name="email"
                component={MobileInput}
                label="Email"
                autoComplete="email"
              />
              <Field
                type="password"
                name="password"
                component={MobileInput}
                label="Password"
                autoComplete="current-password"
              />
              {console.log("gay")}

              <div className="margin-15">
                <button
                  className="theme-btn-filled width-100p  border-box"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !values.email.length ||
                    !values.password.length
                  }
                >
                  Log in
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      <div className="flex-ai-center margin-top-10">
        <Link to="/forgot" className="tc">
          Forgot password?
        </Link>
        <span className="color-gray margin-5">·</span>
        <Link to="/register" className="tc">
          Sign up for Fitnut
        </Link>
      </div>
    </div>
  );
};

export default Login;
