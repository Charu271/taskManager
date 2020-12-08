const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const task = require("./Tasks");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("Password should not contain 'password'");
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value) {
          if (value < 0) throw new Error("Age should be positive");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});
userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};
// userSchema.methods.getAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "thisisnodejscourse");
//   user.tokens = user.tokens.concat({ token });
//   console.log(user.tokens);
//   await user.save();
//   return token;
// };
userSchema.statics.findByCredentials = async (email, password) => {
  const User = await user.findOne({ email });
  if (!User) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, User.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return User;
};
userSchema.pre("remove", async function (next) {
  const user = this;
  await task.deleteMany({ owner: user.id });
  next();
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const user = mongoose.model("user", userSchema);
module.exports = user;
