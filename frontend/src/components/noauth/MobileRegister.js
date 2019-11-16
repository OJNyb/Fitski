import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import useSetLoading from "../../hooks/useSetLoading";
import MobileInput from "../shared/Form/MobileInput";
import { useAuth } from "../../context/authContext";

import "./signXError.css";

const Register = () => {
  const { register } = useAuth();
  const [serverErr, setServerErr] = useState(false);
  useSetLoading(false);

  return (
    <>
      <div className="width-100p padding-0-14 margin-top-20 flex-col-cen border-box max-width-600 margin-a">
        <i className="material-icons landing-icon-medium">fitness_center</i>
        <h2 className="font-21 margin-10-0">Create your account</h2>
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
          {({ errors, values, isSubmitting }) => (
            <>
              <div
                className={
                  "sign-x-alert-message" +
                  (serverErr ? " sign-x-alert-show" : "")
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

              <Form className="landing-mobile-sign-x-form stretch flex-col width-100p border-box">
                <Field
                  type="email"
                  name="email"
                  label="Email"
                  component={MobileInput}
                />

                <Field
                  type="text"
                  name="username"
                  label="Username"
                  component={MobileInput}
                />

                <Field
                  type="password"
                  name="password"
                  label="Password"
                  component={MobileInput}
                />

                <Field
                  type="password"
                  name="confirmPassword"
                  label="Confirm password"
                  component={MobileInput}
                />

                <div className="margin-15">
                  <button
                    className="theme-btn-filled width-100p  border-box"
                    type="submit"
                    disabled={
                      isSubmitting ||
                      Object.keys(errors).length ||
                      !values.email.length
                    }
                  >
                    Create account
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
