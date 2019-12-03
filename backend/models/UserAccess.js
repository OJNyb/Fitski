const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserAccess = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "user"
    },
    plans: [
      {
        woPlan: { type: ObjectId, ref: "woPlan" }
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = model("userAccess", UserAccess);
