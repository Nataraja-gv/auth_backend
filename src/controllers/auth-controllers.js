const UserModel = require("../models/user-model");
const SignUpValidation = require("../utils/signup-validation");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { user_name, email, password, phone_no } = req.body;
    SignUpValidation(req);
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone_no }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or phone number already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const data = {
      user_name,
      email,
      password: passwordHash,
      phone_no,
    };

    const user = await UserModel(data);
    const result = await user.save();
    const userToken = await result.GetJWT();
    res.cookie("auth_token", userToken);

    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password, phone_no } = req.body;
    if (!email || !password) {
      throw new Error("email and  password required");
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const verifyPassword = await existingUser.VerifyPassword(password);
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Invalid Password Credentials",
      });
    }
    const userToken = await existingUser.GetJWT();
    res.cookie("auth_token", userToken);
    res.status(200).json({ status: true, message: "login Sucessfully" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("auth_token", null, { expires: new Date(Date.now()) });
    res.status(200).json({ message: "logout successfull" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = { signup, authLogin, logout };
