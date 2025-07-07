import React, { useState, useEffect, useRef } from "react";
import { Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentLottieIndex, setCurrentLottieIndex] = useState(0);

  const lottieUrls = [
    "https://lottie.host/8fd2c646-9f95-4f41-a832-42c71ea0cd10/EpdvOwere8.lottie",
    "https://lottie.host/7c48942b-764b-409e-87f7-aa3c29eb8226/ZYO5Qhv1nM.lottie",
    "https://lottie.host/e7e77aaf-df05-4292-a1ee-f4d11aa4aeff/YJo46yQkCx.lottie",
  ];

  const intervalRef = useRef(null);

  const getAuthToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const eventsRes = await axios.get("https://flatease-backend.onrender.com/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(eventsRes.data);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Start the Lottie animation loop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentLottieIndex((prevIndex) => (prevIndex + 1) % lottieUrls.length);
    }, 3000); // Change animation every 3 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lottieUrls.length]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="p-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 className="mt-3 mb-4 text-center">Active Events</h3>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
            <Card className="h-100 shadow-sm border-0">
              <div className="lottie-container" style={{ height: "200px", overflow: "hidden" }}>
                <DotLottieReact
                  src={lottieUrls[currentLottieIndex]} // Use the current Lottie URL
                  loop
                  autoplay
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="mb-3">{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">{event.description}</Card.Text>
                <button className="btn btn-primary mt-3 align-self-start">
                  View Details
                </button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;