  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { FaUserCircle, FaSignOutAlt, FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";
  import { IoMdCreate } from "react-icons/io";
  import logo from "../logo.png";
  import { DotLottiePlayer } from '@dotlottie/react-player';
  import '@dotlottie/react-player/dist/index.css';
  import Swal from 'sweetalert2'; // For beautiful popups

  const ClientProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editPasswordMode, setEditPasswordMode] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem("authToken");
        try {
          const response = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Failed to fetch profile.");
          }
          const data = await response.json();
          setProfile(data.profile);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }, []);

    const handleEditSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to update profile.");
        }
        const data = await response.json();
        setProfile(data.profile);
        setEditMode(false);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        });
      }
    };

    const handlePasswordSubmit = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match!',
        });
      }
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:5000/api/profile/password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to update password.");
        }
        Swal.fire({
          icon: 'success',
          title: 'Password Updated!',
          text: 'Your password has been updated successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        setEditPasswordMode(false);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
        });
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      navigate("/client/clientlogin");
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5">{error}</div>;

    return (
      <div className="container py-4" style={{ backgroundColor: "#f4f7fc", minHeight: "100vh" }}>
        {/* Header Section */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 mb-4"
          style={{
            background: "linear-gradient(45deg, #0056b3, #007bff)",
            color: "white",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "120px", cursor: "pointer" }} />
          <div className="text-center" style={{ flex: 1 }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Welcome to Your Profile</h2>
            <p style={{ fontSize: "16px", fontWeight: "lighter", marginBottom: "0" }}>
              Manage your profile details and update your information.
            </p>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-danger"
              onClick={handleLogout}
              title="Logout"
              style={{
                backgroundColor: "#e74c3c",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
            >
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </div>

        {/* Profile Card Section */}
        <div className="row mt-4">
          {/* Lottie Animation on the Left */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <DotLottiePlayer
              src="https://lottie.host/d51c6183-a186-41ea-919d-4a5cc0595c26/jA1oai0cE9.lottie"
              loop
              autoplay
              style={{ width: "100%", height: "400px", maxWidth: "500px" }}
            />
          </div>

          {/* Profile Details and Edit Options on the Right */}
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: "#ffffff" }}>
              <div
                className="card-header text-center py-3"
                style={{
                  background: "linear-gradient(45deg, #0056b3, #007bff)",
                  color: "white",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <h3 style={{ marginBottom: "0" }}>Profile Overview</h3>
              </div>
              <div className="card-body p-4">
                {!editMode ? (
                  <>
                    <div className="mb-4 d-flex align-items-center">
                      <FaUserCircle className="me-3" size={24} />
                      <div>
                        <strong>Name:</strong> {profile.name}
                      </div>
                    </div>
                    <div className="mb-4 d-flex align-items-center">
                      <FaEnvelope className="me-3" size={24} />
                      <div>
                        <strong>Email:</strong> {profile.email}
                      </div>
                    </div>
                    <div className="mb-4 d-flex align-items-center">
                      <FaHome className="me-3" size={24} />
                      <div>
                        <strong>Flat Number:</strong> {profile.flatNumber}
                      </div>
                    </div>
                    <div className="mb-4 d-flex align-items-center">
                      <FaPhoneAlt className="me-3" size={24} />
                      <div>
                        <strong>Phone Number:</strong> {profile.phoneNumber}
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-warning text-white d-flex align-items-center"
                        onClick={() => setEditMode(true)}
                        style={{ fontWeight: "bold", transition: "all 0.3s ease" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f39c12")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#f1c40f")}
                      >
                        <IoMdCreate size={20} className="me-2" />
                        Edit Profile
                      </button>
                      <button
                        className="btn btn-info text-white d-flex align-items-center"
                        onClick={() => setEditPasswordMode(true)}
                        style={{ fontWeight: "bold", transition: "all 0.3s ease" }}
                      >
                        Change Password
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <button type="submit" className="btn btn-success text-white">
                        Save Changes
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {editPasswordMode && (
                  <form onSubmit={handlePasswordSubmit} className="mt-4">
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <button type="submit" className="btn btn-success text-white">
                        Change Password
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditPasswordMode(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ClientProfile;