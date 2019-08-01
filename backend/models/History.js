const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const HistorySchema = new Schema(
  {
    user: { type: ObjectId },
    woPlan: { type: ObjectId },
    days: [
      {
        date: {
          type: Date
        },
        notes: {
          type: String
        },
        exercises: [
          {
            exercise: { type: ObjectId },
            sets: { type: Number },
            reps: { type: Number },
            rest: { type: Number },
            weight: { type: Number }
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("history", HistorySchema);
