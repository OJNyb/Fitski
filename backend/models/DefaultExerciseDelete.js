const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const DefaultExerciseDeleteSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  exercises: [
    {
      exercise: {
        type: ObjectId,
        ref: "exercise"
      }
    }
  ]
});

module.exports = DefaultExerciseDelete = model(
  "defaultExerciseDelete",
  DefaultExerciseDeleteSchema
);
