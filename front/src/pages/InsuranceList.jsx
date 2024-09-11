import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/insuranceList.css'; // Ensure correct import path

const InsuranceList = () => {
    const [insurances, setInsurances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const insurancesPerPage = 3; // Define how many insurances you want per page

    useEffect(() => {
        const fetchInsurances = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:4000/api/users/getAllInsurances', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Combine all insurance types into one array
                const allInsurances = [
                    ...response.data.data.healthInsurances,
                    ...response.data.data.projectInsurances,
                    ...response.data.data.houseInsurances,
                    ...response.data.data.carInsurances,
                    ...response.data.data.retraiteInsurances
                ];

                setInsurances(allInsurances);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching insurances:', err); // Log the error
                setError(err);
                setLoading(false);
            }
        };

        fetchInsurances();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Logic for displaying current insurances
    const indexOfLastInsurance = currentPage * insurancesPerPage;
    const indexOfFirstInsurance = indexOfLastInsurance - insurancesPerPage;
    const currentInsurances = insurances.slice(indexOfFirstInsurance, indexOfLastInsurance);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(insurances.length / insurancesPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className="insurance-list">
                {currentInsurances.map(insurance => (
                    <div className="insurance-block" key={insurance._id}>
                        <div className="insurance-details">
                            <h3>{`${insurance.user.firstname} ${insurance.user.lastname}`}</h3>
                            <p>User ID: {insurance.user._id}</p>
                            <p>State: {insurance.state}</p>
                            <p>Type: {insurance.insuranceType}</p>
                            <Link to={`/BackOfficeInsurance/${insurance._id}`} className="details-link">Plus de détails</Link>
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

export default InsuranceList;
