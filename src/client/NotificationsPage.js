import React, { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  const getAuthToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const notificationsRes = await axios.get("https://flatease-backend.onrender.com/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(notificationsRes.data);
      } catch (err) {
        setError("Failed to fetch notifications");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 className="mt-5">Recent Notifications</h3>
      <div className="row">
        {notifications.map((notification) => (
          <div className="col-md-6 col-lg-4 mb-4" key={notification._id}>
            <Card className="h-100 shadow">
              <div className="lottie-container">
                <DotLottieReact
                  src="https://lottie.host/f846afe8-4e91-4469-9c69-cc57375bc25e/tb4X5mwQkB.lottie"
                  loop
                  autoplay
                />
              </div>
              <Card.Body>
                <Card.Text>{notification.description}</Card.Text>
                <Card.Footer className="text-muted">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;