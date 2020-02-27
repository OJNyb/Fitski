const Joi = require("./joi");

const errorFeedback = Joi.object().keys({
  err: Joi.object()
});

module.exports = {
  "post/feedback/history/error": errorFeedback,
  "post/feedback/plan/error": errorFeedback
};
