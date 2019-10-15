const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const _id = { type: ObjectId, required: true };

const HistorySchema = new Schema(
  {
    user: ObjectId,
    days: [
      {
        _id,
        date: Number,
        notes: String,
        woPlan: ObjectId,
        muscleGroup: Array,
        exercises: [
          {
            _id,
            exercise: { type: ObjectId, ref: "exercise" },
            sets: [
              {
                _id,
                reps: Number,
                weight: Number,
                unit: String
              }
            ]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("history", HistorySchema);
