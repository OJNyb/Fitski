const Joi = require("./joi");

module.exports = Joi.string()
  .objectId()
  .label("Object ID");

// module.exports = Joi.object().keys({
//   id: Joi.string()
//     .objectId()
//     .label("Object ID")
// });
