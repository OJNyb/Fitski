const user = require("./user");
const woPlan = require("./woPlan");
const history = require("./history");
const exercise = require("./exercise");
const image = require("./image");

module.exports = {
  ...user,
  ...image,
  ...woPlan,
  ...history,
  ...exercise
};
