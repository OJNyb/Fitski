const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;
const _id = { type: ObjectId, required: true };

const HistorySchema = new Schema(
  {
    user: { type: ObjectId, ref: "user" },
    days: [
      {
        _id,
        date: Number,
        notes: String,
        woPlan: ObjectId,
        exercises: [
          {
            _id,
            exercise: { type: ObjectId, refPath: "days.exercises.onModel" },
            onModel: {
              type: String
            },
            sets: [
              {
                _id,
                reps: Number,
                weight: Number
              }
            ]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = model("history", HistorySchema);
