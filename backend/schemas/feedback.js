const Joi = require("./joi");

// TODO: Add optional to categories and description, on edit ???

// AD

const errorFeedback = Joi.object().keys({
  err: Joi.object()
});

module.exports = {
  "post/feedback/history/error": errorFeedback,
  "post/feedback/plan/error": errorFeedback
};
