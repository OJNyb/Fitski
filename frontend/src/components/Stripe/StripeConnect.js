import React from "react";

import StripeIcon from "./StripeIcon";
import StripeConnectButton from "./StripeConnectButton";

import "./stripeConnect.css";

const StripeConnect = () => {
  return (
    <div className="flex-col-cen pb-50">
      <div className="stripe-information">
        <p>
          We use Stripe to make sure you get paid on time and to keep your
          personal bank and details secure. Click{" "}
          <strong>Connect with Stripe</strong> to set up your payments on
          Stripe.
        </p>
        <div className="stripe-icon-container">
          <StripeIcon />
        </div>
      </div>
      <StripeConnectButton />
    </div>
  );
};

export default StripeConnect;
