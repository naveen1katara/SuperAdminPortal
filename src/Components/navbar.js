import React from "react";
import { Link } from "react-router-dom"; // ✅ React Router import
import "./navbar.css";
import logo from "./logo.png"; // make sure the logo path is correct

function Navbar() {
  return (
    <nav className="navbar-3d">
      <div className="nav-logo">
        <img src={logo} alt="MP Govt Logo" />
        <span>मध्यप्रदेश श्रम मंत्रालय</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/workers">Workers</Link></li>
        <li><Link to="/complaint">Complaint Box</Link></li>
        <li><Link to="/employers">Employer</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
