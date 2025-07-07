import React from "react";
import { Container, Image } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import logo from "./logo.png";

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminNavbar />
      
      <div
        style={{
          marginLeft: "250px",
          flex: 1,
          padding: "20px",
          transition: "margin 0.3s",
          "@media (maxWidth: 768px)": {
            marginLeft: "0"
          }
        }}
      >
        <Image
          src={logo}
          alt="Logo"
          fluid
          className="mb-4 d-block mx-auto"
          style={{ maxWidth: "400px" }}
        />
        <h2 className="text-center">Welcome, Admin</h2>
      </div>
    </div>
  );
};

export default AdminDashboard;