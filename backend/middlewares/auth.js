const createErrorObject = require("../utils/createErrorObject");

const ensureSignedInError = createErrorObject([
  "You need to be authenticated to perform this action"
]);

const ensureSignedOutError = createErrorObject(["Already logged in."]);

const ensureSignedIn = (req, res, next) => {
  const { session } = req;

  if (!session || !session.userId) {
    return res.status(403).json(ensureSignedInError);
  }
  next();
};

const ensureSignedOut = (req, res, next) => {
  const { session } = req;
  if (session && session.userId) {
    return res.status(400).json(ensureSignedOutError);
  }
  next();
};

module.exports = { ensureSignedIn, ensureSignedOut };
