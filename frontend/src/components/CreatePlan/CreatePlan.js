import React, { lazy, useState, Suspense } from "react";
import { Redirect } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import useTitle from "../../hooks/useTitle";

import SetLoading from "../SetLoading";

import "./createPlan.css";

const WebView = lazy(() => import("./WebCreatePlan"));
const MobileView = lazy(() => import("./MobileCreatePlan"));

const CreatePlan = () => {
  const [redir, setRedir] = useState(false);
  const isMobile = useMobile();
  useTitle("Chadify - Create Plan");
  let view;
  if (isMobile) {
    view = <MobileView setRedir={setRedir} />;
  } else {
    view = <WebView setRedir={setRedir} />;
  }

  if (redir) {
    return <Redirect to={`plans/${redir}`} />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default CreatePlan;
