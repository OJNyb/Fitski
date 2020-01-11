import React from "react";
import "./mobileInput.css";

const MobileInput = ({
  type,
  label,
  field,
  form,
  textarea,
  maxLength,
  autoComplete
}) => {
  const { name, value, onChange } = field;
  let onInputChange = onChange;
  if (maxLength) {
    onInputChange = e => {
      if (e.target.value.length > maxLength) return;
      else onChange(e);
    };
  }

  console.log(value);

  if (value === undefined || value === null) return null;

  const { touched, errors } = form;
  let error = errors[name];
  let touch = touched[name];

  let isError = !!error && !!touch;
  let input;
  if (textarea) {
    input = (
      <textarea
        className="width-100p border-box font-16 black"
        {...field}
        onChange={onInputChange}
      />
    );
  } else {
    input = (
      <input
        autoComplete={autoComplete}
        type={type}
        className="width-100p border-box font-16 black"
        {...field}
        onChange={onInputChange}
      />
    );
  }
  return (
    <div className="padding-10-15">
      <label>
        <div
          className={
            "mobile-input-wrapper flex-col border-box" +
            (isError ? " mobile-input-error" : "")
          }
        >
          <div className="mobile-label-box">
            <span>{label}</span>
          </div>
          <div className="pos-rel">{input}</div>
        </div>
      </label>

      <div className="width-100p padding-s-10 border-box flex-center-space-bw">
        <InputError error={error} touched={touch} />
        {maxLength && (
          <span className="color-gray font-w-300 font-14 pt-5">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

const InputError = ({ error, touched }) => {
  if (error && touched) {
    return <span className="color-d9 font-13">{error}</span>;
  } else {
    return <div />;
  }
};

export default MobileInput;
