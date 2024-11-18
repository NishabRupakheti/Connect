import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import styles from "../styles/Postcard.module.css";
import { useAuth } from "../context/Context";
import Comments from "../Components/Comments";

const Home = () => {
  const { posts, setPosts, setUserName } = useAuth();
  const getFunction = async () => {
    const token = localStorage.getItem("secretToken");
    try {
      const response = await axios.get("http://localhost:3000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setPosts(response.data.findPost);
      setUserName(response.data.userInfo);

    } catch (err) {
      console.log("Failed to fetch the data", err);
    }
  };

  useEffect(() => {
    getFunction();
  }, []);

  return (
    <>
      <div className="container border border-1 mt-3 d-flex justify-content-center align-items-center p-3  flex-column ">
        {posts.map((post, index) => {
          return (
            <div className={`card mt-5 ${styles["postCard"]}`} key={index}>
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
                  <a
                    href="#"
                    className={`btn m-1 btn-outline-dark ${styles["lbtn"]} `}
                  >
                    like
                  </a>

                  <button
                    type="button"
                    className={`btn m-1 btn-outline-dark ${styles["rbtn"]} `}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Comment
                  </button>

                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            {post.userId.userName}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div
                            className={`card mt-5 ${styles[".smallPostCard"]}`}
                            key={index}
                          >
                            {/* inside the modal */}
                            <Comments comments={post.comments} />
                            {/* inside the modal */}
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
