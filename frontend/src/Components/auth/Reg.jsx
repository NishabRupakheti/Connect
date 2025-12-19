import React, { useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from "../../context/Context";
import { Link } from "react-router-dom";
import "./Register.css";


const RegisterForm = () => {
  const { eyestate , setEyeState , toggleEye} = useAuth();
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
          "https://connectbackend-7l4t.onrender.com/auth/register",
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
    <div className="register-container">
      <div className="register-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      {status && (
        <div className="alert-container">
          <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
            <i className={`fas ${status.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {status}
          </div>
        </div>
      )}
      
      <div className="register-wrapper">
        <div className="register-card">
          <div className="register-header">
            <div className="logo-container">
              <div className="logo-icon">
                <i className="fas fa-user-plus"></i>
              </div>
            </div>
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join our community today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user"></i>
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

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
                Password (minimum 8 characters)
              </label>
              <div className="password-input-container">
                <input
                  type={eyestate ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={toggleEye}
                >
                  {eyestate ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              <div className="password-strength">
                <div className="strength-indicator">
                  <div className={`strength-bar ${password.length >= 8 ? 'strong' : password.length >= 4 ? 'medium' : 'weak'}`}></div>
                </div>
                <span className="strength-text">
                  {password.length >= 8 ? 'Strong' : password.length >= 4 ? 'Medium' : 'Weak'}
                </span>
              </div>
            </div>

            <button type="submit" className="register-button">
              <span>Create Account</span>
              <i className="fas fa-arrow-right"></i>
            </button>
            
            <div className="register-footer">
              <p>
                Already have an account? 
                <Link to="/login" className="login-link">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
