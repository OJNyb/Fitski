const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const HistorySchema = new Schema(
  {
    user: ObjectId,
    days: [
      {
        date: Number,
        notes: String,
        woPlan: ObjectId,
        exercises: [
          {
            _id: ObjectId,
            exercise: ObjectId,
            sets: Number,
            reps: Number,
            weight: Number,
            unit: String
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("history", HistorySchema);
