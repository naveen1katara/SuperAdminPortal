import React, { useState } from "react";
import "../Routes/Workers.css";

// Sample Data (Company → Employer → Workers)
const companyData = [
  {
    companyName: "Skyline Builders",
    employers: [
      {
        id: 1,
        name: "John Doe",
        workers: [
          {
            id: 1,
            name: "Amit Kumar",
            contact: "+91 9876543210",
            attendance: generateAttendance(),
          },
          {
            id: 2,
            name: "Neha Sharma",
            contact: "+91 9988776655",
            attendance: generateAttendance(),
          },
        ],
      },
      {
        id: 2,
        name: "Rajesh Patel",
        workers: [
          {
            id: 3,
            name: "Ravi Verma",
            contact: "+91 9090909090",
            attendance: generateAttendance(),
          },
        ],
      },
    ],
  },
  {
    companyName: "GreenLand Contractors",
    employers: [
      {
        id: 3,
        name: "Priya Sharma",
        workers: [
          {
            id: 4,
            name: "Rahul Mehta",
            contact: "+91 7788991122",
            attendance: generateAttendance(),
          },
          {
            id: 5,
            name: "Vikram Singh",
            contact: "+91 8899776655",
            attendance: generateAttendance(),
          },
        ],
      },
    ],
  },
];

function Workers() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleCompanySelect = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedEmployer(null);
    setSelectedWorker(null);
  };

  const handleEmployerSelect = (employer) => {
    setSelectedEmployer(employer);
    setSelectedWorker(null);
  };

  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
  };

  const selectedCompanyData = companyData.find(
    (c) => c.companyName === selectedCompany
  );

  return (
    <div className="workers-page">
      <div className="workers-container">
        <h2 className="workers-title">Worker Management</h2>
       

        {/* Step 1: Select Company */}
        <div className="selection-section">
          <label>Select Company:</label>
          <select value={selectedCompany} onChange={handleCompanySelect}>
            <option value="">-- Choose Company --</option>
            {companyData.map((c, index) => (
              <option key={index} value={c.companyName}>
                {c.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Show Employers */}
        {selectedCompany && selectedCompanyData && (
          <div className="employer-list">
            <h3>Employers in {selectedCompany}:</h3>
            <div className="employer-buttons">
              {selectedCompanyData.employers.map((employer) => (
                <button
                  key={employer.id}
                  onClick={() => handleEmployerSelect(employer)}
                  className={`employer-btn ${
                    selectedEmployer?.id === employer.id ? "active" : ""
                  }`}
                >
                  {employer.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Show Workers */}
        {selectedEmployer && (
          <div className="workers-list">
            <h3>Workers under {selectedEmployer.name}:</h3>
            <table className="workers-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Worker Name</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedEmployer.workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td>{worker.name}</td>
                    <td>{worker.contact}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleWorkerSelect(worker)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Step 4: Show Worker Details & Attendance */}
        {selectedWorker && (
          <div className="attendance-modal">
            <div className="modal-content">
              <h3>Worker Details</h3>
              <p><strong>Name:</strong> {selectedWorker.name}</p>
              <p><strong>Contact:</strong> {selectedWorker.contact}</p>
              <p><strong>Employer:</strong> {selectedEmployer.name}</p>
              <p><strong>Company:</strong> {selectedCompany}</p>

              <h4>Attendance (Last 30 Days):</h4>
              <div className="attendance-grid">
                {selectedWorker.attendance.map((day, index) => (
                  <div
                    key={index}
                    className={`attendance-day ${
                      day.present ? "present" : "absent"
                    }`}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedWorker(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function: Generate random attendance
function generateAttendance() {
  const days = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({ date, present: Math.random() > 0.2 });
  }
  return days.reverse();
}

export default Workers;
