import React, { useState } from "react";
import useSetLoading from "../../../hooks/useSetLoading";

import SettingsView from "../SettingsView";
import { MainTile, MainTileNav } from "../../shared/Layout";

import "../settings.css";

const WebSettings = ({ unit, email, onUnitChange }) => {
  useSetLoading(false);
  const [selected, setSelected] = useState(null);

  function hideView() {
    setSelected(null);
  }

  return (
    <MainTile>
      <MainTileNav>
        <div className="main-tile-header-upper">
          <div className="flex-ai-center">
            {selected && (
              <button
                className="theme-btn-no-border padding-0 mr-5"
                onClick={() => setSelected(null)}
              >
                <i className="material-icons-round font-20">arrow_back</i>
              </button>
            )}
            <span className="mt-1">{selected || "Settings"}</span>
          </div>
        </div>
      </MainTileNav>

      <SettingsView
        selected={selected}
        hideView={hideView}
        unit={unit}
        email={email}
        onUnitChange={onUnitChange}
        setSelected={setSelected}
      />
    </MainTile>
  );
};

export default WebSettings;
