const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const StripeIdSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  stripeId: String
});

module.exports = StripeId = model("stripeId", StripeIdSchema);
