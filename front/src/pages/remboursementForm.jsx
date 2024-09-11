import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/remboursementForm.css';

const RemboursementForm = () => {
    const { iduser, idsinistre } = useParams(); // Get userId and sinistreId from the URL
    const navigate = useNavigate(); // Always call hooks at the top level
    const [amount, setAmount] = useState(0);
console.log(iduser);
console.log(idsinistre);
const handleSubmit = async (event) => {
        event.preventDefault();
        // Submit the remboursement form
        try {
            const token = localStorage.getItem('userToken');
            await axios.put(`http://localhost:4000/api/users/update-solde-delete-sinistre/${iduser}/${idsinistre}`, {
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Remboursement submitted successfully!');
            navigate('/'); // Add your redirect path here
        } catch (error) {
            console.error('Error submitting remboursement:', error);
            alert('Failed to submit remboursement');
        }
    };

    return (
        <div className="remboursement-container">
            <h2>Formulaire de Remboursement</h2>
            <form onSubmit={handleSubmit} className="remboursement-container">
                <div className="form-group">
                    <label>ID Utilisateur</label>
                    <input type="text" value={iduser} readOnly />
                </div>
                <div className="form-group">
                    <label>Montant à Rembourser</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Entrez le montant"
                    />
                </div>
                <button type="submit">Soumettre</button>
            </form>
        </div>
    );
};

export default RemboursementForm;
