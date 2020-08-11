import React from "react";
import { useUser } from "../../context/userContext";
import StripeConnect from "../Stripe/StripeConnect";

const StripeView = () => {
  const { stripeId } = useUser();

  if (!stripeId) {
    return (
      <div className="padding-10">
        <StripeConnect />
        {/* <p className="color-gray text-center">
          We take a 10% fee + $0.25 USD for each plan sold.
        </p> */}
      </div>
    );
  }

  return (
    <div>
      <ul>
        <li>Go to your Stripe Dashboard to view details.</li>
        <li>If you have any questions email us at payment@chadify.me</li>
        <li>We take a 10% fee + $0.25 for each plan sold.</li>
      </ul>
    </div>
  );
};

export default StripeView;
