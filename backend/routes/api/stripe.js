const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

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

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        transfer_data: {
          destination: stripeId
        }
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

module.exports = router;
