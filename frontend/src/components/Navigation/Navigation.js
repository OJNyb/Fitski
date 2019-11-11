import React, { lazy, Suspense } from "react";
import "./navigation.css";
import useMobile from "../../hooks/useMobile";
import SetLoading from "../SetLoading";

const MobileNavigation = lazy(() => import("./MobileNavigation"));
const BigScreenNavigation = lazy(() => import("./BigScreenNavigation"));

const Navigation = () => {
  const isMobile = useMobile();

  let view;
  if (isMobile) {
    view = <MobileNavigation />;
  } else {
    view = <BigScreenNavigation />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default Navigation;
