import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CSSTransition } from "react-transition-group";
import ErrorBoundary from './ErrorBoundary';

const AdminLogin = () => {
  const [loginError, setLoginError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = "https://flatease-backend.onrender.com/api/admin";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setShowWelcome(true);
        setTimeout(() => navigate("/admin/dashboard"), 3000);
      } else {
        setLoginError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setLoginError("Something went wrong! Please try again later.");
    }
  };

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, document.title, window.location.href);
      navigate("/");
    });
  }, [navigate]);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
        overflow: "hidden",
      }}
    >
      <div className="row w-100 mx-0 justify-content-center">
        {/* Animation Section */}
        <div className="col-lg-5 col-md-6 d-flex justify-content-center align-items-center p-4">
          <ErrorBoundary>
            <div style={{ width: "100%", maxWidth: "500px" }}>
              <DotLottieReact
                src="https://lottie.host/007bbd86-bc5e-41b2-b1b9-e3b58076211c/DRiIgPe3R5.lottie"
                loop
                autoplay
                style={{
                  width: "100%", // Ensures animation fills the available space horizontally
                  height: "auto", // Maintain aspect ratio
                  maxWidth: "80vw", // Scale with the viewport width
                  maxHeight: "80vh", // Scale with the viewport height
                  objectFit: "contain", // Prevent stretching, maintain the aspect ratio
                }}
              />
            </div>
          </ErrorBoundary>
        </div>

        {/* Login Form Section */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="card shadow-lg w-100" style={{
            borderRadius: "20px",
            border: "2px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.9)",
            maxWidth: "500px"
          }}>
            {/* Card Header */}
            <div className="card-header text-center py-4" style={{
              borderBottom: "2px solid rgba(0,0,0,0.1)",
              backgroundColor: "rgba(255,255,255,0.95)"
            }}>
              <img src={logo} alt="Logo" style={{ width: "80px", marginBottom: "1rem" }} />
              <h3 className="mb-2" style={{ color: "#0077b6", fontWeight: "700" }}>
                FlatEase
              </h3>
              <p style={{ color: "#666", marginBottom: "0" }}>
                Admin Login
              </p>
            </div>

            {/* Card Body */}
            <div className="card-body px-4 py-4">
              {loginError && (
                <div className="alert alert-danger rounded-lg py-2">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control rounded-pill"
                    placeholder="Enter email"
                    required
                    style={{ padding: "12px 20px" }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-dark">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-pill"
                    placeholder="Password"
                    required
                    style={{ padding: "12px 20px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 rounded-pill py-2"
                  style={{
                    background: "linear-gradient(90deg, #0077b6 0%, #00b4d8 100%)",
                    border: "none",
                    fontSize: "1.1rem",
                    fontWeight: "600"
                  }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Animation */}
      <CSSTransition
        in={showWelcome}
        timeout={1000}
        classNames="welcome-fade"
        unmountOnExit
      >
        <div className="welcome-message" style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(255,255,255,0.95)",
          padding: "25px 40px",
          borderRadius: "15px",
          color: "#0077b6",
          fontSize: "1.5rem",
          fontWeight: "700",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          animation: "fadeIn 1s forwards"
        }}>
          Welcome Back, Admin! 🎉
        </div>
      </CSSTransition>
    </div>
  );
};

export default AdminLogin;
