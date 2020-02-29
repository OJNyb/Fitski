import React, { useState, useEffect, useContext } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { NavContext } from "../../../context/navContext";

import SettingsView from "../SettingsView";

import { MainContainer, MainTile } from "../../shared/Layout";

import "./mobileSettings.css";
import { SHOW_DEHAZE, SHOW_NONE } from "../../../types/navTypes";
import useSetNav from "../../../hooks/useSetNav";

const MobileSettings = ({ unit, email, onUnitChange }) => {
  useSetLoading(false);
  const [selected, setSelected] = useState(null);
  const { dispatch } = useContext(NavContext);

  useEffect(() => {
    if (selected) {
      dispatch({ type: SHOW_NONE });
    } else {
      dispatch({ type: SHOW_DEHAZE });
    }
  }, [selected, dispatch]);

  function hideView() {
    setSelected(null);
  }

  useSetNav({
    showDehaze: selected ? false : true,
    onBackClick: hideView,
    text: selected ? selected : "Settings"
  });

  return (
    <MainContainer>
      <MainTile>
        <div>
          <SettingsView
            selected={selected}
            hideView={hideView}
            unit={unit}
            email={email}
            onUnitChange={onUnitChange}
            setSelected={setSelected}
          />
        </div>
      </MainTile>
    </MainContainer>
  );
};

export default MobileSettings;
