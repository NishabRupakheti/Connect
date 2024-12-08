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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete this post ?? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComponent;
