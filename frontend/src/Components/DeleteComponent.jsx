import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useAuth } from "../context/Context";

const DeleteComponent = ({ postObjId, getfunction }) => {
  const [show, setShow] = useState(false);
  const { token } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${postObjId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getfunction();
      handleShow(false);
      handleClose(true);
    } catch (err) {
      console.error("Error while sending delete request", err);
    }
  };

  return (
    <>
      <MdDeleteOutline style={{ cursor: "pointer" }} onClick={handleShow} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          border: "none"
        }}>
          <Modal.Title style={{ fontWeight: "600" }}>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "25px", fontSize: "1.1rem", color: "#34495e" }}>
          Are you sure you want to delete this post? This action cannot be undone.
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
            onClick={() => {
              handleDelete();
            }}
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

export default DeleteComponent;
