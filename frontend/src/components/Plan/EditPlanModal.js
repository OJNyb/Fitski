import React from "react";
import { Formik, Form, Field } from "formik";
import { useUser } from "../../context/userContext";

import Modal from "../shared/Modal/Modal";
import ErrorMessage from "../shared/Modal/ErrorMessage";
import useMobile from "../../hooks/useMobile";
import MobileInput from "../shared/Form/MobileInput";
import CustomRadio from "../shared/Form/CustomRadio";
import LoadingSpinner from "../shared/SVGs/LoadingSpinner";

const EditProfileModal = ({ plan, onSubmit, hideModal }) => {
  const {
    name,
    goal,
    difficulty,
    description,
    access,
    price,
    isPending,
    isRejected
  } = plan;
  const user = useUser();
  const isMobile = useMobile();

  const { isMerchant } = user;

  function onClose() {
    delete plan.isRejected;
    delete plan.isPending;
    hideModal();
  }

  if (isRejected === false && isPending === false) {
    onClose();
  }

  let children = (
    <Formik
      initialValues={{
        name,
        access,
        price: price || 0,
        goal: goal || "",
        difficulty: difficulty || "",
        description: description || ""
      }}
      validate={({ values }) => {
        const { name, price } = values;
        let errors = {};
        if (!name.length) {
          errors.name = "Name is required";
        }
        if (price < 100) {
          errors.price = "Price must be at least 1$";
        }

        if (price > 99999) {
          errors.price = "Price can not exceed 999.99$";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, values, isSubmitting, setFieldValue }) => (
        <Form className="flex-col border-box edit-plan-modal-form">
          {isRejected && (
            <ErrorMessage message="Couldn't apply update, please try again." />
          )}
          <div className="edit-plan-input-wrapper custom-scrollbar">
            {console.log(errors)}
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

            <div
              className={
                "edit-plan-modal-radio-container border-box padding-10-15" +
                (isMobile ? " padding-0-10-77" : "")
              }
            >
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
            {console.log(access)}
            {values.access === "paywall" && (
              <div>
                {isMerchant ? (
                  <input
                    type="number"
                    step="0.01"
                    min={1}
                    max={999}
                    value={values.price.toFixed(2)}
                    onChange={e => setFieldValue("price", e.target.value * 100)}
                  />
                ) : (
                  <div>
                    <div>Become a merchant</div>
                    {/* <a href=""></>
                      <img
                        src="/api/image/resources/stripeconnect.png"
                        alt="Connect to Stripe"
                      
                      />
                    </a> */}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className={
              isMobile
                ? "mobile-modal-submit-btn"
                : "web-modal-submit-btn theme-btn-filled"
            }
            disabled={isSubmitting || isPending}
            type="submit"
          >
            {isPending ? <LoadingSpinner /> : isRejected ? "Retry" : "Save"}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal
      children={children}
      header={"Edit Plan"}
      toggleModal={onClose}
      onlyHideOnBtnClick={true}
    />
  );
};

export default EditProfileModal;
