const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const sendMail = require("../../helpers/sendMail");

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Models
const User = require("../../models/User");
const WOPlan = require("../../models/WOPlan");
const PlanAccess = require("../../models/PlanAccess");

// Validation
const { ensureSignedIn } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

// @route POST api/stripe/register/:code
// @desc Register for stripe user
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

      try {
        let user = await User.findById(userId);
        user.stripeId = stripe_user_id;
        user.save();
      } catch (e) {
        return next(e);
      } finally {
        res.status(200).json({ message: "success" });
      }
    })
    .catch(next);
});

// // @route POST api/stripe/payment/:plan_id
// // @desc Create payment intent
// // @access Private
// router.post(
//   "/payment/:plan_id",
//   ensureSignedIn,
//   validateRequest,
//   async (req, res, next) => {
//     const { params, session } = req;
//     const { userId } = session;
//     const { plan_id: planId } = params;

//     WOPlan.findById(planId)
//       .populate("user")
//       .then(async plan => {
//         if (!plan) {
//           return res
//             .status(404)
//             .json(createErrorObject(["No Workout Plan with this ID"]));
//         }

//         const { user, price, access } = plan;
//         const { stripeId } = user;

//         const customer = await User.findById(userId);

//         if (access !== "paywall") {
//           return res
//             .status(409)
//             .json(createErrorObject(["You can not purchase this plan"]));
//         }

//         if (!price || price < 1) {
//           return res
//             .status(409)
//             .json(createErrorObject(["You can not purchase this plan"]));
//         }

//         if (!stripeId) {
//           return res
//             .status(409)
//             .json(createErrorObject(["This user can not accept payments"]));
//         }

//         console.log(price);

//         let currency = "usd";
//         let amount = price * 100;

//         stripe.paymentIntents
//           .create({
//             amount,
//             currency,
//             transfer_data: {
//               destination: stripeId
//             },
//             application_fee_amount: amount / 10 + 59,
//             metadata: {
//               planId,
//               userId
//             },
//             receipt_email: customer.email
//           })
//           .then(paymentIntent => {
//             const { client_secret } = paymentIntent;
//             return res.json({ message: "success", client_secret });
//           });
//       });
//   }
// );

// @route POST api/stripe/payment/:plan_id
// @desc Create checkout session
// @access Private
router.post(
  "/payment/:plan_id",
  ensureSignedIn,
  validateRequest,
  async (req, res, next) => {
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

        const { user, price, access, name, goal } = plan;
        const { stripeId, _id: authorId } = user;

        const customer = await User.findById(userId);
        const planAccess = await PlanAccess.findOne({ woPlan: planId });

        if (
          planAccess.whitelist.map(x => x._id.toString).indexOf(userId) > -1 ||
          userId === authorId.toString()
        ) {
          return res
            .status(404)
            .json(createErrorObject(["You already have access to this plan"]));
        }

        if (access !== "paywall" || !stripeId) {
          return res
            .status(409)
            .json(createErrorObject(["You can not purchase this plan"]));
        }

        let currency = "usd";
        let amount = price * 100;

        stripe.checkout.sessions
          .create({
            payment_method_types: ["card"],
            line_items: [
              {
                name,
                description: goal,
                amount,
                currency,
                quantity: 1
              }
            ],
            payment_intent_data: {
              application_fee_amount: amount / 10 + 59,
              transfer_data: {
                destination: stripeId
              }
            },
            success_url: `https://fitnut.herokuapp.com/stripe/success?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
            cancel_url: `https://fitnut.herokuapp.com/stripe/cancel?plan_id=${planId}`,
            customer_email: customer.email,
            metadata: {
              planId,
              userId
            }
          })
          .then(checkoutSession => {
            const { id } = checkoutSession;
            return res.json({ message: "success", sessionId: id });
          })
          .catch(next);
      });
  }
);

// @route POST api/stripe/webhook
// @desc Stripe webhook
// @access Private
router.post("/webhook", async (req, res, next) => {
  const sig = request.headers["stripe-signature"];
  const { body } = req;
  let event = null;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    res.status(400).end();
    return;
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const { metadata } = event.data.object;

      const { planId, userId } = metadata;

      try {
        let pa = await PlanAccess.findOne({ woPlan: planId });
        let ua = await UserAccess.findOne({ user: userId });

        if (pa) {
          pa.whitelist.push({ user: userId });
          pa.save();
        }
        if (ua) {
          ua.plans.push({ woPlan: planId });
          ua.save();
        }
      } catch (err) {
        next(err);
      }
      break;
    }

    case "payment_method.attached":
      console.log(event);
      console.log("PaymentMethod was attached to a Customer!");
      break;
    case "payout.failed": {
      const { account } = event;

      const user = await User.findOne({ stripeId: account });
      if (!user) next();
      sendMail(
        user.email,
        "Chadify - Payout failed",
        "Please review your Stripe account and make sure you eligible to recieve money. Send us an email when you have done so at payment@chadify.me"
      );

      break;
    }

    case "account.application.deauthorized":
      {
        const { account } = event;
        const user = await User.findOne({ stripeId: account });
        if (user) {
          delete user.stripeId;

          user
            .save()
            .then(() => {
              sendMail(
                user.email,
                "Chadify deauthorized",
                "This is a confirmation that you have deauthorized Chadify.me to accept payments on your behalf."
              ).catch(next);
            })
            .catch(next);
        }
      }

      // Send an email and tell them their account has been deauthorized

      break;

    // When user disabled by other means (fraud detected etc)
    default:
      // Unexpected event type
      return res.status(400).end();
  }

  // Return a 200 res to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;
