const express = require("express");
const { signup } = require("../controllers/auth-controllers");

const authRouter = express.Router();

authRouter.post("/auth/sign-up",signup)

module.exports=authRouter