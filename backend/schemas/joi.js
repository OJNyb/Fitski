const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = {
  name: "string",
  base: Joi.string(),
  language: {
    objectId: "must be a valid Object ID"
  },
  rules: [
    {
      name: "objectId",
      validate(_params, value, state, options) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return this.createError("string.objectId", {}, state, options);
        }
        return value;
      }
    }
  ]
};

module.exports = Joi.extend(objectId);
