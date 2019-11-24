import React, { lazy, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";
import SetLoading from "../../SetLoading";

const MobileNavMid = lazy(() => import("./MobileNavMid"));
const WebNavMid = lazy(() => import("./WebNavMid"));

const NavMid = props => {
  const isMobile = useMobile();

  let view;

  if (isMobile) {
    view = <MobileNavMid {...props} />;
  } else {
    view = <WebNavMid {...props} />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default NavMid;
