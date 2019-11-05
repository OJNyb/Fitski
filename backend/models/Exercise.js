const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ExerciseSchema = new Schema({
  name: { type: String },
  muscleGroup: { type: String }, // Array? Multiple body parts
  type: { type: String }
});

module.exports = Exercise = model("exercise", ExerciseSchema);
