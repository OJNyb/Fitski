const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const StripeIdSchema = new Schema({
  userId: { type: ObjectId, ref: "user" },
  stripeId: String
});

module.exports = StripeId = model("stripeId", StripeIdSchema);
