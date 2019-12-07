import React, { lazy, Suspense } from "react";
import useMobile from "../../hooks/useMobile";

import SetLoading from "../SetLoading";

import "./noauth.css";

const MobileLanding = lazy(() => import("./MobileLanding"));
const WebLanding = lazy(() => import("./WebLanding"));

const Landing = () => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Suspense fallback={<SetLoading />}>
        <MobileLanding />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<SetLoading />}>
        <WebLanding />
      </Suspense>
    );
  }
};

export default Landing;
