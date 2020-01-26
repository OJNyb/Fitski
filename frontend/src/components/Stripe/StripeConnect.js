import React, { useState } from "react";

import StripeIcon from "./StripeIcon";
import StripeConnectButton from "./StripeConnectButton";

import "./stripeConnect.css";
import useUser from "../../hooks/useUser";

const StripeConnect = () => {
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  const { reload, setReload } = useUser();
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
      <StripeConnectButton onClick={() => setIsLinkClicked(true)} />
      {isLinkClicked && (
        <div className="color-gray">
          Click{" "}
          <strong className="tc pointer" onClick={() => setReload(reload + 1)}>
            here
          </strong>{" "}
          if the registration was successful to add the price.
        </div>
      )}
    </div>
  );
};

export default StripeConnect;
