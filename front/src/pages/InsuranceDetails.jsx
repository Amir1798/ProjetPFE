import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/detailsInsurance.css'; // Import the CSS file

const InsuranceDetails = () => {
    const { id } = useParams();
    const [insurance, setInsurance] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInsurance = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get(`http://localhost:4000/api/users/insurance/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInsurance(response.data.data.insurance);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching insurance details:', error);
                setLoading(false);
            }
        };

        fetchInsurance();
    }, [id]);


    const handlePayment = () => {
        const amount = insurance.Paiement_rest;
        if (insurance.firststepPaiement === 0) {
            alert('Proceeding to payment...');
            navigate(`/cotisation/${id}`);
        } else if (insurance.firststepPaiement === 1) {
            const finalAmount = insurance.price - insurance.Paiement_rest;
            navigate(`/paymentForm/${insurance._id}/${amount}`);
        }
    };

    return (
        <div className="insurance-details-container">
            <div className="insurance-details">
                <h2>Insurance Details</h2>
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : insurance ? (
                    <div>
                        <p>ID: {insurance._id}</p>
                        <p>Prix: {insurance.price}</p>
                        <p>Etat: {insurance.state}</p>
                        <p>Reste à Payer: {insurance.Paiement_rest}</p>
                        {insurance.state === 'Not paid' && (
                            <button className="payment-button" onClick={handlePayment}>
                                Procéder au paiement
                            </button>
                        )}
                    </div>
                ) : (
                    <p className="not-found">Insurance not found</p>
                )}
            </div>
        </div>
    );
};

export default InsuranceDetails;
