import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Context";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";
import "./Login.css";


const Login = () => {
  const { setIsAuthenticated , eyestate , toggleEye } = useAuth();
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
      const response = await axios.post("http://localhost:3000/auth/login", {
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
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      {status && (
        <div className="alert-container">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-circle"></i>
            {status}
          </div>
        </div>
      )}
      
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon">
                <i className="fas fa-users"></i>
              </div>
            </div>
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i>
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i>
                Password
              </label>
              <div className="password-input-container">
                <input
                  type={eyestate ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleEye}
                >
                  {eyestate ? <FaRegEye /> : <LuEyeClosed />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              <span>Sign In</span>
              <i className="fas fa-arrow-right"></i>
            </button>
            
            <div className="login-footer">
              <p>
                Don't have an account? 
                <Link to="register" className="signup-link">Create one</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
