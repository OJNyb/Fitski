import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import { MainTile } from "../shared/Layout";
import { Link } from "react-router-dom";

import "./stripe.css";

const StripeSuccess = () => {
  useSetLoading(false);

  const urlParams = new URLSearchParams(window.location.search);
  const plan_id = urlParams.get("plan_id");

  return (
    <MainTile>
      <div className="pt-50 flex-col-cen">
        <p>Payment was cancelled.</p>
        <Link
          to={`/plans/${plan_id}`}
          className="theme-btn-filled stripe-cancel-btn"
        >
          Return to plan
        </Link>
        <Link
          to={`/checkout/${plan_id}`}
          className="theme-btn-filled stripe-cancel-btn"
        >
          Retry payment
        </Link>
      </div>
    </MainTile>
  );
};

export default StripeSuccess;
