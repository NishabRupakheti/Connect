import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const FollowReq = () => {
  const { token } = useAuth();
  const [people, setPeople] = useState([]);

  const getFollowers = async () => {
    try {
      const response = await axios.get(
        "https://connectbackend-7l4t.onrender.com/friend/followers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setPeople(response.data);
    } catch (err) {
      console.error("Error in getfollowers function", err);
    }
  };

  const handleAccept = async (reqId) => {
    try {
      const response = await axios.post(
        "https://connectbackend-7l4t.onrender.com/friend/resconnect",
        {
          requestId: reqId,
          action: "accept",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getFollowers();
    } catch (err) {
      console.log("Error in handleAccept function", err);
    }
  };

  const handleReject = async (reqId) => {
    try {
      const response = await axios.post(
        "https://connectbackend-7l4t.onrender.com/friend/resconnect",
        {
          requestId: reqId,
          action: "reject",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getFollowers();
    } catch (err) {
      console.log("Error in handleAccept function", err);
    }
  };

  useEffect(() => {
    getFollowers();
  }, []);

  return (
    <>
      {people.length > 0 ? (
        <div
          className="container d-flex justify-content-center align-items-center flex-column mt-4"
          style={{ fontFamily: "Barlow", fontSize: "20px" }}
        >
          {people.map((person, index) => {
            return (
              <div key={index} className="card w-50 mt-4" style={{
                border: "none",
                borderRadius: "15px"
              }}>
                <div className="card-header" style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "1.3rem",
                  border: "none",
                  borderRadius: "15px 15px 0 0",
                  padding: "15px 20px"
                }}>
                  {person.follower.userName}
                </div>
                <div className="card-body" style={{ padding: "25px" }}>
                  <p className="card-text" style={{ color: "#7f8c8d", fontSize: "1rem", marginBottom: "15px" }}>{person.follower.email}</p>
                  <span style={{ fontSize: "0.85em", color: "#95a5a6" }}>
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(person.createdAt || Date.now()))}
                  </span>
                  <div className="mt-3 d-flex gap-2">
                    <a
                      href="#"
                      className="btn rounded-pill flex-grow-1"
                      onClick={() => handleAccept(person._id)}
                      style={{
                        background: "#27ae60",
                        color: "#fff",
                        border: "none",
                        fontWeight: "600",
                        padding: "10px 20px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.background = "#229954";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.background = "#27ae60";
                      }}
                    >
                      Confirm ✅
                    </a>
                    <a
                      href="#"
                      className="btn rounded-pill flex-grow-1"
                      onClick={() => handleReject(person._id)}
                      style={{
                        background: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        fontWeight: "600",
                        padding: "10px 20px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.background = "#c0392b";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.background = "#e74c3c";
                      }}
                    >
                      Reject ❌
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="container mt-5 d-flex justify-content-center align-items-center p-3 flex-column">
          <div className="card shadow-lg" style={{
            border: "none",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "40px",
            textAlign: "center"
          }}>
            <h4 style={{ fontFamily: "Barlow", color: "#34495e", fontWeight: "600", fontSize: "2rem" }}>
              No requests 🍃
            </h4>
            <p style={{ color: "#7f8c8d", fontSize: "1.2rem", marginTop: "15px" }}>
              You're all caught up!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowReq;
