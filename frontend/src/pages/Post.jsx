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
          "https://connectbackend-7l4t.onrender.com/api/posts",
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
          style={{ 
            width: "30rem",
            border: "none",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)"
          }}
        >
          <div className="card-body">
            <h5 className="card-title mb-4" style={{ fontWeight: "600", fontSize: "1.8rem", color: "#2c3e50" }}>
              What's on your mind? 💭
            </h5>
            <div className="input-group mb-4">
              <div className="form-floating w-100">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ 
                    height: "120px", 
                    borderRadius: "12px",
                    border: "2px solid #e0e0e0",
                    fontSize: "1rem"
                  }}
                ></textarea>
                <label htmlFor="floatingTextarea2" style={{ fontSize: "15px", color: "#7f8c8d" }}>
                  Share something...
                </label>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handlePost}
                className="btn w-75 py-3 rounded-pill"
                style={{ 
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.1rem",
                  transition: "transform 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Post 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
      {status && (
        <div className="container text-center mt-4 w-50 mx-auto">
          <div className="alert" style={{
            background: "rgba(231, 76, 60, 0.9)",
            color: "#fff",
            border: "none",
            borderRadius: "15px",
            fontWeight: "500",
            padding: "15px"
          }}>
            {status}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
