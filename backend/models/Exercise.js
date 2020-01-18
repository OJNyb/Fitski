const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ExerciseSchema = new Schema({
  name: { type: String },
  muscleGroup: { type: ObjectId, ref: "muscleGroup" }
});

module.exports = Exercise = model("exercise", ExerciseSchema);
