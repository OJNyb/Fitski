import React from "react";
import { useUser } from "../../context/userContext";

const ConnectToStripeButton = () => {
  const { email } = useUser();

  const uniqueId = "secret";
  const clientId = "ca_GbJab9cP8cKD92X9M9hjDdiCwlG0HAxz";

  // ("https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://connect.stripe.com/connect/default/oauth/test&client_id=ca_GbJab9cP8cKD92X9M9hjDdiCwlG0HAxz&state={STATE_VALUE}");

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://fitnut.herokuapp.com/stripe/register&client_id=${clientId}&state=${uniqueId}&stripe_user[email]=${email}`}
    >
      <img
        src="/api/image/resources/stripeconnect.png"
        alt="Connect to Stripe"
      />
    </a>
  );
};

export default ConnectToStripeButton;
