const Joi = require("./joi");

module.exports = Joi.string()
  .objectId()
  .label("Object ID");
