import React, { useState, useEffect } from "react";
import "../Routes/ComplaintBox.css";

function ComplaintBox() {
  // Sample data (you can replace with backend data later)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      workerName: "Ravi Kumar",
      employerName: "Skyline Builders",
      contact: "+91 9876543210",
      message: "Internet not working in Lab 3",
      status: "Pending",
      adminResponse: "",
    },
    {
      id: 2,
      workerName: "Anjali Sharma",
      employerName: "GreenLand Contractors",
      contact: "+91 9988776655",
      message: "AC not cooling properly in Meeting Room",
      status: "Pending",
      adminResponse: "",
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Open reply modal
  const handleReply = (complaint) => {
    setSelectedComplaint(complaint);
    setReplyMessage("");
  };

  // Send reply (mark solved + store admin response)
  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      alert("Please write a reply before sending.");
      return;
    }

    const updatedComplaints = complaints.map((c) =>
      c.id === selectedComplaint.id
        ? { ...c, status: "Solved", adminResponse: replyMessage }
        : c
    );

    setComplaints(updatedComplaints);
    setSelectedComplaint(null);
    setReplyMessage("");
  };

  useEffect(() => {
    // Later you can replace with API fetch here
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
                    complaint.status === "Solved" ? "solved" : "pending"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <div className="complaint-details">
                <p>
                  <strong>Employer:</strong> {complaint.employerName}
                </p>
                <p>
                  <strong>Contact:</strong> {complaint.contact}
                </p>
              </div>

              <p className="complaint-message">
                <strong>Complaint:</strong> {complaint.message}
              </p>

              {/* Admin Response */}
              {complaint.adminResponse && (
                <div className="admin-reply">
                  <strong>Admin Response:</strong>
                  <p>{complaint.adminResponse}</p>
                </div>
              )}

              {/* If Pending */}
              {complaint.status === "Pending" && (
                <button
                  onClick={() => handleReply(complaint)}
                  className="solve-btn"
                >
                  Resolve & Reply
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {selectedComplaint && (
        <div className="reply-modal-overlay">
          <div className="reply-modal">
            <h3>Reply to {selectedComplaint.workerName}</h3>
            <p className="complaint-detail">
              <strong>Employer:</strong> {selectedComplaint.employerName}
            </p>
            <p className="complaint-detail">
              <strong>Contact:</strong> {selectedComplaint.contact}
            </p>
            <p className="complaint-detail">
              <strong>Complaint:</strong> {selectedComplaint.message}
            </p>

            <textarea
              rows="4"
              placeholder="Write your response message here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setSelectedComplaint(null)}
              >
                Cancel
              </button>
              <button className="send-btn" onClick={handleSendReply}>
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintBox;
