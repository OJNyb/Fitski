import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import useSetLoading from "../../hooks/useSetLoading";
import { editUser } from "../../utils/userClient";

import NavMid from "../shared/NavMid/NavMid";

import "./settings.css";
import useMobile from "../../hooks/useMobile";

const Settings = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return <MobileSettings />;
  } else {
    return <WebSettings />;
  }
};

const MobileSettings = () => {
  useSetLoading(false);
  return <SettingsForm />;
};

const WebSettings = () => {
  useSetLoading(false);
  return <SettingsForm />;
};

const SettingsForm = () => {
  const { state, dispatch } = useAuth();
  useSetLoading(false);
  const { user } = state;
  const { defaultUnit } = user;
  const [unit, setUnit] = useState(defaultUnit);

  function onChange(e) {
    setUnit(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    editUser(dispatch, null, { defaultUnit: unit });
  }
  return (
    <>
      <NavMid backText={"Settings"} />
      <div className="padding-15">
        <form className="flex-col-cen" onSubmit={onSubmit}>
          Weight unit
          <select value={unit} onChange={onChange}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
          <button
            type="submit"
            disabled={unit === defaultUnit}
            className="theme-btn-filled settings-submit-btn"
          >
            Apply
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
