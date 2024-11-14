import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getFunction = async () => {
    const token = localStorage.getItem("secretToken");
    try {
      const response = await axios.get("http://localhost:3000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setPosts(response.data);
    } catch (err) {
      console.log("Failed to fetch the data", err);
    }
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <h3>Message : {post.message}</h3>
              <p>Likes: {post.likeCount}</p>
              <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
