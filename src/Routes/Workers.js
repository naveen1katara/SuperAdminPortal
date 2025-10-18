import React, { useState } from "react";
import "../Routes/Workers.css";

function Workers() {
  // Sample worker data (could come from an API)
  const [workers] = useState([
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
    {
      id: 3,
      name: "Rahul Verma",
      contact: "+91 9090909090",
      attendance: generateAttendance(),
    },
    {
      id: 4,
      name: "Priya Patel",
      contact: "+91 7788991122",
      attendance: generateAttendance(),
    },
    {
      id: 5,
      name: "Vikram Singh",
      contact: "+91 8899776655",
      attendance: generateAttendance(),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Filter workers based on search input
  const filteredWorkers = workers.filter((w) =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to show attendance for selected worker
  const handleViewAttendance = (worker) => {
    setSelectedWorker(worker);
  };

  return (
    <div className="workers-page">
      <div className="workers-container">
        <h2 className="workers-title">Workers Management</h2>
        <p className="workers-subtitle">View and track worker attendance</p>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search worker by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Workers Table */}
        <table className="workers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Worker Name</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.contact}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleViewAttendance(worker)}
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No workers found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Attendance Modal */}
        {selectedWorker && (
          <div className="attendance-modal">
            <div className="modal-content">
              <h3>{selectedWorker.name}'s Attendance (Last 30 Days)</h3>
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

// Helper function to generate random attendance for the past 30 days
function generateAttendance() {
  const days = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push({ date, present: Math.random() > 0.2 }); // 80% present chance
  }
  return days.reverse();
}

export default Workers;
