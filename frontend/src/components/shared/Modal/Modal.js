import React, { lazy, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";

import SetLoading from "../../SetLoading";

import "./modal.css";

const MobileModal = lazy(() => import("./MobileModal"));
const WebModal = lazy(() => import("./WebModal"));

const Modal = props => {
  const isMobile = useMobile();

  let view;
  if (isMobile) {
    view = <MobileModal {...props} />;
  } else {
    view = <WebModal {...props} />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default Modal;
