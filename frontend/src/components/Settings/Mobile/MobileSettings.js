import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import NavMid from "../../shared/NavMid/NavMid";
import RadioLong from "./SettingsRadioLong";

import "./mobileSettings.css";

const MobileSettings = ({ unit, onUnitChange }) => {
  useSetLoading(false);

  return (
    <>
      <NavMid backText={"Settings"} />
      <div className="settings-mobile-setting-container padding-15">
        <div className="settings-mobile-setting-header-container">
          <h6 className="settings-mobile-setting-header black">Weight unit</h6>
          <p className="settings-mobile-setting-label color-gray">
            Choose whether you want to use kilograms or pounds
          </p>
        </div>
        <RadioLong
          text="Kilogram"
          value={"kg"}
          checked={"kg" === unit}
          onChange={onUnitChange}
        />
        <RadioLong
          text="Pounds"
          value={"lbs"}
          checked={"lbs" === unit}
          onChange={onUnitChange}
        />
      </div>
    </>
  );
};

export default MobileSettings;
