const userModel = require("../model/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const userdetails = async (req, res) => {
  let { email, password, name, profilePic } = req.body;
  profilePic = !profilePic ? req.file.path : profilePic;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
      return res.status(500).json({ message: "User already register" });
    } else {
      const saveUser = await userModel({
        email,
        password: hashPassword,
        name,
        profilePic,
      }).save();
      const jwtToken = jwt.sign(
        {
          email,
          password,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.cookie("jwt", jwtToken, { maxAge: 3600000 });
      return res.status(200).json({ message: "User saved successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = userdetails;
