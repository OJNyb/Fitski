const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

// access = owner/all/private

const WOPlanSchema = new Schema(
  {
    _id: ObjectId,
    name: String,
    difficulty: String,
    description: String,
    user: {
      type: ObjectId,
      ref: "user"
    },
    goals: Array,
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
            exercises: [
              {
                _id: ObjectId,
                exercise: { type: ObjectId, ref: "exercise" },
                sets: [
                  {
                    _id: ObjectId,
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

const WOPlan = model("woPlan", WOPlanSchema);

module.exports = WOPlan;
