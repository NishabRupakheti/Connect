import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const FollowReq = () => {
  const { token } = useAuth();
  const [people, setPeople] = useState([]);

  const getFollowers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/friend/followers",
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
        "http://localhost:3000/friend/resconnect",
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
        "http://localhost:3000/friend/resconnect",
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
              <div key={index} className="card w-50 mt-4 ">
                <div className="card-header">{person.follower.userName}</div>
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <p className="card-text">{person.follower.email}</p>
                  <span style={{ fontSize: "0.7em" }}>
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date("123"))}
                  </span>
                  <br />
                  <a
                    href="#"
                    className="btn btn-primary mt-2"
                    onClick={() => handleAccept(person._id)}
                  >
                    Confirm
                  </a>
                  <a
                    href="#"
                    className="btn btn-danger mt-2 mx-2"
                    onClick={() => handleReject(person._id)}
                  >
                    Reject
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="container mt-3 d-flex justify-content-center align-items-center p-3 flex-column">
          <div className="card mt-5">
            <div className="card-body" style={{ border: "none" }}>
              <h5 className="card-title" style={{ fontFamily: "cursive" }}>
                No request 🍃🍃
              </h5>
            </div>
          </div>
          <p
            className="card alert alert-info mt-2"
            style={{ fontFamily: "cursive" }}
          >
            🌲🌳🌴🎄    
          </p>
        </div>
      )}
    </>
  );
};

export default FollowReq;
