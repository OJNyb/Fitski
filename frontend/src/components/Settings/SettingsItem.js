import React from "react";

const SettingItem = ({ label, desc, onClick }) => {
  return (
    <div
      className="flex-center-space-bw pointer theme-border-bottom settings-item-container"
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

export default SettingItem;
