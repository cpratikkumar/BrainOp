import React, { useEffect, useState } from "react";
import { getAllPosts } from "../apirequests/gettingposts";
import PostCard from "../components/PostCard";
function PostlistScreen() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchingposts() {
      try {
        const post = await getAllPosts("http://localhost:8080/api/posts");

        setPosts([...posts, post?.data?.posts]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchingposts();
  }, []);

  return (
    <div className="w-[100%] h-[100%] bg-gradient-to-r from-teal-400 to-yellow-200 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 px-2 pt-10">
      {posts[0]?.map((post, id) => {
        return <PostCard key={id} post={post} />;
      })}
    </div>
  );
}

export default PostlistScreen;
