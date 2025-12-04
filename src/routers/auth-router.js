const express = require("express");
const { signup, authLogin, logout } = require("../controllers/auth-controllers");

const authRouter = express.Router();

authRouter.post("/auth/sign-up",signup)
authRouter.post("/auth/login",authLogin)
authRouter.post("/auth/logout",logout)



module.exports=authRouter