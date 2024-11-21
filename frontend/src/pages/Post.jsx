import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const Post = () => {
  const [message, setMessage] = useState("");
  const {token , status , setStatus , removeStatus } = useAuth();
  

  const handlePost = async () => {
    if (message.length != 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/posts",
          {
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        setMessage("")
        setStatus(response.data.message)
        removeStatus();

      } catch (err) {
        console.log("Error on the handlePost function", err);
      }
    } else {
      setStatus("Write something")
      removeStatus();
    }
  };

  return (
    <>
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-3 " style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title p-2"> What's on your mind </h5>
          <div className="input-group mb-3">
            <div className="form-floating">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Share something</label>
            </div>
          </div>
          <a
            href="#"
            className="btn btn-outline-dark w-25"
            onClick={handlePost}
          >
            Post
          </a>
        </div>
      </div>
    </div>
    {status && (
        <div className="container text-center alert mt-4 w-50 alert-danger">
          {status}
        </div>
      )}
    </>
  );
};

export default Post;
