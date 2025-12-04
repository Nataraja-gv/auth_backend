const express = require("express");
const userProfile = require("../controllers/profile-controllers");
const UserAuth = require("../middleware/user-auth");

const profileRouter = express.Router();

profileRouter.get("/auth/profile", UserAuth, userProfile);

module.exports = profileRouter;
