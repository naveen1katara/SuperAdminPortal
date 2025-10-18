import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ ADD THIS LINE

import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import About from "./Routes/About";
import Login from "./Routes/Login";
import ComplaintBox from "./Routes/ComplaintBox";
import Workers from "./Routes/Workers";
import Employer from "./Routes/Employer";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/employers" element={<Employer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/complaint" element={<ComplaintBox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
