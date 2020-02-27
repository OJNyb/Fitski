const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserExerciseSchema = new Schema({
  _id: ObjectId,
  user: { type: ObjectId, ref: "user" },
  name: String,
  muscleGroup: { type: ObjectId, ref: "muscleGroup" },
  unit: { type: String, default: "w+r" },
  custom: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = Exercise = model("userExercise", UserExerciseSchema);
