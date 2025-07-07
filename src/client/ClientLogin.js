import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import ErrorBoundary from './ErrorBoundary';
import { CSSTransition } from "react-transition-group";

const ClientLogin = () => {
  const [loginError, setLoginError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = "https://flatease-backend.onrender.com/api/auth";

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
        setTimeout(() => navigate("/client/home"), 3000);
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
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating Background Elements */}
      <div style={{
        position: "absolute",
        top: "-50px",
        left: "-50px",
        width: "150px",
        height: "150px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        animation: "float 6s infinite ease-in-out",
      }}></div>
      
      <div style={{
        position: "absolute",
        bottom: "-30px",
        right: "-30px",
        width: "120px",
        height: "120px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        animation: "float 5s infinite ease-in-out",
        animationDelay: "1s",
      }}></div>

      <div className="row w-100 mx-0 justify-content-center">
        {/* Animation Section */}
        <div className="col-lg-5 col-md-6 d-flex justify-content-center align-items-center p-4">
          <ErrorBoundary>
            <div style={{ 
              maxWidth: "500px", 
              width: "100%",
              filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <DotLottiePlayer
                src="https://lottie.host/be9abc05-b321-4290-be40-792fc365e457/20MnlhDMCi.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </ErrorBoundary>
        </div>

        {/* Login Form Section */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div
            className="card shadow-lg w-100"
            style={{
              borderRadius: "20px",
              border: "2px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(255,255,255,0.88)",
              maxWidth: "500px",
              transform: "translateY(0)",
              transition: "all 0.3s ease",
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 25px 40px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
            }}
          >
            {/* Card Header */}
            <div
              className="card-header text-center py-4"
              style={{
                borderBottom: "2px solid rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ 
                  width: "80px", 
                  marginBottom: "1rem",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-5deg) scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0) scale(1)")}
              />
              <h3
                className="mb-2"
                style={{ 
                  color: "#0077b6", 
                  fontWeight: "700",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "1px",
                }}
              >
                FlatEase
              </h3>
              <p style={{ 
                color: "#666", 
                marginBottom: "0",
                fontSize: "0.95rem",
                fontWeight: "500",
              }}>
                Your Gateway to Seamless Living
              </p>
            </div>

            {/* Card Body */}
            <div className="card-body px-4 py-4">
              {loginError && (
                <div
                  className="alert alert-danger rounded-lg py-2"
                  style={{ 
                    fontSize: "0.9rem",
                    transform: "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label text-dark">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    style={{ 
                      padding: "12px 20px",
                      fontSize: "0.9rem",
                      borderRadius: "15px",
                      border: "2px solid #0077b6",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00b4d8";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,180,216,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#0077b6";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-dark">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    style={{ 
                      padding: "12px 20px",
                      fontSize: "0.9rem",
                      borderRadius: "15px",
                      border: "2px solid #0077b6",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00b4d8";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,180,216,0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#0077b6";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{
                    background: "linear-gradient(90deg, #0077b6 0%, #00b4d8 100%)",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    borderRadius: "15px",
                    padding: "12px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,180,216,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>
                    Sign In
                  </span>
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: `linear-gradient(45deg, 
                      transparent 25%,
                      rgba(255,255,255,0.1) 25%,
                      rgba(255,255,255,0.1) 50%,
                      transparent 50%,
                      transparent 75%,
                      rgba(255,255,255,0.1) 75%)`,
                    backgroundSize: "3px 3px",
                    opacity: "0.3",
                    transform: "rotate(45deg)",
                    animation: "shine 3s infinite linear",
                  }}></div>
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
        <div
          style={{
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
            boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
            animation: "welcomeEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            border: "2px solid rgba(0,180,216,0.3)",
          }}
        >
          Welcome To FlatEase
        </div>
      </CSSTransition>

      {/* Global Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes welcomeEntrance {
          0% { 
            transform: translate(-50%, -30%) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientLogin;