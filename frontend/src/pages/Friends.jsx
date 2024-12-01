import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

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
    <div className="container w-50 mt-4">
      {friends.length === 0 ? (
        <p>No friends to display</p>
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
