import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/userTicketDetails.css';

const UserTicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const token = localStorage.getItem('userToken'); // Adjust this if you store the token differently
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/getTicketById/${id}`);
                setTicket(response.data.data);
            } catch (error) {
                console.error('Error fetching ticket:', error);
            }
        };

        fetchTicket();
    }, [id]);

    const handleAddMessage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:4000/api/users/addMessageToContactAsUser/${id}`,
                { message: newMessage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setTicket(response.data.data); // Update ticket with the new message
            setNewMessage('');
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    const handleCloseTicket = async () => {
        try {
            await axios.put(`http://localhost:4000/api/users/updateTicketState/${id}`, { state: 'Solved' });
            setTicket({ ...ticket, state: 'Solved' });
            navigate('/');
        } catch (error) {
            console.error('Error closing ticket:', error);
        }
    };

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ticket-details-container">
            <h3>Ticket ID: {ticket._id}</h3>
            <h3>Subject: {ticket.Subject}</h3>
            <div className="messages-container">
                {ticket.messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p><strong>Sender:</strong> {msg.sender}</p>
                        <p><strong>Date:</strong> {new Date(msg.date).toLocaleString()}</p>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <form className="add-message-form" onSubmit={handleAddMessage}>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
            {ticket.state !== 'Solved' && (
                <button className="close-ticket-button" onClick={handleCloseTicket}>Close Ticket</button>
            )}
        </div>
    );
};

export default UserTicketDetails;
