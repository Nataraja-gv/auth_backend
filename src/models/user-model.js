const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password Should Strong");
        }
      },
    },
    phone_no: {
      type: String,
      unique: true,
      min: 10,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.VerifyPassword = async function (password) {
  const user = this;
  const verifyPassword = await bcrypt.compare(password, user.password);
  return verifyPassword;
};

UserSchema.methods.GetJWT = async function () {
  const user = this;
  const userToken = await JWT.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET_kEY,
    {
      expiresIn: "1d",
    }
  );
  return userToken;
};

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
