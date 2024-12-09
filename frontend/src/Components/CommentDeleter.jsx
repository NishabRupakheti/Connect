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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Delete Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to delete this comment ??{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentDeleter;
