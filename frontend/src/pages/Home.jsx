import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import styles from "../styles/Postcard.module.css";
import { useAuth } from "../context/Context";
import { Modal, Button } from "react-bootstrap";
import DeleteComponent from "../Components/DeleteComponent";

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
  const [show, setShow] = useState(false);

  const getFunction = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
          "http://localhost:3000/post/comment",
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
        "http://localhost:3000/post/like",
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
            <div className={`card mt-5 ${styles["postCard"]}`} key={index}>
              <div className="card-body">
                <div className="d-flex justify-content-between ">
                  <h5 className="card-title"> {post.userId.userName} </h5>
                  {post.userId.userName == userName ? (
                    <DeleteComponent
                      postObjId={post._id}
                      getfunction={getFunction}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <span style={{ fontSize: "0.5em" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(post.createdAt))}
                </span>

                <p className="card-text">{post.message}</p>
                <div className="container d-flex justify-content-between p-2">
                  <div className="likes">
                    <AiOutlineLike /> <span>{post.likeCount}</span>
                  </div>
                  <div className="comments">
                    <LiaCommentSolid /> <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="btns text-center">
                  <button
                    onClick={() => handleLike(post._id)}
                    href="#"
                    className={`btn m-1 btn-outline-dark ${styles["lbtn"]}`}
                  >
                    {post.likes.includes(userId) ? "Unlike" : "Like"}
                  </button>

                  <button
                    type="button"
                    className={`btn m-1 btn-outline-dark ${styles["rbtn"]}`}
                    onClick={() => handleOpenModal(post)}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mt-3 d-flex justify-content-center align-items-center p-3 flex-column">
          <div className="card mt-5">
            <div className="card-body" style={{ border: "none" }}>
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                No posts yet 🍃🍃
              </h5>
            </div>
          </div>
          <p
            className="card alert alert-info mt-2"
            style={{ fontFamily: "cursive" }}
          >
            Try following some people or create your own
          </p>
        </div>
      )}

      {activePost && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontFamily: "PT Sans" }}>
              {activePost.userId.userName}'s Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`card mt-4`} style={{ fontFamily: "PT Sans" }}>
              <div className="card-body">
                <h5 className="card-title">{activePost.userId.userName}</h5>
                <p className="card-text">{activePost.message}</p>
                <div className="container d-flex justify-content-between p-2">
                  <div className="likes">
                    <AiOutlineLike /> <span>{activePost.likeCount}</span>
                  </div>
                  <div className="comments">
                    <LiaCommentSolid />{" "}
                    <span>{activePost.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <ul className="list-group list-group-flush">
                {activePost.comments.length > 0 ? (
                  activePost.comments.map((comment, commentIndex) => (
                    <li
                      key={commentIndex}
                      style={{
                        listStyle: "none",
                        padding: "12px",
                        fontSize: "16px",
                        fontFamily: "PT Sans",
                      }}
                    >
                      <h6 className="card-title mt-1">
                        {comment.userId.userName}
                      </h6>
                      <span style={{ fontSize: "0.5em" }}>
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }).format(new Date(comment.createdAt))}
                      </span>
                      <p className="card-text">{comment.message}</p>
                      <hr />
                    </li>
                  ))
                ) : (
                  <h5
                    className="text-center p-2"
                    style={{ fontFamily: "barlow" }}
                  >
                    No comments yet
                  </h5>
                )}
              </ul>
            </div>

            <div className="input-group mb-3 mt-3">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter a comment"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => handleComment(activePost._id)}
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
