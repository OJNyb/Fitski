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
        note: String,
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
                weight: Number,
                rpe: { type: Number, default: 0 },
                note: String
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
