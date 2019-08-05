const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const WOPlanSchema = new mongoose.Schema(
  {
    name: String,
    user: {
      type: ObjectId,
      ref: "user"
    },
    description: String,
    categories: [
      {
        category: ObjectId
      }
    ],
    weeks: [
      {
        _id: ObjectId,
        week: Number,
        repeat: Number,
        days: [
          {
            restDay: {
              type: Boolean,
              default: false
            },
            muscleGroup: String,
            exercises: [
              {
                _id: ObjectId,
                exercise: { type: ObjectId, ref: "exercise" },
                sets: Number,
                reps: Number,
                rest: Number
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

const WOPlan = mongoose.model("woPlan", WOPlanSchema);

module.exports = WOPlan;
