import React, { lazy, useState, Suspense } from "react";
import { useAuth } from "../../context/authContext";
import { editUser } from "../../utils/userClient";

import "./settings.css";
import useMobile from "../../hooks/useMobile";

const MobileSettings = lazy(() => import("./Mobile/MobileSettings"));
const WebSettings = lazy(() => import("./Web/WebSettings"));

const Settings = () => {
  const isMobile = useMobile();
  const { state, dispatch } = useAuth();

  const { user } = state;
  const { defaultUnit, email } = user;
  const [unit, setUnit] = useState(defaultUnit);

  function handleUnitChange(e) {
    const { value } = e.target;
    setUnit(value);
    editUser(dispatch, null, { defaultUnit: value });
  }

  let view;

  if (isMobile) {
    view = (
      <MobileSettings
        unit={unit}
        email={email}
        onUnitChange={handleUnitChange}
      />
    );
  } else {
    view = (
      <WebSettings unit={unit} email={email} onUnitChange={handleUnitChange} />
    );
  }

  return <Suspense fallback={null}>{view}</Suspense>;
};

export default Settings;
