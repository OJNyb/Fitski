import React, { useState } from "react";
import { Types } from "mongoose";
import axios from "axios";

import ErrorMessage from "../shared/Modal/ErrorMessage";
import MobileInput from "../shared/Form/MobileInput";
import CustomRadio from "../shared/Form/CustomRadio";
import PriceInput from "../shared/Form/PriceInput";
import { Form, Field, Formik } from "formik";
import { useUser } from "../../context/userContext";
import StripeConnect from "../Stripe/StripeConnect";
import LoadingSpinner from "../shared/SVGs/LoadingSpinner";
import { getErrorMessage } from "../../utils/errorHandling";

const { ObjectId } = Types;

const CreatePlanForm = ({ isMobile, setRedir }) => {
  const user = useUser();
  const [err, setErr] = useState(null);

  const { stripeId } = user;
  const isMerchant = !!stripeId;

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        goal: "",
        difficulty: "",
        access: "private",
        price: 10
      }}
      validate={({ name }) => {
        let errors = {};
        if (!name.length) {
          errors.name = "Name is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { difficulty } = values;

        if (difficulty === "") delete values.difficulty;

        const planId = new ObjectId().toHexString();
        axios
          .post("/api/plan", { planId, ...values })
          .then(res => {
            const { data } = res;
            const { message } = data;
            if (message === "success") {
              setRedir(planId);
            }
          })
          .catch(err => {
            setErr(getErrorMessage(err)[0].message);
            setSubmitting(false);
          });
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="stretch flex-col width-100p border-box padding-10-0 create-plan-form">
          {err && <ErrorMessage message={err} />}
          <div className="create-plan-input-wrapper">
            <Field
              name="name"
              component={MobileInput}
              label="Name"
              maxLength={30}
              autoComplete="off"
            />

            <Field
              name="goal"
              component={MobileInput}
              label="Goal"
              maxLength={20}
              autoComplete="off"
            />

            <Field
              name="description"
              component={MobileInput}
              label="Description"
              textarea={true}
              verticalResize={true}
              maxLength={30000}
            />

            <div className="create-plan-radio-container border-box padding-10-15">
              <div>
                <span>Access</span>
                <Field
                  component={CustomRadio}
                  text="Private"
                  name="access"
                  valueski="private"
                />

                <Field
                  component={CustomRadio}
                  text="Public"
                  name="access"
                  valueski="public"
                />

                <Field
                  component={CustomRadio}
                  text="Paywall"
                  name="access"
                  valueski="paywall"
                />
              </div>

              <div>
                <span>Difficulty</span>

                <Field
                  component={CustomRadio}
                  text="Beginner"
                  name="difficulty"
                  valueski="Beginner"
                />

                <Field
                  component={CustomRadio}
                  text="Intermediate"
                  name="difficulty"
                  valueski="Intermediate"
                />

                <Field
                  component={CustomRadio}
                  text="Advanced"
                  name="difficulty"
                  valueski="Advanced"
                />
              </div>
            </div>

            {values.access === "paywall" && (
              <div>
                <Field
                  component={PriceInput}
                  name="price"
                  isMerchant={isMerchant}
                />
                {!isMerchant && (
                  <div className="padding-10">
                    <StripeConnect />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={isMobile ? "" : "padding-10-15"}>
            <button
              className={
                isMobile
                  ? "mobile-modal-submit-btn"
                  : "web-modal-submit-btn theme-btn-filled"
              }
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner /> : "Create"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePlanForm;
