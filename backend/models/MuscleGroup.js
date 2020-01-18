const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MuscleGroupSchema = new Schema({
  _id: ObjectId,
  name: { type: String },
  color: { type: String },
  user: {
    type: ObjectId,
    ref: "user"
  },
  custom: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = MuscleGroup = model("muscleGroup", MuscleGroupSchema);
