const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String },
  muscleGroup: { type: String }, // Array? Multiple body parts
  type: { type: String }
});

module.exports = Exercise = mongoose.model("exercise", ExerciseSchema);
