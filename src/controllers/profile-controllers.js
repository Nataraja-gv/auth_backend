const userProfile = async (req,res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(501).json({ message: "user not found" });
    }
    res.status(200).json({ message: `${user?.user_name} Details `, data: user });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

module.exports = userProfile;
