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
        "https://connectbackend-7l4t.onrender.com/api/",
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
          "https://connectbackend-7l4t.onrender.com/post/comment",
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
        "https://connectbackend-7l4t.onrender.com/post/like",
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
        <div className="container mt-3 d-flex justify-content-center align-items-center p-3 flex-column">
          {posts.map((post, index) => (
            <div
              className={`card mt-4 ${styles["postCard"]}`}
              key={index}
              style={{ borderRadius: "15px", border: "none" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0" style={{ fontWeight: "600", color: "#2c3e50" }}>{post.userId.userName}</h5>
                  {post.userId.userName === userName && (
                    <DeleteComponent
                      postObjId={post._id}
                      getfunction={getFunction}
                    />
                  )}
                </div>

                <span style={{ fontSize: "0.85em", color: "#95a5a6" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(post.createdAt))}
                </span>

                <p className="card-text my-3" style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#34495e" }}>{post.message}</p>

                <div className="container d-flex justify-content-around align-items-center p-2" style={{ background: "rgba(0,0,0,0.02)", borderRadius: "10px" }}>
                  <div className="d-flex align-items-center">
                    <AiOutlineLike size={22} color="#e74c3c" />{" "}
                    <span className="ms-2" style={{ fontWeight: "500" }}>{post.likeCount}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <LiaCommentSolid size={22} color="#3498db" />{" "}
                    <span className="ms-2" style={{ fontWeight: "500" }}>{post.comments.length}</span>
                  </div>
                </div>

                <div className="btns text-center mt-3">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`btn m-1 ${styles["lbtn"]} rounded-pill`}
                    style={{ 
                      minWidth: "90px",
                      background: post.likes.includes(userId) ? "#e74c3c" : "#fff",
                      color: post.likes.includes(userId) ? "#fff" : "#e74c3c",
                      border: "2px solid #e74c3c",
                      fontWeight: "500"
                    }}
                  >
                    {post.likes.includes(userId) ? "Unlike 👎" : "Like 👍"}
                  </button>

                  <button
                    type="button"
                    className={`btn m-1 ${styles["rbtn"]} rounded-pill`}
                    onClick={() => handleOpenModal(post)}
                    style={{ 
                      minWidth: "90px",
                      background: "#3498db",
                      color: "#fff",
                      border: "2px solid #3498db",
                      fontWeight: "500"
                    }}
                  >
                    Comment 💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mt-5 d-flex justify-content-center align-items-center p-3 flex-column">
          <div className="card shadow-lg rounded-lg w-75" style={{ border: "none", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)" }}>
            <div className="card-body text-center py-5">
              <h5
                className="card-title mb-3"
                style={{
                  fontFamily: "Barlow",
                  fontSize: "2.5rem",
                  color: "#34495e",
                  fontWeight: "600"
                }}
              >
                No posts yet 🍃
              </h5>
              <p
                style={{
                  fontFamily: "PT Sans",
                  fontSize: "1.1rem",
                  color: "#7f8c8d",
                  marginTop: "20px"
                }}
              >
                Try following some people or create your own post to get started!
              </p>
            </div>
          </div>
        </div>
      )}

      {activePost && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", border: "none" }}>
          <Modal.Title style={{ fontFamily: "PT Sans", fontSize: "1.5rem", fontWeight: "bold" }}>
            {activePost.userId.userName}'s Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#f8f9fa" }}>
          {/* Post Details Card */}
          <div className="card shadow-sm rounded-lg mb-4" style={{ fontFamily: "PT Sans", border: "none" }}>
            <div className="card-body">
              <h5 className="card-title mb-3" style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#2c3e50" }}>
                {activePost.userId.userName}
              </h5>
              <p className="card-text mb-3" style={{ fontSize: "1.05rem", lineHeight: "1.6", color: "#34495e" }}>{activePost.message}</p>
              <div className="d-flex justify-content-around mb-3 p-2" style={{ background: "rgba(0,0,0,0.03)", borderRadius: "8px" }}>
                <div className="likes d-flex align-items-center">
                  <AiOutlineLike size={20} className="me-1" color="#e74c3c" /> <span style={{ fontWeight: "500" }}>{activePost.likeCount}</span>
                </div>
                <div className="comments d-flex align-items-center">
                  <LiaCommentSolid size={20} className="me-1" color="#3498db" /> <span style={{ fontWeight: "500" }}>{activePost.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
      
          {/* Comments Section */}
          <div className="card shadow-sm rounded-lg mb-4" style={{ border: "none" }}>
            <ul className="list-group list-group-flush">
              {activePost.comments.length > 0 ? (
                activePost.comments.map((comment, commentIndex) => (
                  <li
                    key={commentIndex}
                    className="list-group-item p-3"
                    style={{ fontFamily: "PT Sans", fontSize: "1rem", border: "none", borderBottom: "1px solid #ecf0f1" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-title mb-0" style={{ fontWeight: "600", color: "#2c3e50" }}>{comment.userId.userName}</h6>
                      {comment.userId.userName === userName && (
                        <CommentDeleter
                          commentId={comment._id}
                          postObjId={activePost._id}
                          getFunction={getFunction}
                          setShowModal={setShowModal}
                        />
                      )}
                    </div>
      
                    <span style={{ fontSize: "0.8em", color: "#95a5a6" }}>
                      {new Intl.DateTimeFormat("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }).format(new Date(comment.createdAt))}
                    </span>
                    <p className="card-text mt-2" style={{ color: "#34495e" }}>{comment.message}</p>
                  </li>
                ))
              ) : (
                <h5 className="text-center p-4" style={{ fontFamily: "Barlow", color: "#95a5a6" }}>
                  No comments yet 💭
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
              placeholder="Write a comment..."
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              style={{ borderRadius: "25px", padding: "12px 20px", border: "2px solid #e0e0e0" }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: "none", background: "#f8f9fa" }}>
          <Button variant="secondary" onClick={handleCloseModal} className="rounded-pill" style={{ paddingLeft: "25px", paddingRight: "25px" }}>
            Close
          </Button>
          <Button
            onClick={() => handleComment(activePost._id)}
            className="rounded-pill"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              paddingLeft: "25px",
              paddingRight: "25px"
            }}
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
