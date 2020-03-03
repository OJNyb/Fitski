import React from "react";
import useSetLoading from "../../hooks/useSetLoading";
import { MainTile } from "../shared/Layout";
import { Link } from "react-router-dom";

const StripeSuccess = () => {
  useSetLoading(false);

  const urlParams = new URLSearchParams(window.location.search);
  const plan_id = urlParams.get("plan_id");

  return (
    <MainTile>
      <div className="pt-50 flex-center">
        <p>Payment was successful.</p>
        <Link to={`/plans/${plan_id}`} className="tc m-l-3">
          Go to plan
        </Link>
      </div>
    </MainTile>
  );
};

export default StripeSuccess;
