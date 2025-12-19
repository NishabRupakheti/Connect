import React from "react";
import { useAuth } from "../context/Context";
import axios from "axios";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CommentDeleter = ({ commentId, postObjId, getFunction , setShowModal }) => {
  const { token } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    console.log(commentId);
    console.log(postObjId);

    try {
      const response = await axios.delete(
        `http://localhost:3000/post/comment/${postObjId}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setShow(false)    
      setShowModal(false)
      getFunction();
    } catch (err) {
      console.log("Error on the handleDelete function", err);
    }
  };

  return (
    <>
      <AiOutlineDelete
        style={{ fontSize: "23px", marginTop: "5px", cursor: "pointer" }}
        onClick={handleShow}
      />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none"
        }}>
          <Modal.Title style={{ fontWeight: "600" }}>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "25px", fontSize: "1.1rem", color: "#34495e" }}>
          Are you sure you want to delete this comment? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer style={{ border: "none", padding: "20px" }}>
          <Button 
            variant="secondary" 
            onClick={handleClose}
            className="rounded-pill"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            className="rounded-pill"
            style={{
              background: "#e74c3c",
              border: "none",
              paddingLeft: "25px",
              paddingRight: "25px"
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentDeleter;
