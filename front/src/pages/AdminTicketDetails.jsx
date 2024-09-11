import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import '../styles/admininsuranceDetails.css';  // Make sure the CSS path is correct

const TicketDetails = () => {
    const { id } = useParams(); // Get the ticket ID from the URL
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Ensure useNavigate is called at the top level


    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get(`http://localhost:4000/api/users/getTicketById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTicket(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching ticket details:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchTicketDetails();
    }, [id]);
    const handleNavigate = () => {
        navigate(`/ticket/${ticket._id}/`);
    };
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <h2>Details du Ticket</h2>
            <h3>Nom & prénom: {`${ticket?.firstname} ${ticket?.lastname}`}</h3>
            <p>Email: {ticket?.email}</p>
            <p>Phone Number: {ticket?.phoneNumber}</p>
            <p>Subject: {ticket?.Subject}</p>
            <p>Description: {ticket?.message}</p>
          
            <div className="actions">
                <button onClick={handleNavigate} className="accept-button">Traiter</button>
                <button className="reject-button">Fermer</button>
            </div>
        </div>
    );
};

export default TicketDetails;
