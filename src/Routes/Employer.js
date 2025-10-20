import React, { useState } from "react";
import "../Routes/Employer.css";

function Employer() {
  // Employer Data with workers and previous companies
  const [employers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      contact: "+91 9876543210",
      company: "Skyline Builders",
      address: "Bhopal, Madhya Pradesh",
      previousCompanies: ["Dream Constructions", "Metro Developers"],
      workers: [
        { id: 1, name: "Amit Kumar", contact: "+91 9090909090" },
        { id: 2, name: "Ravi Singh", contact: "+91 9988776655" },
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      contact: "+91 9988776655",
      company: "GreenLand Contractors",
      address: "Indore, Madhya Pradesh",
      previousCompanies: ["Eco Builders", "Shree Constructions"],
      workers: [
        { id: 3, name: "Sneha Verma", contact: "+91 9001122334" },
        { id: 4, name: "Rohit Mehta", contact: "+91 8776655443" },
      ],
    },
    {
      id: 3,
      name: "Arjun Patel",
      email: "arjun@example.com",
      contact: "+91 9090909090",
      company: "Patel Infrastructure",
      address: "Ujjain, Madhya Pradesh",
      previousCompanies: ["Urban Developers", "Future Infra Ltd."],
      workers: [
        { id: 5, name: "Neha Gupta", contact: "+91 7001234567" },
        { id: 6, name: "Vikram Chauhan", contact: "+91 8112233445" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState(null);

  // 🔍 Filter by employer name OR company name
  const filteredEmployers = employers.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employer-page">
      <div className="employer-container">
        {!selectedEmployer ? (
          <>
            <h2 className="employer-title">Employer Management</h2>
            <p className="employer-subtitle">
              View, Search, and Manage Employer Profiles
            </p>

            {/* Search Bar */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by employer or company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Employer List */}
            <table className="employer-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employer Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployers.length > 0 ? (
                  filteredEmployers.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td
                        className="clickable"
                        onClick={() => setSelectedEmployer(emp)}
                      >
                        {emp.name}
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.contact}</td>
                      <td>{emp.company}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No employers found 😕
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            {/* Employer Profile View */}
            <button className="back-btn" onClick={() => setSelectedEmployer(null)}>
              ← Back
            </button>

            <div className="profile-section">
              <h2>{selectedEmployer.name}</h2>
              <p><strong>Email:</strong> {selectedEmployer.email}</p>
              <p><strong>Contact:</strong> {selectedEmployer.contact}</p>
              <p><strong>Current Company:</strong> {selectedEmployer.company}</p>
              <p><strong>Address:</strong> {selectedEmployer.address}</p>

              {/* Previous Companies */}
              <div className="previous-section">
                <h3>Previous Companies:</h3>
                {selectedEmployer.previousCompanies && selectedEmployer.previousCompanies.length > 0 ? (
                  <ul className="previous-list">
                    {selectedEmployer.previousCompanies.map((comp, index) => (
                      <li key={index}>{comp}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No previous company records available.</p>
                )}
              </div>

              {/* Workers List */}
              <h3 className="worker-heading">Workers under this employer:</h3>
              <table className="workers-table">
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEmployer.workers.map((worker) => (
                    <tr key={worker.id}>
                      <td>{worker.id}</td>
                      <td>{worker.name}</td>
                      <td>{worker.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Employer;
