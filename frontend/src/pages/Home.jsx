import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import styles from '../styles/Postcard.module.css'

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
      console.log(response.data[1]);
      setPosts(response.data);
    } catch (err) {
      console.log("Failed to fetch the data", err);
    }
  };

  const clickPost = ()=>{
    alert("Popup")
  }

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <>
      <div className="container border border-1 mt-3 d-flex justify-content-center align-items-center p-3  flex-column ">
        {posts.map((post, index) => {
          return (
            <div className={`card mt-5 ${styles['postCard']}`} key={index} onClick={clickPost} >
              <div className="card-body">
                <h5 className="card-title"> {post.userId.userName} </h5>
                <p className="card-text">{post.message}</p>
                <div className="container d-flex justify-content-between p-2">
                  <div className="likes">
                    <AiOutlineLike /> <span> {post.likeCount} </span>
                  </div>
                  <div className="comments">
                    <LiaCommentSolid /> <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="btns text-center">
                <a href="#" className={`btn m-1 btn-outline-dark ${styles['lbtn']} `}>
                  like
                </a>
                <a href="#" className={`btn m-1 btn-outline-dark ${styles['rbtn']} `}>
                  comment
                </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
