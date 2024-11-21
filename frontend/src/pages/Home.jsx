import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";
import styles from "../styles/Postcard.module.css";
import { useAuth } from "../context/Context";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const { posts = [], setPosts, setUserName } = useAuth();
  const [activePost, setActivePost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("")
  const token = localStorage.getItem("secretToken");

  const getFunction = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.findPost);
      setUserName(response.data.userInfo);
    } catch (err) {
      console.log("Failed to fetch the data", err);
    }
  };


 const handleComment = async (postObjID) => {
  if (comment.length !== 0) {
    try {
      const response = await axios.put(
        'http://localhost:3000/post/comment',
        {
          "postObjID": postObjID,
          "message" : comment
      },
        {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}


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
  };

  return (
    <>
      <div className="container border border-1 mt-3 d-flex justify-content-center align-items-center p-3 flex-column">
        {posts.map((post, index) => (
          <div className={`card mt-5 ${styles["postCard"]}`} key={index}>
            <div className="card-body">
              <h5 className="card-title"> {post.userId.userName} </h5>
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
                <a
                  href="#"
                  className={`btn m-1 btn-outline-dark ${styles["lbtn"]}`}
                >
                  like
                </a>

                <button
                  type="button"
                  className={`btn m-1 btn-outline-dark ${styles["rbtn"]}`}
                  onClick={() => handleOpenModal(post)} // Open the modal for the clicked post
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activePost && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{activePost.userId.userName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={`card mt-2 ${styles[".smallPostCard"]}`}>
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
            <div className="card mt-3">
              <ul>
                {activePost.comments.map((comment, commentIndex) => (
                  <li key={commentIndex}>
                    <h6 className="card-title">{comment.userId.userName}</h6>
                    <p className="card-text">{comment.message}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div class="input-group mb-3 mt-3">
              <input
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
                type="text"
                class="form-control"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>handleComment(activePost._id)}>Comment</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Home;
