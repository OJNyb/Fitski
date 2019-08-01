const _ = require("lodash");
const Joi = require("joi");
const Schemas = require("../schemas");

module.exports = (useJoiError = false) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to false
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

  // enabled HTTP methods for request data validation

  // Joi validation options
  const _validationOptions = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true // remove unknown keys from the validated data
  };

  // return the validation middleware
  return (req, res, next) => {
    let { body, params, route, method, baseUrl } = req;
    const { path } = route;
    method = method.toLowerCase();

    let pathKey = method + "/" + baseUrl.split("/")[2];

    if (path.length > 1) {
      pathKey += path;
    }

    if (_.has(Schemas, pathKey)) {
      // get schema for the current route
      const _schema = _.get(Schemas, pathKey);

      if (_schema) {
        // Validate req.body using the schema and validation options
        return Joi.validate(
          { ...body, ...params },
          _schema,
          _validationOptions,
          (err, data) => {
            if (err) {
              // Joi Error
              const JoiError = {
                status: "failed",
                isJoi: true,
                error: {
                  // fetch only message and type from each error
                  details: _.map(err.details, ({ message, type }) => ({
                    message: message.replace(/['"]/g, ""),
                    type
                  }))
                }
              };

              // Custom Error
              const CustomError = {
                status: "failed",
                error:
                  "Invalid request data. Please review request and try again."
              };

              // Send back the JSON error response
              res.status(422).json(_useJoiError ? JoiError : CustomError);
            } else {
              // Replace req.body with the data after Joi validation
              body = _.pick(data, _.keys(body));
              next();
            }
          }
        );
      }
    } else {
      console.log("This path has validation but not:", pathKey);
    }

    next();
  };
};
