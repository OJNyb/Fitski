const Joi = require("./joi");

const updateAvatar = Joi.object().keys({
  avatar: Joi.string()
    .dataUri()
    .regex(/^data:image\/png;base64/)
    .label("Avatar")
});

module.exports = {
  "post/image/avatar": updateAvatar
};
