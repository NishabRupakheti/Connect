import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import styles from "../styles/Postcard.module.css";
import { useAuth } from "../context/Context";
import { Modal, Button } from "react-bootstrap";
import DeleteComponent from "../Components/DeleteComponent";
import CommentDeleter from "../Components/CommentDeleter";

const Home = () => {
  const {
    posts = [],
    setPosts,
    setUserName,
    token,
    setIsAuthenticated,
    userName,
  } = useAuth();
  const [activePost, setActivePost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");

  const getFunction = async () => {
    try {
      const response = await axios.get(
        "https://socialmedia-app-vxyd.onrender.com/api/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(response.data.findPost);
      setUserName(response.data.userInfo);
      setUserId(response.data.userId);
    } catch (err) {
      if (
        err.response.data.message == "Expired token" ||
        err.response.data.message == "Invalid token"
      ) {
        setIsAuthenticated(false);
      }
    }
  };

  const handleComment = async (postObjID) => {
    if (comment.length !== 0) {
      try {
        const response = await axios.put(
          "https://socialmedia-app-vxyd.onrender.com/post/comment",
          {
            postObjID: postObjID,
            message: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setComment("");
        handleCloseModal();
        getFunction();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLike = async (postObjID) => {
    try {
      await axios.put(
        "https://socialmedia-app-vxyd.onrender.com/post/like",
        {
          postObjID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getFunction();
    } catch (err) {
      console.log("Error on the like function", err);
    }
  };

  useEffect(() => {
    getFunction();
  }, []);

  const handleOpenModal = (post) => {
    setActivePost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActivePost(null);
    setComment("");
  };

  return (
    <>
      {posts.length > 0 ? (
        <div className="container border border-1 mt-3 d-flex justify-content-center align-items-center p-3 flex-column">
          {posts.map((post, index) => (
            <div
              className={`card mt-4 shadow-sm ${styles["postCard"]}`}
              key={index}
              style={{ borderRadius: "10px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">{post.userId.userName}</h5>
                  {post.userId.userName === userName && (
                    <DeleteComponent
                      postObjId={post._id}
                      getfunction={getFunction}
                    />
                  )}
                </div>

                <span style={{ fontSize: "0.8em", color: "#6c757d" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(post.createdAt))}
                </span>

                <p className="card-text my-3">{post.message}</p>

                <div className="container d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex align-items-center">
                    <AiOutlineLike size={20} />{" "}
                    <span className="ms-1">{post.likeCount}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <LiaCommentSolid size={20} />{" "}
                    <span className="ms-1">{post.comments.length}</span>
                  </div>
                </div>

                <div className="btns text-center mt-3">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`btn m-1 btn-outline-dark ${styles["lbtn"]} rounded-pill`}
                    style={{ minWidth: "90px" }}
                  >
                    {post.likes.includes(userId) ? "Unlike 👎" : "Like 👍"}
                  </button>

                  <button
                    type="button"
                    className={`btn m-1 btn-outline-dark ${styles["rbtn"]} rounded-pill`}
                    onClick={() => handleOpenModal(post)}
                    style={{ minWidth: "90px" }}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mt-5 d-flex justify-content-center align-items-center p-3 flex-column">
          <div className="card shadow-sm rounded-lg w-75">
            <div className="card-body text-center">
              <h5
                className="card-title mb-3"
                style={{
                  fontFamily: "cursive",
                  fontSize: "2rem",
                  color: "#6c757d",
                }}
              >
                No posts yet 🍃🍃
              </h5>
            </div>
          </div>
          <p
            className="alert alert-info mt-3 text-center w-75 mx-auto"
            style={{
              fontFamily: "cursive",
              fontSize: "1rem",
              color: "#495057",
            }}
          >
            Try following some people or create your own
          </p>
        </div>
      )}

      {activePost && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "PT Sans", fontSize: "1.5rem", fontWeight: "bold" }}>
            {activePost.userId.userName}'s Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Post Details Card */}
          <div className="card shadow-sm rounded-lg mb-4" style={{ fontFamily: "PT Sans" }}>
            <div className="card-body">
              <h5 className="card-title mb-3" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {activePost.userId.userName}
              </h5>
              <p className="card-text mb-3">{activePost.message}</p>
              <div className="d-flex justify-content-between mb-3">
                <div className="likes d-flex align-items-center">
                  <AiOutlineLike size={20} className="me-1" /> <span>{activePost.likeCount}</span>
                </div>
                <div className="comments d-flex align-items-center">
                  <LiaCommentSolid size={20} className="me-1" /> <span>{activePost.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
      
          {/* Comments Section */}
          <div className="card shadow-sm rounded-lg mb-4">
            <ul className="list-group list-group-flush">
              {activePost.comments.length > 0 ? (
                activePost.comments.map((comment, commentIndex) => (
                  <li
                    key={commentIndex}
                    className="list-group-item p-3"
                    style={{ fontFamily: "PT Sans", fontSize: "1rem" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-title mb-0">{comment.userId.userName}</h6>
                      {comment.userId.userName === userName && (
                        <CommentDeleter
                          commentId={comment._id}
                          postObjId={activePost._id}
                          getFunction={getFunction}
                          setShowModal={setShowModal}
                        />
                      )}
                    </div>
      
                    <span style={{ fontSize: "0.8em", color: "#6c757d" }}>
                      {new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(comment.createdAt))}
                    </span>
                    <p className="card-text mt-2">{comment.message}</p>
                    <hr />
                  </li>
                ))
              ) : (
                <h5 className="text-center p-2" style={{ fontFamily: "Barlow", color: "#6c757d" }}>
                  No comments yet
                </h5>
              )}
            </ul>
          </div>
      
          {/* Comment Input */}
          <div className="input-group mb-3">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter a comment"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} className="rounded-pill">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleComment(activePost._id)}
            className="rounded-pill"
          >
            Comment
          </Button>
        </Modal.Footer>
      </Modal>
      
      )}
    </>
  );
};

export default Home;
