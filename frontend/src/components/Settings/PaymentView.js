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
      Go to your Stripe Dashboard to view details. If you have any questions
      email us at payment@chadify.me We take a 10% fee + 59¢ for each plan sold.
    </div>
  );
};

export default StripeView;
