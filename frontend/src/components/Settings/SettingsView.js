import React from "react";

import RadioLong from "./SettingsRadioLong";
import PaymentView from "./PaymentView";
import PasswordView from "./PasswordView";
import EmailView from "./EmailView";

const View = ({
  unit,
  email,
  onUnitChange,
  selected,
  setSelected,
  hideView
}) => {
  if (selected) {
    if (selected === "Unit") {
      return (
        <div className="settings-mobile-setting-container padding-15">
          <div className="settings-mobile-setting-header-container">
            <h6 className="settings-mobile-setting-header black">
              Weight unit
            </h6>
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
      );
    } else if (selected === "Password") {
      return <PasswordView hideView={hideView} />;
    } else if (selected === "Email") {
      return <EmailView hideView={hideView} />;
    } else if (selected === "Payment") {
      return <PaymentView hideView={hideView} />;
    }
  } else {
    let unitDisplay = unit === "kg" ? "Kilogram" : "Pounds";

    return (
      <>
        <SettingItem
          label={"Unit"}
          desc={unitDisplay}
          onClick={() => setSelected("Unit")}
        />
        <SettingItem
          label={"Email"}
          desc={email}
          onClick={() => setSelected("Email")}
        />

        <SettingItem
          label={"Password"}
          onClick={() => setSelected("Password")}
        />

        <SettingItem label={"Payment"} onClick={() => setSelected("Payment")} />
      </>
    );
  }
};

const SettingItem = ({ label, desc, onClick }) => {
  return (
    <div
      className="flex-center-space-bw pointer padding-7-12 theme-border-bottom"
      onClick={onClick}
    >
      <div className="flex-col font-w-300 settings-item-text-wrapper">
        <span className="settings-item-label black">{label}</span>
        <span className="settings-item-desc color-light-gray">{desc}</span>
      </div>
      <div className="color-gray flex-center">
        <i className="material-icons-round">keyboard_arrow_right</i>
      </div>
    </div>
  );
};

export default View;
