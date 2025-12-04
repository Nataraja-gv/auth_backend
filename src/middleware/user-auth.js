const JWT = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const UserAuth = async (req, res, next) => {
  const { auth_token } = req.cookies;
  if (!auth_token) {
    return res.status(401).json({ message: "Please Login" });
  }

  const decodeID = await JWT.verify(auth_token, process.env.JWT_SECRET_kEY);
  const { _id } = decodeID;
  const user = await UserModel.findById({ _id }).select(["user_name","email","phone_no"]);
  req.user = user;
  next();
};

module.exports = UserAuth;
