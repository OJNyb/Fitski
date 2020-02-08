import React from "react";
import { useUser } from "../../context/userContext";
import StripeConnect from "../Stripe/StripeConnect";

const StripeView = () => {
  const { stripeId } = useUser();

  if (!stripeId) {
    return (
      <div className="padding-10">
        <StripeConnect />
      </div>
    );
  }

  return (
    <div>
      Sales, plan name net$ <button>Disconnect Stripe account</button>,
    </div>
  );
};

export default StripeView;
