import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/adminDashboard.css'; // Import du fichier CSS
import ad from "../assets/IMG_0252.png"; // Import correct de l'image

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            <div className="sidebar">
                <Link to="/userList" className="sidebar-item">
                    Gestion des Utilisateurs
                </Link>
                <Link to="/InsuranceList" className="sidebar-item">
                    Gestion des Assurances
                </Link>
                <Link to="/SinistresList" className="sidebar-item">
                    Gestion des Sinistres
                </Link>
                <Link to="/TicketsList" className="sidebar-item">
                    Gestion des Billets
                </Link>
                <Link to="/Statistics" className="sidebar-item">
                    Statistiques
                </Link>
            </div>
            <div className="content">
                <div className="header">
                    <div className="greeting">
                        Bienvenue sur votre Dashboard Admin !
                    </div>
                    <div className="creator-section">
                        <img 
                            src={ad} // Utilisation correcte de l'image importée
                            alt="Créateur du site"
                            className="creator-image"
                        />
                        <button className="creator-button">
                            Voici le créateur du site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
