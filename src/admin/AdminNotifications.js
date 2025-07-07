import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AdminNavbar from "./AdminNavbar";

const AdminNotifications = () => {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showEditNotifyModal, setShowEditNotifyModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    deleteAt: "",
  });
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    deleteAt: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const [eventsRes, notificationsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setEvents(eventsRes.data);
      setNotifications(notificationsRes.data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  const handleSubmit = async (type) => {
    try {
      const token = localStorage.getItem("authToken");
      const endpoint =
        type === "event"
          ? "http://localhost:5000/api/events"
          : "http://localhost:5000/api/notifications";
      await axios.post(endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setShowEventModal(false);
      setShowNotifyModal(false);
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        deleteAt: "",
      });
    } catch (err) {
      setError(`Failed to create ${type}`);
    }
  };

  const handleEdit = async (type) => {
    try {
      const token = localStorage.getItem("authToken");
      const endpoint =
        type === "event"
          ? `http://localhost:5000/api/events/${editData.id}`
          : `http://localhost:5000/api/notifications/${editData.id}`;
      await axios.put(endpoint, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setShowEditEventModal(false);
      setShowEditNotifyModal(false);
    } catch (err) {
      setError(`Failed to update ${type}`);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      const token = localStorage.getItem("authToken");
      const endpoint =
        type === "event"
          ? `http://localhost:5000/api/events/${id}`
          : `http://localhost:5000/api/notifications/${id}`;
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      setError(`Failed to delete ${type}`);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar />

      <Container fluid style={{ marginLeft: "250px", padding: "20px" }}>
        <div className="d-flex justify-content-between mb-4">
          <h1>Customer Communications</h1>
          <div>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => setShowEventModal(true)}
            >
              Create Event
            </Button>
            <Button variant="info" onClick={() => setShowNotifyModal(true)}>
              Send Notification
            </Button>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <h3 className="mt-5">Active Events</h3>
        <div className="row">
          {events.map((event) => (
            <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
              <Card className="h-100 shadow">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <DotLottieReact
                    src="https://lottie.host/39d3ac6a-2aeb-4c16-8497-6fcb02763116/hriKHRNmjj.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>{event.description}</Card.Text>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setEditData({
                        id: event._id,
                        title: event.title,
                        description: event.description,
                        startDate: event.startDate,
                        endDate: event.endDate,
                        deleteAt: event.deleteAt,
                      });
                      setShowEditEventModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("event", event._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        <h3 className="mt-5">Recent Notifications</h3>
        <div className="row">
          {notifications.map((notification) => (
            <div className="col-md-6 col-lg-4 mb-4" key={notification._id}>
              <Card className="h-100 shadow">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <DotLottieReact
                    src="https://lottie.host/f846afe8-4e91-4469-9c69-cc57375bc25e/tb4X5mwQkB.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text>{notification.description}</Card.Text>
                  <Card.Footer className="text-muted">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Card.Footer>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setEditData({
                        id: notification._id,
                        description: notification.description,
                        deleteAt: notification.deleteAt,
                      });
                      setShowEditNotifyModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("notification", notification._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* Event Modal */}
        <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Create New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Auto-Delete Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.deleteAt}
                  onChange={(e) =>
                    setFormData({ ...formData, deleteAt: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEventModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSubmit("event")}>
              Create Event
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Notification Modal */}
        <Modal show={showNotifyModal} onHide={() => setShowNotifyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Send Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Notification Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Auto-Delete Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={formData.deleteAt}
                  onChange={(e) =>
                    setFormData({ ...formData, deleteAt: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowNotifyModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSubmit("notification")}>
              Send Notification
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Event Modal */}
        <Modal show={showEditEventModal} onHide={() => setShowEditEventModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </Form.Group>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editData.startDate}
                      onChange={(e) =>
                        setEditData({ ...editData, startDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={editData.endDate}
                      onChange={(e) =>
                        setEditData({ ...editData, endDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Auto-Delete Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={editData.deleteAt}
                  onChange={(e) =>
                    setEditData({ ...editData, deleteAt: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditEventModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleEdit("event")}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Notification Modal */}
        <Modal show={showEditNotifyModal} onHide={() => setShowEditNotifyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Notification Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Auto-Delete Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={editData.deleteAt}
                  onChange={(e) =>
                    setEditData({ ...editData, deleteAt: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditNotifyModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleEdit("notification")}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminNotifications;