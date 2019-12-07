const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PlanTrend = new Schema({
  woPlan: ObjectId,
  date: Number,
  user: ObjectId
});

module.exports = User = model("planTrend", PlanTrend);
