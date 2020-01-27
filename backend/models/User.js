const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { hash, compare } = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: String,
    avatar: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    stripeId: String,
    bio: String,
    password: {
      type: String,
      select: false
    },
    defaultUnit: {
      type: String,
      default: "kg"
    },
    email: {
      type: String
    },
    username: {
      type: String
    },
    activeWOPlan: {
      woPlan: {
        type: ObjectId,
        ref: "woPlan"
      },
      startDate: Date,
      endDate: Date
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

UserSchema.pre("save", async function(next) {
  if (this.isModified("email")) {
    const { email } = this;
    let doesntExist = await User.doesntExist({ email });
    if (!doesntExist) {
      return next({
        name: "preSaveError",
        error: "Email has already been taken."
      });
    }
    next();
  }
});

UserSchema.pre("save", async function(next) {
  if (this.isModified("username")) {
    const { username } = this;
    let doesntExist = await User.doesntExist({ username });
    if (!doesntExist) {
      return next({
        name: "preSaveError",
        error: "Username has already been taken."
      });
    }
    next();
  }
});

UserSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

UserSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.index({ username: "text" });

const User = model("user", UserSchema);
module.exports = User;
