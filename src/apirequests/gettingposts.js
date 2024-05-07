import axios from "axios";
export const getAllPosts = async (url) => {
  const posts = await axios.get(url, {
    withCredentials: true, // Include credentials in the request
  });
  return posts;
};
