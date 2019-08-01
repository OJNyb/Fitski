const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const WOPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    user: {
      type: ObjectId,
      ref: "user"
    },
    description: {
      type: String
    },
    categories: [
      {
        category: { type: ObjectId }
      }
    ],
    weeks: [
      {
        week: { type: Number },
        repeat: {
          type: Number
        },
        days: [
          {
            restDay: {
              type: Boolean,
              default: false
            },
            muscleGroup: { type: String },
            exercises: [
              {
                exercise: { type: ObjectId },
                sets: { type: Number },
                reps: { type: Number },
                rest: { type: Number }
              }
            ]
          }
        ]
      }
    ]
  },
  { timestamps: true }
);

WOPlanSchema.pre("save", async function() {
  console.log(this);
});

const WOPlan = mongoose.model("woPlan", WOPlanSchema);

module.exports = WOPlan;
