const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const bodyParser = require("body-parser");

// Models
const User = require("../../models/User");
const StripeId = require("../../models/StripeId");
const WOPlan = require("../../models/WOPlan");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

const router = express.Router();

// @route POST api/user/register
// @desc Register for stripeuser
// @access Private
router.post("/register/:code", ensureSignedIn, (req, res, next) => {
  const { params, session } = req;
  const { userId } = session;
  const { code } = params;

  stripe.oauth
    .token({
      grant_type: "authorization_code",
      code
    })
    .then(async response => {
      const { error_description, stripe_user_id } = response;
      if (error_description) {
        return res.status(404).json(createErrorObject([error_description]));
      }
      // const newStripeId = new StripeId({
      //   user: userId,
      //   stripeId: stripe_user_id
      // });

      try {
        let user = await User.findById(userId);
        user.stripeId = stripe_user_id;
        user.save();
        // newStripeId.save();
      } catch (e) {
        return next(e);
      } finally {
        res.status(200).json({ message: "success" });
      }
    })
    .catch(next);
});

// @route POST api/user/register
// @desc Make payment
// @access Private
router.post("/payment/:plan_id", ensureSignedIn, async (req, res, next) => {
  const { params, session } = req;
  const { userId } = session;
  const { plan_id: planId } = params;

  WOPlan.findById(planId)
    .populate("user")
    .then(async plan => {
      if (!plan) {
        return res
          .status(404)
          .json(createErrorObject(["No Workout Plan with this ID"]));
      }

      const { user, price, access } = plan;
      const { stripeId } = user;

      if (access !== "paywall") {
        return res
          .status(409)
          .json(createErrorObject(["You can not purchase this plan"]));
      }

      if (!price || price < 100) {
        return res
          .status(409)
          .json(createErrorObject(["You can not purchase this plan"]));
      }

      if (!stripeId) {
        return res
          .status(409)
          .json(createErrorObject(["This user can not accept payments"]));
      }

      let currency = "usd";
      let amount = price;

      stripe.paymentIntents
        .create({
          amount,
          currency,
          transfer_data: {
            destination: stripeId
          },
          application_fee_amount: amount / 10 + 59,
          metadata: {
            planId,
            userId
          }
        })
        .then(paymentIntent => {
          console.log(paymentIntent);
          return res.json({});
        });
    });
  // Check if access === 'paywall'
  // get price
  // create payment intent
  // give client id
  // do shiz on frontend
  // hook on success
  //

  try {
    let user = await User.findById(userId);
    user.isMerchant = true;
    user.save();
    newStripeId.save();
  } catch (e) {
    return next(e);
  } finally {
    res.status(200).json({ message: "success" });
  }
});

// @route POST api/stripe/webhook
// @desc Payment webhook
// @access Private
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    let event;

    try {
      event = JSON.parse(request.body);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(paymentIntent);
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        // Unexpected event type
        return response.status(400).end();
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

module.exports = router;
