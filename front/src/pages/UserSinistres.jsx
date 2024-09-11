import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/userSinistres.css'; // Import the CSS file

const UserSinistres = () => {
    const [sinistres, setSinistres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSinistres = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://localhost:4000/api/sinistre/userSinistres', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSinistres(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user sinistres:', error);
                setLoading(false);
            }
        };

        fetchSinistres();
    }, []);

    return (
        <div className="user-sinistres-container">
            <h2>Your Sinistres</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {sinistres.length > 0 ? (
                        <div className="sinistres-list">
                            {sinistres.map((sinistre) => (
                                <div key={sinistre._id} className="sinistre-item">
                                    <p>ID: {sinistre._id}</p>
                                    <p>Date: {new Date(sinistre.date).toLocaleDateString()}</p>
                                    <p>Description: {sinistre.description}</p>
                                    <Link to={`/sinistre/${sinistre._id}`} className="details-button">Plus de détails</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No sinistres found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserSinistres;
