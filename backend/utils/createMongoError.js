const createErrorObject = require("./createErrorObject");

const createMongoError = error => {
  const { errors } = error;
  let messages = [];

  Object.keys(errors).forEach(error => messages.push(errors[error].message));

  let errorObj = createErrorObject(messages);

  return errorObj;
};

module.exports = createMongoError;
