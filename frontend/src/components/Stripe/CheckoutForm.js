import React from "react";
import { injectStripe } from "react-stripe-elements";

//import AddressSection from "./AddressSection";
import CardSection from "./CardSection";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    const paymentRequest = props.stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Demo total",
        amount: 1000
      }
    });

    paymentRequest.on("token", ({ complete, token, ...data }) => {
      console.log("Received Stripe token: ", token);
      console.log("Received customer information: ", data);
      complete("success");
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({ canMakePayment: !!result });
    });

    this.state = {
      canMakePayment: false,
      paymentRequest
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // becase only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = this.props.elements.getElement("card");

    // From here we cal call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    this.props.stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name: "Jenny Rosen" }
      })
      .then(({ paymentMethod }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
      });

    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    this.props.stripe.confirmCardPayment("{PAYMENT_INTENT_CLIENT_SECRET}", {
      payment_method: {
        card: cardElement
      }
    });

    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    this.props.stripe.confirmCardSetup("{PAYMENT_INTENT_CLIENT_SECRET}", {
      payment_method: {
        card: cardElement
      }
    });

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createToken({ type: "card", name: "Jenny Rosen" });
    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // this.props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    this.props.stripe.createSource({
      type: "card",
      owner: {
        name: "Jenny Rosen"
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
    // this.state.canMakePayment ? (
    //   <PaymentRequestButtonElement
    //     paymentRequest={this.state.paymentRequest}
    //     className="PaymentRequestButton"
    //     style={{
    //       // For more details on how to style the Payment Request Button, see:
    //       // https://stripe.com/docs/elements/payment-request-button#styling-the-element
    //       paymentRequestButton: {
    //         theme: "light",
    //         height: "64px"
    //       }
    //     }}
    //   />
    // ) : (
  }
}

export default injectStripe(CheckoutForm);
