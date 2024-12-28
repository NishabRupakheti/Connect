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
        "https://socialmedia-app-vxyd.onrender.com/friend/people",
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
        "https://socialmedia-app-vxyd.onrender.com/friend/connect",
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
        "https://socialmedia-app-vxyd.onrender.com/friend/disconnect",
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
            className={`card mt-4 ${styles["postCard"]} shadow-lg rounded-lg`}
          >
            <div className="card-header text-center font-weight-bold bg-light">
              {person.userName}
            </div>
            <div className="card-body">
              <p className="card-text text-muted">{person.email}</p>
              <div>
                <a
                  href="#"
                  className={`btn ${
                    person.status === "pending"
                      ? "btn-danger"
                      : person.status === "accepted"
                      ? "btn-success"
                      : "btn-primary"
                  } w-50 py-2 rounded-pill`}
                  onClick={() =>
                    person.status === "pending"
                      ? removeFriend(person._id)
                      : person.status === "none"
                      ? handleFollow(person._id)
                      : null
                  }
                  style={{
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#007bff")
                  }
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                >
                  {person.status === "pending"
                    ? "Cancel"
                    : person.status === "accepted"
                    ? "Following ✅"
                    : "Follow"}
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
