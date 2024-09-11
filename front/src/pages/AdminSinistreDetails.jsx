import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/admininsuranceDetails.css';

const SinistreDetails = () => {
    const { id } = useParams(); // Get the sinistre ID from the URL
    const navigate = useNavigate(); // Ensure useNavigate is called at the top level
    const [sinistre, setSinistre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSinistreDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get(`http://localhost:4000/api/users/getSinistreById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSinistre(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sinistre details:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchSinistreDetails();
    }, [id]);

    const handleNavigate = () => {
        navigate(`/Remboursement/${sinistre.user._id}/${sinistre._id}`);
    };

    const handleRefuse = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                throw new Error('Token not found');
            }

            await axios.put(`http://localhost:4000/api/users/refuse-sinistre/${sinistre.user._id}/${sinistre._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Sinistre refusé avec succès');
            navigate('/'); // Add your redirect path here
        } catch (error) {
            console.error('Error refusing sinistre:', error);
            alert('Échec du refus du sinistre');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <h2>Details du Sinistre</h2>
            <h3>Nom & prénom: {`${sinistre.user.firstname} ${sinistre.user.lastname}`}</h3>
            <p>ID Utilisateur: {sinistre.user._id}</p>
            <p>ID assurance relative: {sinistre.Insurance._id} </p>
            <p>Type d'assurance relative: {sinistre.assuranceType}</p>
            <p>État: {sinistre.state}</p>
            <p>date: {sinistre.date.split('T')[0]}</p>
            <p>Description: {sinistre.description}</p>
            <div className='photos'>
                <p>Photos du sinistre:</p>
                {sinistre.photos.map((photo, index) => (
                    <img key={index} src={`http://localhost:4000/${photo}`} alt={`sinistre photo ${index + 1}`} />
                ))}
            </div>
            <button className="accept-button" onClick={handleNavigate}>Accepter</button>
            <button className="reject-button" onClick={handleRefuse}>Refuser</button>
        </div>
    );
};

export default SinistreDetails;
