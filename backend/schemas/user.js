const Joi = require("./joi");

const planId = Joi.string()
  .objectId()
  .required()
  .label("Workout plan ID");

const email = Joi.string()
  .email()
  .label("Email");

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .label("Username");

const name = Joi.string()
  .max(30)
  .label("Name");

const bio = Joi.string()
  .allow("")
  .max(160)
  .label("Bio");

const password = Joi.string()
  .regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/, { invert: true })
  .max(10000)
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          invert: {
            base:
              "must be minimum eight characters, have at least one letter and one number."
          }
        }
      }
    }
  });

const confirmPassword = Joi.valid(Joi.ref("password")).label(
  "Confirm password"
);

const signUp = Joi.object().keys({
  name,
  email: email.required(),
  username: username.required(),
  password: password.required(),
  confirmPassword: confirmPassword.required()
});

const signIn = Joi.object().keys({
  email: email.required(),
  password: password.required()
});

const editUser = Joi.object()
  .keys({
    name,
    username,
    defaultUnit: Joi.string()
      .min(0)
      .max(3)
      .label("defaultUnit"),
    bio
  })
  .or("name", "defaultUnit", "username", "bio");

const forgotPassword = Joi.object().keys({
  email: email.required()
});

const resetPassword = Joi.object().keys({
  token: Joi.string(),
  password: password.required(),
  confirmPassword: confirmPassword.required()
});

const setPassword = Joi.object().keys({
  oldPassword: Joi.string(),
  newPassword: password.required()
});

const editEmail = Joi.object().keys({
  password: password.required(),
  email: email.required()
});

const addPlan = Joi.object().keys({
  plan_id: planId
});

const removePlan = Joi.object().keys({
  plan_id: planId
});

module.exports = {
  "post/user/login": signIn,
  "post/user/register": signUp,
  "post/user/edit": editUser,
  "post/user/edit/email": editEmail,
  "post/user/forgot": forgotPassword,
  "post/user/password/set": setPassword,
  "post/user/reset/:token": resetPassword,
  "post/user/access/:plan_id": addPlan,
  "delete/user/access/:plan_id": removePlan
};
