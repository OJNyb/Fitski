const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PlanAccess = new Schema(
  {
    woPlan: ObjectId,
    whitelist: [
      {
        user: { type: ObjectId, ref: "user" }
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = model("planAccess", PlanAccess);
