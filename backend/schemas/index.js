const user = require("./user");
const image = require("./image");
const woPlan = require("./woPlan");
const history = require("./history");
const explore = require("./explore");
const exercise = require("./exercise");

module.exports = {
  ...user,
  ...image,
  ...woPlan,
  ...explore,
  ...history,
  ...exercise
};
