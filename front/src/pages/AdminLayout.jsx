import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Link, Outlet } from 'react-router-dom';
import '../styles/adminDashboard.css'; // Import the CSS file

const AdminLayout = () => {
    return (
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <div className="sidebar">
                <Link to="/admin" className="sidebar-item">Dashboard</Link>
                <Link to="/userList" className="sidebar-item">Gestion des Utilisateurs</Link>
                <Link to="/InsuranceList" className="sidebar-item">Gestion des Assurances</Link>
                <Link to="/SinistresList" className="sidebar-item">Gestion des Sinistres</Link>
                <Link to="/TicketsList" className="sidebar-item">Gestion des Tickets</Link>

                <Link to="/Statistics" className="sidebar-item">Statistiques</Link>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
