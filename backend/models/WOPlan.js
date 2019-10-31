const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// access = owner/all/private

const WOPlanSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    name: String,
    difficulty: String,
    description: String,
    user: {
      type: ObjectId,
      ref: "user"
    },
    goals: [
      {
        goal: ObjectId
      }
    ],
    access: {
      type: String,
      default: "owner"
    },
    weeks: [
      {
        _id: ObjectId,
        repeat: {
          type: Number,
          default: 0
        },
        restWeek: {
          type: Boolean,
          default: false
        },
        days: [
          {
            _id: ObjectId,
            restDay: {
              type: Boolean,
              default: false
            },
            muscleGroup: Array,
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
