import React, { useRef, useState, useEffect } from "react";
import {
  checkIsValidNumber,
  cleanValue,
  formatValue
} from "../../utils/priceInputUtils";

import "./priceInput.css";

const PriceInput = ({ field, form, defaultValue, isMerchant }) => {
  const { name, value } = field;
  const { touched, errors } = form;
  let error = errors[name];
  let touch = touched[name];
  let isError = !!error && !!touch;

  const { setFieldValue } = form;

  //-----

  const _defaultValue = defaultValue ? formatValue(String(defaultValue)) : "";
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);

  const onFocus = () => (stateValue ? stateValue.length : 0);

  const processChange = event => {
    const {
      target: { selectionStart, value }
    } = event;

    const valueOnly = cleanValue(value, true, 2);

    if (!valueOnly) {
      setFieldValue(name, null);
      return setStateValue("");
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly);
      if (selectionStart) {
        const cursor =
          selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }
      setStateValue(formattedValue);
    }

    console.log(valueOnly);
    setFieldValue(name, Number(valueOnly));
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef, stateValue]);

  return (
    <div className="padding-10-15">
      <label>
        <div
          className={
            "mobile-input-wrapper flex-col border-box" +
            (isError ? " mobile-input-error" : "")
          }
          aria-disabled={!isMerchant}
        >
          <div className="mobile-label-box">
            <span>Price</span>
          </div>
          <div className="pos-rel flex-ai-center">
            <div className="price-input-dollar">$</div>

            <input
              className="width-100p border-box font-16 black"
              style={{
                padding: "2px 10px 5px 5px"
              }}
              autoComplete="off"
              type="tel"
              name={name}
              onChange={processChange}
              onFocus={onFocus}
              value={stateValue}
              pattern="[0-9]+([\.,][0-9]+)?"
              ref={inputRef}
              disabled={!isMerchant}
            />
          </div>
        </div>
      </label>

      <div className="width-100p padding-s-10 border-box flex-center-space-bw">
        <InputError error={error} touched={touch} />
        <span className="color-gray font-w-300 font-14 pt-5">1 - 1000$</span>
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

export default PriceInput;
