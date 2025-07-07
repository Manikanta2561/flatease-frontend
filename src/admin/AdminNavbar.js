import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBuilding, FaEnvelope, FaPhoneAlt, FaBars, FaSignOutAlt } from "react-icons/fa";
import logo from "./logo.png";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      setIsSidebarOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`admin-sidebar bg-dark text-white ${isSidebarOpen ? "open" : "closed"}`}
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          zIndex: 1000,
          transition: "transform 0.3s ease",
          transform: isMobile ? (isSidebarOpen ? "translateX(0)" : "translateX(-100%)") : "none"
        }}
      >
        <div className="text-center p-3">
          <img src={logo} alt="Logo" style={{ width: "120px" }} />
          <h4 className="mt-2">FlatEase Admin</h4>
        </div>

        <nav className="nav flex-column p-3">
          <Link
            to="/admin/manage-flats"
            className={`nav-link text-white mb-2 ${isActive("/admin/manage-flats") ? "active" : ""}`}
            style={{
              borderRadius: "5px",
              backgroundColor: isActive("/admin/manage-flats") ? "#007bff" : "transparent",
              transition: "all 0.3s"
            }}
          >
            <FaBuilding className="me-2" /> Manage Flats
          </Link>

          <Link
            to="/admin/view-complaints"
            className={`nav-link text-white mb-2 ${isActive("/admin/view-complaints") ? "active" : ""}`}
            style={{
              borderRadius: "5px",
              backgroundColor: isActive("/admin/view-complaints") ? "#007bff" : "transparent",
              transition: "all 0.3s"
            }}
          >
            <FaEnvelope className="me-2" /> View Complaints
          </Link>

          <Link
            to="/admin/notify-customers"
            className={`nav-link text-white mb-2 ${isActive("/admin/notify-customers") ? "active" : ""}`}
            style={{
              borderRadius: "5px",
              backgroundColor: isActive("/admin/notify-customers") ? "#007bff" : "transparent",
              transition: "all 0.3s"
            }}
          >
            <FaPhoneAlt className="me-2" /> Notify Customers
          </Link>

          <button
            onClick={handleLogout}
            className="btn btn-danger mt-auto"
            style={{ width: "100%", marginTop: "auto" }}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          className="btn btn-dark position-fixed"
          style={{ zIndex: 1100, top: "10px", left: "10px" }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>
      )}

      {/* Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="position-fixed bg-dark bg-opacity-50"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            transition: "opacity 0.3s"
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNavbar;