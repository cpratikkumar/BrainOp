const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  userId: { type: Number, required: true },
  tags: { type: Array, required: true },
  reactions: { type: Number, required: true },
});
const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
