const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { ObjectId } = Schema.Types;

const { hash, compare } = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: String,
    avatar: String,
    password: {
      type: String,
      select: false
    },
    defaultUnit: String,
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExist({ email }),
        message: () => "Email has already been taken."
      }
    },
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExist({ username }),
        message: () => "Username has already been taken."
      }
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

UserSchema.methods.matchesPassword = function(password) {
  return compare(password, this.password);
};

UserSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

const User = model("user", UserSchema);
module.exports = User;
