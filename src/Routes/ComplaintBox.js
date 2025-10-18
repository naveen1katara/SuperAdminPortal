import React, { useState, useEffect } from 'react';
import '../Routes/ComplaintBox.css';
function ComplaintBox() {
  // Temporary data (replace with backend data later)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      workerName: 'Ravi Kumar',
      message: 'Internet not working in Lab 3',
      status: 'Pending',
    },
    {
      id: 2,
      workerName: 'Anjali Sharma',
      message: 'AC not cooling properly in Meeting Room',
      status: 'Pending',
    },
  ]);

  // Function to mark complaint as solved
  const handleSolve = (id) => {
    const updated = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: 'Solved' } : complaint
    );
    setComplaints(updated);
  };

  // Placeholder for backend API fetch
  useEffect(() => {
    // Example for later:
    // fetch('/api/complaints')
    //   .then(res => res.json())
    //   .then(data => setComplaints(data));
  }, []);

  return (
    <div className="complaint-container">
      <h2 className="complaint-title">📨 Worker Complaints Dashboard</h2>

      {complaints.length === 0 ? (
        <p className="no-complaints">No complaints found 🎉</p>
      ) : (
        <div className="complaint-grid">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <div className="complaint-header">
                <h3>{complaint.workerName}</h3>
                <span
                  className={`status-badge ${
                    complaint.status === 'Solved' ? 'solved' : 'pending'
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <p className="complaint-message">{complaint.message}</p>

              {complaint.status === 'Pending' && (
                <button
                  onClick={() => handleSolve(complaint.id)}
                  className="solve-btn"
                >
                  Mark as Solved
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComplaintBox;
