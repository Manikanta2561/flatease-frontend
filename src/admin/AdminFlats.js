import React, { useState, useEffect } from "react";
import { Button, Form, Container, Table, Modal } from "react-bootstrap";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminFlats = () => {
  const [flats, setFlats] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    flatNumberToRegister: null
  });

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    try {
      const response = await axios.get("https://flatease-backend.onrender.com/api/flats");
      setFlats(response.data);
    } catch (error) {
      console.error("Error fetching flats:", error);
      setMessage("Failed to load flats.");
    }
  };

  const registerTenant = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://flatease-backend.onrender.com/api/register", {
        ...formData,
        flatNumber: formData.flatNumberToRegister
      });
      setMessage(response.data.message);
      fetchFlats();
      setShowModal(false);
    } catch (error) {
      console.error("Error registering tenant:", error);
      setMessage("Error registering tenant.");
    }
  };

  const deleteFlat = async (flatNumber) => {
    try {
      const response = await axios.delete(`https://flatease-backend.onrender.com/api/flats/${flatNumber}`);
      setMessage(response.data.message);
      fetchFlats();
    } catch (error) {
      console.error("Error deleting flat:", error);
      setMessage("Error deleting flat.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar />
      
      <Container fluid style={{ marginLeft: "250px", padding: "20px" }}>
        <h1 className="text-center mb-4">Manage Flats</h1>
        
        {message && <div className="alert alert-info">{message}</div>}

        <Table responsive striped bordered hover>
          <thead className="bg-primary text-white">
            <tr>
              <th>Flat Number</th>
              <th>Status</th>
              <th>Tenant</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flats.map(flat => (
              <tr key={flat.flatNumber}>
                <td>{flat.flatNumber}</td>
                <td>{flat.status.charAt(0).toUpperCase() + flat.status.slice(1)}</td>
                <td>{flat.tenant?.name || "N/A"}</td>
                <td>{flat.tenant?.phoneNumber || "N/A"}</td>
                <td>{flat.tenant?.email || "N/A"}</td>
                <td>
                  {flat.status === "vacant" ? (
                    <Button variant="success" onClick={() => {
                      setFormData({ ...formData, flatNumberToRegister: flat.flatNumber });
                      setShowModal(true);
                    }}>
                      Register Tenant
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={() => deleteFlat(flat.flatNumber)}>
                      Delete Tenant
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Register Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={registerTenant}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Register Tenant
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminFlats;