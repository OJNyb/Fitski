const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserExerciseSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  name: String,
  muscleGroup: String
});

module.exports = Exercise = model("userExercise", UserExerciseSchema);
