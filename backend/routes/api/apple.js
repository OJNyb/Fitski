const express = require("express");

const router = express.Router();

// @route GET
// @desc Apple Pay Verification file
// @access Public

router.post(
  "/.well-known/apple-developer-merchantid-domain-association",
  (req, res, next) => {
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
  }
);

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "nok"
  });
})();

module.exports = router;
