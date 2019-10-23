const mongoose = require("mongoose");
const { Schema } = mongoose;
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

module.exports = User = mongoose.model("planAccess", PlanAccess);
