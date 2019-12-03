const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const _id = {
  type: ObjectId,
  required: true
};

// access = owner/all/private

const WOPlanSchema = new Schema(
  {
    _id,
    name: String,
    difficulty: String,
    description: String,
    user: {
      type: ObjectId,
      ref: "user"
    },
    goal: String,
    access: {
      type: String,
      default: "owner"
    },
    weeks: [
      {
        _id,
        days: [
          {
            _id,
            exercises: [
              {
                _id,
                exercise: {
                  type: ObjectId,
                  refPath: "weeks.days.exercises.onModel"
                },
                onModel: {
                  type: String,
                  enum: ["exercise", "userExercise"]
                },
                sets: [
                  {
                    _id,
                    reps: Number
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

WOPlanSchema.methods.isOwner = function(userId) {
  return userId === this.user.toString();
};

WOPlanSchema.index({ name: "text", goal: "text", description: "text" });

const WOPlan = model("woPlan", WOPlanSchema);

module.exports = WOPlan;
