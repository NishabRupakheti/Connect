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
        "http://localhost:3000/friend/disconnect",
        { following : followingId },
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
      "http://localhost:3000/friend/connection",
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
    <div className="container w-50 mt-4" style={{ fontSize: "20px" , fontFamily: "Barlow" }} >
      {friends.length === 0 ? (
        <>
          <div className="alert alert-info text-center">No friends yet🍃🍃</div>
          <p className="text-center text-uppercase" >Try following some people <CiBookmarkPlus /> </p>
        </>
      ) : (
        friends.map((friend, index) => (
          <div key={index} className="card mb-3">
            <div className="card-header">
              <h5 className="card-title">{friend.userName}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">{friend.email}</p>
              <button
                onClick={() => removeFriend(index, friend._id)}
                className="btn btn-danger"
              >
                Unfollow
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
