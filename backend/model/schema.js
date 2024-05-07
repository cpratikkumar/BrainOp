const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String, required: true },
});
const userModel = mongoose.model("usersdata", userSchema);
module.exports = userModel;
