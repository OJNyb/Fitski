import React from "react";
import { Formik, Form, Field } from "formik";

import Modal from "../shared/Modal/Modal";
import useMobile from "../../hooks/useMobile";
import MobileInput from "../shared/Form/MobileInput";
import CustomRadio from "../shared/Form/CustomRadio";

const EditProfileModal = ({ plan, onSubmit, hideModal }) => {
  const { name, goal, difficulty, description, access } = plan;
  const isMobile = useMobile();

  let children = (
    <Formik
      initialValues={{
        name: name,
        access: access,
        goal: goal || "",
        difficulty: difficulty || "",
        description: description || ""
      }}
      validate={({ values }) => {
        const { name } = values;
        let errors = {};
        console.log(name);
        if (!name.length) {
          errors.name = "Name is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex-col border-box padding-10-0 edit-plan-modal-form">
          <div className="edit-plan-input-wrapper custom-scrollbar">
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
              maxLength={1000}
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
          </div>

          <button
            className={
              isMobile
                ? "mobile-modal-submit-btn"
                : "web-modal-submit-btn theme-btn-filled padding-10-0 width-80p margin-a"
            }
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal
      children={children}
      header={"Edit Profile"}
      toggleModal={hideModal}
      onlyHideOnBtnClick={true}
    />
  );
};

export default EditProfileModal;
