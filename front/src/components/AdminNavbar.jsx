// AdminNavbar.js
import React from 'react';
import logo from "../assets/testlog.png";
import { Button } from "react-bootstrap";
import "../styles/adminNavbar.css"; // Import the navbar CSS file
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const AdminNavbar = () => {
    const handleLogout = () => {
        console.log("Logging out directly from AdminNavbar");
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
        window.location.reload(); // Reload the page to reflect the logout
    };
    const navigate = useNavigate();
    const handleClick = () => {

        navigate('Profile');
      };

      return (
        <div className="adminNavbar">
            <div className="logo-container">
                <img className="sitelog" src={logo} alt="Logo" />
                <a href="/admin" className="siteTitle">MicroSafe</a>
            </div>
            <div className="navbar-profile">
                <span onClick={handleClick} className="profile-text">Profile</span>
                <Button onClick={handleLogout} className="decon">Se Déconnecter</Button>
                
            </div>
        </div>
    );
    

}

export default AdminNavbar;
