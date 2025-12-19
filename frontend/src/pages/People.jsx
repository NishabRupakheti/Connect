import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";
import styles from "../styles/Postcard.module.css";

const People = () => {
  const { token } = useAuth();
  const [people, setPeople] = useState([]);

  const getPeople = async () => {
    try {
      const response = await axios.get(
        "https://connectbackend-7l4t.onrender.com/friend/people",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPeople(response.data);
    } catch (err) {
      console.log("Error fetching data ", err);
    }
  };

  const handleFollow = async (followingId) => {
    try {
      const response = await axios.post(
        "https://connectbackend-7l4t.onrender.com/friend/connect",
        {
          following: followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      getPeople();
    } catch (err) {
      console.log("Error on the handleFollow function", err);
    }
  };

  const removeFriend = async (followingId) => {
    try {
      const response = await axios.post(
        "https://connectbackend-7l4t.onrender.com/friend/disconnect",
        { following: followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      getPeople();
    } catch (error) {
      console.error("Error disconnecting friend:", error);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column mt-4"
      style={{ fontFamily: "Barlow", fontSize: "20px" }}
    >
      {people.map((person, index) => {
        return (
          <div
            key={index}
            className={`card mt-4 ${styles["postCard"]}`}
            style={{
              border: "none",
              borderRadius: "15px"
            }}
          >
            <div className="card-header text-center" style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.3rem",
              border: "none",
              borderRadius: "15px 15px 0 0",
              padding: "15px"
            }}>
              {person.userName}
            </div>
            <div className="card-body" style={{ padding: "25px" }}>
              <p className="card-text" style={{ color: "#7f8c8d", fontSize: "1rem", marginBottom: "20px" }}>{person.email}</p>
              <div className="text-center">
                <a
                  href="#"
                  className="btn w-75 py-2 rounded-pill"
                  onClick={() =>
                    person.status === "pending"
                      ? removeFriend(person._id)
                      : person.status === "none"
                      ? handleFollow(person._id)
                      : null
                  }
                  style={{
                    background: person.status === "pending"
                      ? "#e74c3c"
                      : person.status === "accepted"
                      ? "#27ae60"
                      : "#3498db",
                    color: "#fff",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  {person.status === "pending"
                    ? "Cancel Request ❌"
                    : person.status === "accepted"
                    ? "Following ✅"
                    : "Follow 👤"}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default People;
