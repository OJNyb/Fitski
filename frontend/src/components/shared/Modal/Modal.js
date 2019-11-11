import React, { lazy, Suspense } from "react";
import useMobile from "../../../hooks/useMobile";

import SetLoading from "../../SetLoading";

import "./modal.css";

const MobileModal = lazy(() => import("./MobileModal"));
const BigViewModal = lazy(() => import("./BigViewModal"));

const Modal = props => {
  const isMobile = useMobile();

  let view;
  if (isMobile) {
    view = <MobileModal {...props} />;
  } else {
    view = <BigViewModal {...props} />;
  }

  return <Suspense fallback={<SetLoading />}>{view}</Suspense>;
};

export default Modal;
