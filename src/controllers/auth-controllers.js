const signup = async (req, res) => {
  try {
    res.status(200).json({ status: true, data: "sign up" });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = { signup };
