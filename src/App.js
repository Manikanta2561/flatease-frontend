import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ClientLogin from "./client/ClientLogin";
import ClientHome from "./client/ClientHome";
import ClientProfile from "./client/ClientProfile";
import ClientComplaints from "./client/ClientComplaints";
import AboutUs from "./client/AboutUs";
import EventsPage from "./client/EventsPage";
import NotificationsPage from "./client/NotificationsPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminFlats from "./admin/AdminFlats";
import AdminComplaints from "./admin/AdminComplaints";
import AdminNotifications from "./admin/AdminNotifications";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Client Routes */}
        <Route path="/client/clientlogin" element={<ClientLogin />} />
        <Route path="/client/home" element={<ClientHome />}>
          <Route index element={<></>} />  {/* Empty element for home */}
          <Route path="clientprofile" element={<ClientProfile />} />
          <Route path="complaints" element={<ClientComplaints />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-flats" element={<AdminFlats />} />
        <Route path="/admin/view-complaints" element={<AdminComplaints />} />
        <Route path="/admin/notify-customers" element={<AdminNotifications />} />
      </Routes>
    </Router>
  );
};

export default App;