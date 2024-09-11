import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/insuranceList.css'; // Reusing the same CSS
import { Link } from 'react-router-dom';

const TicketsList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 3; // Define how many tickets you want per page

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:4000/api/contact/getAllContacts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTickets(response.data.data.contacts);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tickets:', err); // Log the error
                setError(err);
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Logic for displaying current tickets
    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="insurance-list">
                {currentTickets.map(ticket => (
                    <div className="insurance-block" key={ticket._id}>
                        <div className="insurance-details">
                            <h3>{`${ticket.firstname} ${ticket.lastname}`}</h3>
                            <p>Email: {ticket.email}</p>
                            <p>Phone Number: {ticket.phoneNumber}</p>
                            <p>Subject: {ticket.Subject}</p>
                            <Link to={`/BackOfficeTicket/${ticket._id}`} className="details-link">Plus de détails</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TicketsList;
