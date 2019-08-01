const user = require("./user");
const woPlan = require("./woPlan");
const history = {}; //  require("./history");

module.exports = {
  ...user,
  ...woPlan,
  ...history
};
