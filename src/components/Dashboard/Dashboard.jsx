import React from "react";
import { useLocation } from "react-router-dom";

// Custom Components
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";

// Custom CSS
import "./Dashboard.css";

function Dashboard() {
    const location = useLocation();
    console.log("location", location);
    return (
        <section className="dashboard-section">
            {location?.state?.user_type === "admin" ? (
                <AdminDashboard />
            ) : (
                <UserDashboard />
            )}
        </section>
    );
}

export default Dashboard;
