import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const Post = () => {
  const [message, setMessage] = useState("");
  const { token, status, setStatus, removeStatus } = useAuth();

  const handlePost = async () => {
    if (message.length != 0) {
      try {
        const response = await axios.post(
          "https://socialmedia-app-vxyd.onrender.com/api/posts",
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
        setMessage("");
        setStatus(response.data.message);
        removeStatus();
      } catch (err) {
        console.log("Error on the handlePost function", err);
      }
    } else {
      setStatus("Write something");
      removeStatus();
    }
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center mt-5"
        style={{ fontSize: "25px", fontFamily: "Barlow" }}
      >
        <div
          className="card shadow-lg rounded-lg p-4"
          style={{ width: "30rem" }}
        >
          <div className="card-body">
            <h5 className="card-title mb-3" style={{ fontWeight: "bold" }}>
              What's on your mind
            </h5>
            <div className="input-group mb-3">
              <div className="form-floating">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px", borderRadius: "8px" }}
                ></textarea>
                <label htmlFor="floatingTextarea2" style={{ fontSize: "15px" }}>
                  Share something
                </label>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handlePost}
                className="btn btn-primary w-50 py-2 rounded-pill"
                style={{ fontWeight: "bold" }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {status && (
        <div className="container text-center alert alert-danger mt-4 w-50 mx-auto">
          {status}
        </div>
      )}
    </>
  );
};

export default Post;
