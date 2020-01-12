import React, { useState } from "react";
import useMobile from "../../../hooks/useMobile";

const RadioLong = ({ text, value, checked, onChange }) => {
  const [pressed, setPressed] = useState(false);
  const isMobile = useMobile();
  return (
    <label
      className="custom-radio-long-container flex-ai-center"
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseEnter={() => {
        if (!isMobile) {
          setPressed(true);
        }
      }}
      onMouseLeave={() => setPressed(false)}
    >
      <span className="black font-16 font-w-300">{text}</span>
      <div
        className={
          "custom-radio-icon-container" +
          (pressed ? " custom-radio-icon-container-pressed" : "")
        }
      >
        <div
          className={
            "custom-radio-icon-box" +
            (checked ? " custom-radio-icon-box-checked" : "")
          }
        >
          {checked && (
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <rect
                  x="9.76099"
                  y="1.08041"
                  width="1.11725"
                  height="10.2765"
                  transform="rotate(35.4456 9.76099 1.08041)"
                  fill="#fff"
                />
                <rect
                  x="1.29785"
                  y="6.00056"
                  width="4.96247"
                  height="1.11749"
                  transform="rotate(38.5509 1.29785 6.00056)"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="11" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          <input
            className="hidden-radio noselect"
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
          />
        </div>
      </div>
    </label>
  );
};

export default RadioLong;
