import React from "react";
import { Elements } from "react-stripe-elements";
import { StripeProvider } from "react-stripe-elements";
import InjectedCheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <StripeProvider apiKey="pk_test_wPnRpZ9w4Zl9pWkt2Wrh9KuH00tDuuNg0W">
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default Checkout;
