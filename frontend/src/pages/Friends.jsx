import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";
import { CiBookmarkPlus } from "react-icons/ci";

const Friends = () => {
  const { token } = useAuth();
  const [friends, setFriends] = useState([]);

  const removeFriend = async (index, followingId) => {
    try {
      const response = await axios.post(
        "https://socialmedia-app-vxyd.onrender.com/friend/disconnect",
        { following: followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getFriends();

      console.log(response);
    } catch (error) {
      console.error("Error disconnecting friend:", error);
    }
  };

  const getFriends = async () => {
    const response = await axios.get(
      "https://socialmedia-app-vxyd.onrender.com/friend/connection",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFriends(response.data);
    console.log(friends);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column mt-5" 
      style={{ fontFamily: "Barlow", fontSize: "20px"}}
    >
      {friends.length === 0 ? (
        <div className="card shadow-lg" style={{
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding: "40px",
          textAlign: "center"
        }}>
          <h4 style={{ color: "#34495e", fontWeight: "600", marginBottom: "15px" }}>No friends yet 🍃</h4>
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem", marginTop: "10px" }}>
            Try following some people <CiBookmarkPlus size={24} style={{ marginLeft: "5px", verticalAlign: "middle" }} />
          </p>
        </div>
      ) : (
        friends.map((friend, index) => (
          <div key={index} className="card mb-4 w-50" style={{
            border: "none",
            borderRadius: "15px"
          }}>
            <div className="card-header" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "15px 15px 0 0",
              padding: "15px 20px"
            }}>
              <h5 className="card-title mb-0" style={{ fontWeight: "600", fontSize: "1.3rem" }}>{friend.userName}</h5>
            </div>
            <div className="card-body" style={{ padding: "20px" }}>
              <p className="card-text" style={{ color: "#7f8c8d", fontSize: "1rem", marginBottom: "20px" }}>{friend.email}</p>
              <button
                onClick={() => removeFriend(index, friend._id)}
                className="btn rounded-pill"
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "10px 30px",
                  fontWeight: "600",
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
                Unfollow ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
