import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/paymentForm.css';

const PaymentForm = () => {
  const { id, amount } = useParams();
  const [amountPaid, setAmountPaid] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [paiementRest, setPaiementRest] = useState(parseFloat(amount)); // Initialize with the amount passed in the URL
  const navigate = useNavigate();

  const handleAmountPaidChange = (event) => {
    setAmountPaid(parseFloat(event.target.value) || 0);
  };

  const handleSubmit = async () => {
    if (amountPaid > paiementRest) {
      alert('Le montant à payer ne peut pas être supérieur au montant restant. Veuillez entrer un montant correct.');
      return;
    }

    const remaining = paiementRest - amountPaid;
    setRemainingAmount(remaining);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      await axios.put(`http://localhost:4000/api/users/update-insurance-resting-payment/${id}`, 
      { amount: amountPaid },  // Update request body field to match server side
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Paiement réussi');
      navigate(`/insurance/${id}`);
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Échec de la mise à jour du paiement');
    }
  };

  return (
    <div className="payment-container">
      <h2>Formulaire de Paiement</h2>
      <form className="payment-container">
        <div className="form-group">
          <label>Montant Total</label>
          <input type="text" value={`${paiementRest} DT`} readOnly />
        </div>
        <div className="form-group">
          <label>Montant à Payer</label>
          <input
            type="number"
            value={amountPaid}
            onChange={handleAmountPaidChange}
            placeholder="Entrez le montant payé"
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Payer
        </button>
        {remainingAmount > 0 && (
          <div className="form-group">
            <label>Montant Restant</label>
            <input type="text" value={`${remainingAmount} DT`} readOnly />
          </div>
        )}
        <button type="button" onClick={() => navigate('/userInsurances')}>
          Pas maintenant
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
