const user = require("./user");
const woPlan = require("./woPlan");
const history = require("./history");
const exercise = require("./exercise");

module.exports = {
  ...user,
  ...woPlan,
  ...history,
  ...exercise
};
