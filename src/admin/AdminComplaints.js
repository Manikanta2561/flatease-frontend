import React, { useState, useEffect } from "react";
import { Table, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { FaStar } from "react-icons/fa";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({}); // To store feedback ratings

  const statusColors = {
    Pending: "#e74c3c",
    "Worker Assigned": "#f1c40f",
    Resolved: "#2ecc71",
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("https://flatease-backend.onrender.com/api/admin/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data.complaints);

      // Fetch feedback for each complaint
      const feedbackData = {};
      for (const complaint of response.data.complaints) {
        if (complaint.status === "Resolved") {
          const feedbackResponse = await axios.get(
            `https://flatease-backend.onrender.com/api/complaints/${complaint._id}/feedback`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          feedbackData[complaint._id] = feedbackResponse.data.rating || 0;
        }
      }
      setFeedback(feedbackData);
    } catch (err) {
      setError("Failed to fetch complaints");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `https://flatease-backend.onrender.com/api/complaints/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(
        complaints.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );

      // If status is changed to "Resolved", fetch feedback
      if (newStatus === "Resolved") {
        const feedbackResponse = await axios.get(
          `https://flatease-backend.onrender.com/api/complaints/${id}/feedback`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFeedback((prev) => ({ ...prev, [id]: feedbackResponse.data.rating || 0 }));
      }
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const handleFeedbackChange = async (id, rating) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `https://flatease-backend.onrender.com/api/complaints/${id}/feedback`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFeedback((prev) => ({ ...prev, [id]: rating }));
    } catch (err) {
      setError("Failed to update feedback");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar />

      <Container fluid style={{ marginLeft: "250px", padding: "20px" }}>
        <h1 className="text-center mb-4">Manage Complaints</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Table striped bordered hover responsive>
          <thead className="bg-primary text-white">
            <tr>
              <th>Flat #</th>
              <th>Complaint</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint._id}
                style={{ backgroundColor: statusColors[complaint.status] }}
              >
                <td>{complaint.user?.flatNumber || "N/A"}</td>
                <td>{complaint.complaint}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.priority}</td>
                <td>
                  <Form.Select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    style={{
                      width: "fit-content",
                      borderColor: "#2c3e50",
                      backgroundColor: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {Object.keys(statusColors).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  {complaint.status === "Resolved" && (
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          style={{
                            color: i < (feedback[complaint._id] || 0) ? "#FFD700" : "#ddd",
                            cursor: "pointer",
                            fontSize: "1.2rem",
                          }}
                          onClick={() => handleFeedbackChange(complaint._id, i + 1)}
                        />
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminComplaints;