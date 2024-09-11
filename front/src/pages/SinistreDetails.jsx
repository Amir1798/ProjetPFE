import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/detailsSinistre.css'; // Import the CSS file

const SinistreDetails = () => {
    const { id } = useParams();
    const [sinistre, setSinistre] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSinistre = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://localhost:4000/api/sinistre/userSinistres/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSinistre(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sinistre details:', error);
                setLoading(false);
            }
        };

        fetchSinistre();
    }, [id]);

    return (
        <div className="insurance-details-container">
            <div className="insurance-details">
                <h2>Sinistre Details</h2>
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : sinistre ? (
                    <div>
                        <div className="block">
                            <p className="label">ID:</p>
                            <p className="value id">{sinistre._id}</p>
                        </div>
                        <div className="block">
                            <p className="label">Type d'assurance liée au sinistre:</p>
                            <p className="value id">{sinistre.assuranceType}</p>
                        </div>

                        <div className="block">
                            <p className="label">Date:</p>
                            <p className="value">{new Date(sinistre.date).toLocaleDateString()}</p>
                        </div>
                        <div className="block">
                            <p className="label">Description:</p>
                            <p className="value">{sinistre.description}</p>
                        </div>
                        {sinistre.photos.length > 0 && (
                            <div className="block">
                                <h3>Photos:</h3>
                                <div className="photos">
                                    {sinistre.photos.map((photo, index) => (
                                        <img key={index} src={`http://localhost:4000/${photo}`} alt={`Sinistre photo ${index + 1}`} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="not-found">Sinistre not found</p>
                )}
            </div>
        </div>
    );
};

export default SinistreDetails;
