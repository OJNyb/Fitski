const Joi = require("joi");

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
const password = Joi.string()
  .regex(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/, { invert: true })
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
    email,
    username,
    defaultUnit: Joi.string()
      .min(0)
      .max(30),
    password,
    confirmPassword
  })
  .or("name", "defaultUnit", "email", "username", "password")
  .and("password", "confirmPassword")
  .options({
    language: {
      object: {
        and: "You must provide both password and confirm password"
      }
    }
  });

module.exports = {
  "post/user/login": signIn,
  "post/user/register": signUp,
  "post/user/edit": editUser
};
