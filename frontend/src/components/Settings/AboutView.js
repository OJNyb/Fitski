import React from "react";

import { Link } from "react-router-dom";

const StripeView = () => {
  return (
    <div>
      <SettingsLink label={"Terms"} to={"/terms"} />
      <SettingsLink label={"Privacy Policy"} to={"/privacy"} />
    </div>
  );
};

const SettingsLink = ({ label, to }) => {
  return (
    <Link
      className="flex-center-space-bw pointer theme-border-bottom settings-item-container"
      to={to}
    >
      <div className="flex-col font-w-300 settings-item-text-wrapper">
        <span className="settings-item-label black">{label}</span>
      </div>
      <div className="color-gray flex-center">
        <i className="material-icons-round">keyboard_arrow_right</i>
      </div>
    </Link>
  );
};

export default StripeView;
