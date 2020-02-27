import React, { useState, useEffect, useContext } from "react";
import useSetLoading from "../../../hooks/useSetLoading";
import { NavContext } from "../../../context/navContext";

import NavMid from "../../shared/NavMid/NavMid";
import SettingsView from "../SettingsView";

import { MainContainer, MainTile } from "../../shared/Layout";

import "./mobileSettings.css";
import { SHOW_DEHAZE, SHOW_NONE } from "../../../types/navTypes";

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

  return (
    <MainContainer>
      <MainTile>
        {selected ? (
          <div className="height-50 width-100p padding-0-5 flex-ai-center bc-a6 fixed">
            <button className="color-white padding-5" onClick={hideView}>
              <i className="material-icons">arrow_back</i>
            </button>
            <span className="color-white font-18 ml-5">{selected}</span>
          </div>
        ) : (
          <NavMid backText={"Settings"} />
        )}
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
