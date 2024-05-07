const postModel = require("../model/postSchema");
const postsDetails = async (req, res) => {
  try {
    const posts = await postModel.find({});
    return res.status(201).json({ message: "Post get successfully", posts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
module.exports = postsDetails;
