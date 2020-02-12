const user = require("./user");
const image = require("./image");
const woPlan = require("./woPlan");
const history = require("./history");
const explore = require("./explore");
const exercise = require("./exercise");
const stripe = require("./stripe");
const feedback = require("./feedback");

module.exports = {
  ...user,
  ...image,
  ...stripe,
  ...woPlan,
  ...explore,
  ...history,
  ...exercise,
  ...feedback
};
