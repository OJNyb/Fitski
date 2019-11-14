import React from "react";

const MobileInput = ({ type, label, field, form }) => {
  const { name } = field;
  const { touched, errors } = form;
  let error = errors[name];
  let touch = touched[name];

  let isError = !!error && !!touch;
  return (
    <div className="padding-10-15">
      <div
        className={
          "mobile-sign-x-input-wrapper flex-col border-box" +
          (isError ? " mobile-sign-x-input-error" : "")
        }
      >
        <div className="mobile-sign-x-label-box">
          <span>{label}</span>
        </div>
        <div className="pos-rel">
          <input
            type={type}
            className="width-100p border-box font-18"
            {...field}
          />
        </div>
      </div>
      <InputError error={error} touched={touch} />
    </div>
  );
};

const InputError = ({ error, touched }) => {
  if (error && touched) {
    return (
      <span className="landing-signuspan-error color-d9 font-13 padding-s-10">
        {error}
      </span>
    );
  }
  return null;
};

export default MobileInput;
