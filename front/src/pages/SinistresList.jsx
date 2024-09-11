import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/insuranceList.css'; // Reusing the same CSS
import { Link } from 'react-router-dom';

const SinistresList = () => {
    const [sinistres, setSinistres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const sinistresPerPage = 3; // Define how many sinistres you want per page

    useEffect(() => {
        const fetchSinistres = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:4000/api/sinistre/allSinistres', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSinistres(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sinistres:', err); // Log the error
                setError(err);
                setLoading(false);
            }
        };

        fetchSinistres();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Logic for displaying current sinistres
    const indexOfLastSinistre = currentPage * sinistresPerPage;
    const indexOfFirstSinistre = indexOfLastSinistre - sinistresPerPage;
    const currentSinistres = sinistres.slice(indexOfFirstSinistre, indexOfLastSinistre);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sinistres.length / sinistresPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="insurance-list">
                {currentSinistres.map(sinistre => (
                    <div className="insurance-block" key={sinistre._id}>
                        <div className="insurance-details">
                            <h3>{`${sinistre.user.firstname} ${sinistre.user.lastname}`}</h3>
                            <p>User ID: {sinistre.user._id}</p>
                            <p>User email: {sinistre.user.email}</p>
                            <p>State: {sinistre.state}</p>
                            <Link to={`/BackOfficeSinistre/${sinistre._id}`} className="details-link">Plus de détails</Link>                        </div>
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

export default SinistresList;
