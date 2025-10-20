import React, { useState } from "react";
import "../Routes/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill out all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Store Super Admin data in localStorage
    localStorage.setItem("superAdmin", JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));

    setError("");
    setSuccess("Super Admin registered successfully!");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2 className="register-title">Super Admin Registration 👑</h2>
        <p className="register-subtitle">Register once to access the system</p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-text">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
