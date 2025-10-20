import React, { useState } from "react";
import "../Routes/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedAdmin = JSON.parse(localStorage.getItem("superAdmin"));

    if (!storedAdmin) {
      setError("No Super Admin registered. Please register first!");
      return;
    }

    if (formData.email === storedAdmin.email && formData.password === storedAdmin.password) {
      setError("");
      alert(`Welcome back, ${storedAdmin.name}! Login Successful ✅`);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Super Admin Login</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          No account yet? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
