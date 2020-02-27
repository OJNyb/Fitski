import React from "react";

import RadioLong from "./SettingsRadioLong";
import PaymentView from "./PaymentView";
import PasswordView from "./PasswordView";
import EmailView from "./EmailView";
import HelpView from "./HelpView";
import AboutView from "./AboutView";
import SettingItem from "./SettingsItem";

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
    } else if (selected === "Help") {
      return <HelpView hideView={hideView} />;
    } else if (selected === "About Chadify") {
      return <AboutView hideView={hideView} />;
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
        <SettingItem label={"Help"} onClick={() => setSelected("Help")} />
        <SettingItem
          label={"About Chadify"}
          onClick={() => setSelected("About Chadify")}
        />
      </>
    );
  }
};

export default View;
