import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Context";
import { Link } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  function removeStatus() {
    setTimeout(() => {
      setStatus("");
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3000/auth/login", {
        email: email,
        passwordHash: password,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem("secretToken", token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      let status = err.response.data.message;
      setStatus(status);
      setPassword("");
      removeStatus();
    }
  };

  return (
    <>
      {status && (
        <div className="container text-center alert mt-4 alert-danger">
          {status}
        </div>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ fontFamily: "Barlow", fontWeight: "400", marginTop: "3.5rem" }}
      >
        <form
          onSubmit={handleSubmit}
          className="p-5 border rounded shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4" style={{ fontFamily: "cursive" }}>
            Login
          </h2>
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
          <div className="container mt-3">
            Don't have an account?  <Link to="register">Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
