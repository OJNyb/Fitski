const Joi = require("joi");

const skip = Joi.number();
const search = Joi.string()
  .required()
  .label("Search");

const trending = Joi.object().keys({
  skip,
  goal: Joi.string().allow(""),
  length: Joi.array()
    .length(2)
    .items(Joi.number())
});

const searchUser = Joi.object().keys({
  skip,
  username: search
});

const searchPlan = Joi.object().keys({
  skip,
  search: search
});

module.exports = {
  "get/explore/trending": trending,
  "get/explore/search": searchPlan,
  "get/explore/users/search": searchUser
};
