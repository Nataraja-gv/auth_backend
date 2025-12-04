const validator = require("validator");

const SignUpValidation = (req) => {
  const { user_name, email, password, phone_no } = req.body;

  if (!user_name || !email || !password || !phone_no) {
    throw new Error("All Fields are Required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password Should Strong");
  }
};

module.exports = SignUpValidation;
