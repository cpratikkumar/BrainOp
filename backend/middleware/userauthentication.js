const userModel = require("../model/schema");
const dotenv = require("dotenv").config();

const userAuthentication = async (req, res, next) => {
  // Initialize and use cookie-parser middleware to parse cookies
  const { email } = req.user;
  try {
    const getUser = await userModel.findOne({ email });
    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (getUser.email === email) {
      next();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal error" });
  }
};

module.exports = userAuthentication;
