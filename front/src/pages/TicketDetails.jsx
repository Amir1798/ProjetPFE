import '../styles/TicketDetails.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketDetails = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');

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

    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleNewMessageSubmit = async () => {
        try {
            const token = localStorage.getItem('userToken');
            await axios.post(`http://localhost:4000/api/users/addMessageToContact/${id}`, 
            { message: newMessage }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Refresh the ticket data
            const response = await axios.get(`http://localhost:4000/api/users/getTicketById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTicket(response.data.data);
            setNewMessage(''); // Clear the input field
        } catch (error) {
            console.error('Error adding message:', error);
        }
    };

    return (
        <div className="ticket-details-container">
            {ticket ? (
                <>
                    <h3>ID: {ticket._id}</h3>
                    <h3>Sujet: {ticket.Subject}</h3>
                    <div className="messages">
                        {ticket.messages.map((msg, index) => (
                            <div key={index} className="message-box">
                                <p><strong>expéditeur:</strong> {msg.sender}</p>
                                <p><strong>Date:</strong> {new Date(msg.date).toLocaleString()}</p>
                                <p><strong>Message: </strong>{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <textarea
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        placeholder="Type your message here"
                    ></textarea>
                    <button onClick={handleNewMessageSubmit}>Ajouter Message</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TicketDetails;
