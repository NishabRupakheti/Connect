import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  function removeStatus(){
    setTimeout(() => {
      setStatus("")
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/auth/register",
          {
            userName: userName,
            email: email,
            passwordHash: password,
          }
        );

        setStatus(response.data.message)
        removeStatus();
        setUsername('')
        setEmail('')
        setPassword('')

      } catch (err) {
        console.error("Error submitting registration logic", err);
        alert(err.response.data);
      }
    } else {
      setPassword("")
      setStatus("Too short password")
      removeStatus();
    }
  };

  return (
    <>
      {status && (
        <div className="container text-center alert mt-4 alert-danger">{status}</div>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{marginTop: "3.5rem"}}
      >
        <form
          onSubmit={handleSubmit}
          className="p-5 border rounded shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4" style={{ fontFamily: "cursive" }}>
            Register
          </h2>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
