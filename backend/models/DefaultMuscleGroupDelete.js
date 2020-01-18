const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const DefaultMuscleGroupDeleteSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  muscleGroups: [
    {
      muscleGroup: {
        type: ObjectId,
        ref: "muscleGroup"
      }
    }
  ]
});

module.exports = DefaultMuscleGroupDelete = model(
  "defaultMuscleGroupDelete",
  DefaultMuscleGroupDeleteSchema
);
