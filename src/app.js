const express = require("express");
require("dotenv").config();
const ConnectDB = require("./config/database-connection");
const authRouter = require("./routers/auth-router");

const app = express();

app.use(express.json());


app.use("/", authRouter);


const StartServer = async () => {
  try {
    await ConnectDB();
    console.log("✅ Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
};

StartServer();
