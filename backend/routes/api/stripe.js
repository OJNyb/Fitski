const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// Models
const User = require("../../models/User");
const StripeId = require("../../models/StripeId");

// Validation
const { ensureSignedIn, ensureSignedOut } = require("../../middlewares/auth");
const SchemaValidator = require("../../middlewares/SchemaValidator");
const validateRequest = SchemaValidator(true);

const createErrorObject = require("../../utils/createErrorObject");

const router = express.Router();

// @route POST api/user/register
// @desc Register user
// @access Public
// TODO: Avatar

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
      const newStripeId = new StripeId({
        user: userId,
        stripeId: stripe_user_id
      });

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
    })
    .catch(next);
});

module.exports = router;
