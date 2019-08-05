import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import AppProviders from "./context";

render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
