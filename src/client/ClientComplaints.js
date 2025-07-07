import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import {
  FaExclamationCircle,
  FaStar,
  FaTimes,
  FaCheck,
  FaInfoCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styled from "styled-components";

Modal.setAppElement("#root");

// Styled Components
const StatusBadge = styled.span`
  background: ${(props) => props.color};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }
`;

const Card = styled.div`
  padding: 20px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#0066ff"};
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${(props) => props.hoverColor || "#0052cc"};
    transform: translateY(-1px);
  }
`;

const Title = styled.h1`
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.h2`
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  height: 100px;
  resize: none;
  margin-bottom: 15px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 16px 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FeedbackSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const StarRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

// Lottie Animations
const LOTTIE_ANIMATIONS = {
  Electrical:
    "https://lottie.host/c02505b6-88ee-4552-a9c2-bc36560fe9da/zkxIUCxa6Q.lottie",
  Plumbing:
    "https://lottie.host/3d50e120-f5ca-40ce-8e87-7029f9402f4d/lLBP3fxqaZ.lottie",
  Cleaning:
    "https://lottie.host/f37f10ae-45bf-431a-a5cd-e76cddf4ab5d/Pka76wKVZw.lottie",
  Security:
    "https://lottie.host/ea0239da-cd5b-49be-bbf8-c5bb115470f8/516jmLNkE2.lottie",
  Other:
    "https://lottie.host/ea0239da-cd5b-49be-bbf8-c5bb115470f8/516jmLNkE2.lottie",
};

const ClientComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedbackModalIsOpen, setFeedbackModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newComplaint, setNewComplaint] = useState({
    complaint: "",
    complaintType: "Electrical",
    priority: "Medium",
    estimatedResolutionTime: "1-3 hours",
  });
  const [feedback, setFeedback] = useState({
    rating: 0,
    description: "",
    isResolved: false,
  });
  const [editComplaint, setEditComplaint] = useState({
    complaint: "",
    complaintType: "Electrical",
    priority: "Medium",
    estimatedResolutionTime: "1-3 hours",
  });

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchComplaints();
  }, [token]);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("https://flatease-backend.onrender.com/api/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://flatease-backend.onrender.com/api/complaints", newComplaint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComplaints();
      setModalIsOpen(false);
      setNewComplaint({
        complaint: "",
        complaintType: "Electrical",
        priority: "Medium",
        estimatedResolutionTime: "1-3 hours",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  const handleEditComplaint = async () => {
    try {
      await axios.put(
        `https://flatease-backend.onrender.com/api/complaints/${selectedComplaint._id}`,
        editComplaint,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints();
      setEditModalIsOpen(false);
    } catch (error) {
      console.error("Error editing complaint:", error);
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      await axios.delete(`https://flatease-backend.onrender.com/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.put(
        `https://flatease-backend.onrender.com/api/complaints/${selectedComplaint._id}/feedback`,
        {
          feedback: feedback.rating,
          feedbackDescription: feedback.description,
          isResolved: feedback.isResolved,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints();
      setFeedbackModalIsOpen(false);
      setFeedback({ rating: 0, description: "", isResolved: false });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#e74c3c";
      case "Worker Assigned":
        return "#f1c40f";
      case "Resolved":
        return "#2ecc71";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div style={{ padding: "24px", fontFamily: "'Inter', sans-serif", maxWidth: "1400px", margin: "0 auto" }}>
      <Flex>
        <Title>Complaint Management</Title>
        <Button bgColor="#0066ff" hoverColor="#0052cc" onClick={() => setModalIsOpen(true)}>
          <FaInfoCircle size={16} />
          New Complaint
        </Button>
      </Flex>

      {/* New Complaint Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Subtitle>Submit New Complaint</Subtitle>
        <form onSubmit={handleSubmitComplaint}>
          <div>
            <Label>Description</Label>
            <TextArea
              value={newComplaint.complaint}
              onChange={(e) => setNewComplaint({ ...newComplaint, complaint: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Type</Label>
            <Select
              value={newComplaint.complaintType}
              onChange={(e) => setNewComplaint({ ...newComplaint, complaintType: e.target.value })}
            >
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Select
              value={newComplaint.priority}
              onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value })}
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </div>

          <Button type="submit" bgColor="#28a745" hoverColor="#218838">
            Submit Complaint
          </Button>
        </form>
      </Modal>

      {/* Edit Complaint Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Subtitle>Edit Complaint</Subtitle>
        <form onSubmit={handleEditComplaint}>
          <div>
            <Label>Description</Label>
            <TextArea
              value={editComplaint.complaint}
              onChange={(e) => setEditComplaint({ ...editComplaint, complaint: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Type</Label>
            <Select
              value={editComplaint.complaintType}
              onChange={(e) => setEditComplaint({ ...editComplaint, complaintType: e.target.value })}
            >
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Select
              value={editComplaint.priority}
              onChange={(e) => setEditComplaint({ ...editComplaint, priority: e.target.value })}
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </div>

          <Button type="submit" bgColor="#28a745" hoverColor="#218838">
            Save Changes
          </Button>
        </form>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackModalIsOpen}
        onRequestClose={() => setFeedbackModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Subtitle>Submit Feedback</Subtitle>
        <div>
          <Label>Rating</Label>
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                style={{
                  cursor: "pointer",
                  color: star <= feedback.rating ? "#FFD700" : "#ddd",
                  fontSize: "24px",
                }}
                onClick={() => setFeedback({ ...feedback, rating: star })}
              />
            ))}
          </StarRating>
        </div>

        <div>
          <Label>Feedback Description</Label>
          <TextArea
            value={feedback.description}
            onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
            placeholder="Describe your experience..."
          />
        </div>

        <div>
          <Label>
            <input
              type="checkbox"
              checked={feedback.isResolved}
              onChange={(e) => setFeedback({ ...feedback, isResolved: e.target.checked })}
              style={{ marginRight: "8px" }}
            />
            Is the issue resolved?
          </Label>
        </div>

        <Flex>
          <Button bgColor="#e74c3c" hoverColor="#c0392b" onClick={() => setFeedbackModalIsOpen(false)}>
            Cancel
          </Button>
          <Button bgColor="#28a745" hoverColor="#218838" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </Flex>
      </Modal>

      {/* Complaints Grid */}
      <Grid>
        {complaints.map((complaint) => (
          <Card key={complaint._id}>
            <Flex>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", lineHeight: "1.4", marginBottom: "8px" }}>
                  {complaint.complaint}
                </h3>
                <StatusBadge color={getStatusColor(complaint.status)}>
                  {complaint.status}
                </StatusBadge>
              </div>
              <FaExclamationCircle size={24} color={getStatusColor(complaint.status)} />
            </Flex>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
              <div>
                <Label>TYPE</Label>
                <div style={{ fontWeight: "500", color: "#1a1a1a", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: getStatusColor(complaint.status) }} />
                  {complaint.complaintType}
                </div>
              </div>

              <div>
                <Label>PRIORITY</Label>
                <div style={{ fontWeight: "500", color: "#1a1a1a", textTransform: "capitalize" }}>
                  {complaint.priority}
                </div>
              </div>

              <div>
                <Label>DATE</Label>
                <div style={{ fontWeight: "500", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div style={{ height: "120px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
              <DotLottieReact
                src={LOTTIE_ANIMATIONS[complaint.complaintType]}
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {complaint.status === "Pending" && (
              <Flex>
                <Button bgColor="#ffc107" hoverColor="#e0a800" onClick={() => {
                  setSelectedComplaint(complaint);
                  setEditComplaint({
                    complaint: complaint.complaint,
                    complaintType: complaint.complaintType,
                    priority: complaint.priority,
                    estimatedResolutionTime: complaint.estimatedResolutionTime,
                  });
                  setEditModalIsOpen(true);
                }}>
                  <FaEdit size={14} />
                  Edit
                </Button>
                <Button bgColor="#dc3545" hoverColor="#c82333" onClick={() => handleDeleteComplaint(complaint._id)}>
                  <FaTrash size={14} />
                  Delete
                </Button>
              </Flex>
            )}

            {complaint.status !== "Pending" && (
              <Button bgColor="#dc3545" hoverColor="#c82333" onClick={() => handleDeleteComplaint(complaint._id)}>
                <FaTrash size={14} />
                Delete
              </Button>
            )}

            {complaint.status === "Resolved" && !complaint.feedback && (
              <Button bgColor="#0066ff" hoverColor="#0052cc" onClick={() => {
                setSelectedComplaint(complaint);
                setFeedbackModalIsOpen(true);
              }}>
                <FaStar size={14} />
                Provide Feedback
              </Button>
            )}

            {complaint.feedback && (
              <FeedbackSection>
                <Flex>
                  <FaStar color="#FFD700" size={18} />
                  <span style={{ fontWeight: "600", color: "#1a1a1a", fontSize: "14px" }}>Your Feedback</span>
                </Flex>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      style={{ color: i < complaint.feedback ? "#FFD700" : "#e0e0e0", transition: "color 0.2s ease" }}
                    />
                  ))}
                </StarRating>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#666" }}>
                  {complaint.feedbackDescription}
                </p>
              </FeedbackSection>
            )}
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default ClientComplaints;