const Joi = require("./joi");

const _id = Joi.string()
  .objectId()
  .required()
  .label("ID");

const planId = _id.label("Workout plan ID");

const createPaymentIntent = Joi.object().keys({
  plan_id: planId
});

module.exports = {
  "post/stripe/payment/:plan_id": createPaymentIntent
};
