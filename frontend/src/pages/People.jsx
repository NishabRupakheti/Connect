import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const People = () => {
  const { token } = useAuth();
  const [people, setPeople] = useState([]);

  const getPeople = async () => {
    try {
      const response = await axios.get("http://localhost:3000/friend/people", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPeople(response.data);
    } catch (err) {
      console.log("Error fetching data ", err);
    }
  };

  const handleFolow = async (followingId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/friend/connect",
        {
          following: followingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)
      getPeople();

    } catch (err) {
      console.log("Error on the handleFollow function", err);
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column mt-4">
      {people.map((person, index) => {
        return (
          <div key={index} className="card w-50 mt-4 ">
            <div className="card-header">{person.email}</div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-text">{person.userName}</p>
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => handleFolow(person._id)}
              >
                Follow
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default People;
