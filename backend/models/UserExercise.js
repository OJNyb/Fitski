const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserExerciseSchema = new Schema({
  _id: ObjectId,
  user: { type: ObjectId, ref: "user" },
  name: String,
  muscleGroup: String,
  custom: {
    type: Boolean,
    default: true
  },
  isDeleted: Boolean
});

module.exports = Exercise = model("userExercise", UserExerciseSchema);
