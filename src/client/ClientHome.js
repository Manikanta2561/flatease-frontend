import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../logo.png";
import { FaSignOutAlt, FaHome, FaComments, FaBell, FaInfoCircle, FaChartLine, FaUser } from "react-icons/fa";
import { Carousel, Card, Row, Col } from "react-bootstrap";

const ClientHome = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".sidebar") && !e.target.closest(".hamburger")) {
          setIsSidebarOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isSidebarOpen, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/client/clientlogin");
  };

  const features = [
    {
      title: "Real-time Updates",
      description: "Instant notifications about your complaints and community updates",
      icon: <FaBell className="text-primary mb-3" size="2em" />,
    },
    {
      title: "Easy Communication",
      description: "Direct messaging with management and quick complaint resolution",
      icon: <FaComments className="text-primary mb-3" size="2em" />,
    },
    {
      title: "Comprehensive Tracking",
      description: "Monitor complaint status and maintenance progress in real-time",
      icon: <FaChartLine className="text-primary mb-3" size="2em" />,
    },
  ];

  return (
    <div className="d-flex vh-100 client-portal">
      {/* Sidebar */}
      <div
        className={`sidebar bg-light text-dark p-3 flex-column ${
          isSidebarOpen || !isMobile ? "d-flex" : "d-none"
        }`}
        style={{
          width: "280px",
          height: "100vh",
          position: "fixed",
          zIndex: 1050,
          boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="text-center mb-4 pt-3">
          <img src={logo} alt="Logo" className="logo-img" style={{ width: "160px" }} />
          <h3 className="mt-3 mb-0 text-primary">FlatEase Portal</h3>
        </div>
        
        <ul className="nav flex-column flex-grow-1">
        <NavItem to="/client/home" icon={<FaHome />} label="Home" setIsSidebarOpen={setIsSidebarOpen} />
          <NavItem to="/client/home/clientprofile" icon={<FaUser />} label="Profile" setIsSidebarOpen={setIsSidebarOpen} />
          <NavItem to="/client/home/complaints" icon={<FaComments />} label="Complaints" setIsSidebarOpen={setIsSidebarOpen} />
          <NavItem to="/client/home/events" icon={<FaComments />} label="Events" setIsSidebarOpen={setIsSidebarOpen} />
          <NavItem to="/client/home/notifications" icon={<FaBell />} label="Notifications" setIsSidebarOpen={setIsSidebarOpen} />
          <NavItem to="/client/home/aboutus" icon={<FaInfoCircle />} label="About Us" setIsSidebarOpen={setIsSidebarOpen} />
       </ul>
        <button
          className="btn btn-outline-primary d-flex align-items-center justify-content-center py-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Hamburger Menu */}
      {isMobile && (
        <button
          className="hamburger btn btn-light position-fixed m-3"
          style={{ zIndex: 1060 }}
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      {/* Main Content Area */}
      <div
        className="flex-grow-1 p-4 main-content"
        style={{
          marginLeft: isMobile ? 0 : "280px",
          transition: "margin 0.3s ease",
          backgroundColor: "#f8f9fa",
        }}
      >
        {location.pathname === "/client/home" && (
          <>
            {/* Modern Carousel */}
            <Carousel 
              interval={5000} 
              fade 
              className="mb-5 rounded-3 overflow-hidden shadow-lg"
            >
              {[
                {
                  title: "Welcome to FlatEase",
                  text: "Your Comprehensive Apartment Management Solution",
                  bg: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                },
                {
                  title: "Effortless Management",
                  text: "Streamlined Solutions for Modern Living",
                  bg: "linear-gradient(135deg, #0061ff 0%, #60efff 100%)",
                },
                {
                  title: "Community Connected",
                  text: "Stay Updated with Real-time Notifications",
                  bg: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                },
              ].map((slide, index) => (
                <Carousel.Item key={index}>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      height: "50vh",
                      minHeight: "400px",
                      background: slide.bg,
                    }}
                  >
                    <div className="text-center text-white p-4">
                      <h1 className="display-5 fw-bold mb-3">{slide.title}</h1>
                      <p className="fs-4 opacity-90">{slide.text}</p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* Feature Cards */}
            <Row className="g-4 mb-5">
              {features.map((feature, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                  <Card className="h-100 shadow-sm feature-card">
                    <Card.Body className="text-center">
                      {feature.icon}
                      <Card.Title className="fs-5 fw-bold mb-3">
                        {feature.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {feature.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Stats Section */}
            <Row className="g-4 mb-5">
              {[
                { title: "Active Users", value: "10K+", color: "#4e73df" },
                { title: "Resolved Cases", value: "95%", color: "#1cc88a" },
                { title: "Response Time", value: "<24h", color: "#f6c23e" },
              ].map((stat, index) => (
                <Col key={index} xs={12} md={4}>
                  <div
                    className="p-4 rounded-3 shadow-sm text-white"
                    style={{ backgroundColor: stat.color }}
                  >
                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                    <p className="mb-0 opacity-90">{stat.title}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        <Outlet />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, setIsSidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <li className="nav-item mb-2">
      <Link
        to={to}
        className={`nav-link d-flex align-items-center py-3 px-4 rounded ${
          isActive ? "bg-primary text-white" : "text-dark hover-bg"
        }`}
        onClick={handleClick}
      >
        <span className="me-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default ClientHome;