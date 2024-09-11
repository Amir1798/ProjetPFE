import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/cotisationForm.css';
import { useNavigate } from 'react-router-dom';

const CotisationForm = () => {
  const { id } = useParams();  // Retrieve the insurance ID from the URL parameters
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [amount, setAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [conditions, setConditions] = useState({});
  const [showNextButton, setShowNextButton] = useState(false);

  const insuranceOptions = [
    { name: 'Voiture', baseAmount: 300 },
    { name: 'Habitation', baseAmount: 200 },
    { name: 'Projet Personnelle', baseAmount: 500 },
    { name: 'Santé', baseAmount: 150 },
    { name: 'Pension à la Retraite', baseAmount: 400 },
  ];

  const insuranceTypeMapping = {
    'CarInsurance': 'Voiture',
    'HouseInsurance': 'Habitation',
    'ProjectInsurance': 'Projet Personnelle',
    'HealthInsurance': 'Santé',
    'RetirementInsurance': 'Pension à la Retraite'
  };

  useEffect(() => {
    const fetchInsuranceDetails = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:4000/api/users/insurance/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const insurance = response.data.data.insurance;
        const translatedInsuranceType = insuranceTypeMapping[insurance.insuranceType] || '';
        setSelectedInsurance(translatedInsuranceType);
        setAmount(insurance.price);
      } catch (error) {
        console.error('Error fetching insurance details:', error);
      }
    };

    fetchInsuranceDetails();
  }, [id]);

  const handlePaymentChange = (event) => {
    setPaymentMode(event.target.value);
    setShowNextButton(false);
  };

  const handleConditionChange = (event) => {
    const { name, value } = event.target;
    setConditions(prevConditions => ({
      ...prevConditions,
      [name]: value
    }));
    setShowNextButton(false);
  };

  const calculateFinalAmount = () => {
    let adjustedAmount = amount;

    // Adjust the amount based on conditions
    if (selectedInsurance === 'Voiture') {
      adjustedAmount = conditions.age > 10 ? 350 : 300;
    } else if (selectedInsurance === 'Habitation') {
      adjustedAmount = conditions.size === 's+1' ? 200 : conditions.size === 's+2' ? 250 : 300;
    } else if (selectedInsurance === 'Santé') {
      adjustedAmount = conditions.status === 'celibataire' ? 150 : conditions.status === 'marie' ? 200 : 250;
    } else if (selectedInsurance === 'Pension à la Retraite') {
      adjustedAmount = conditions.ageRetirement > 60 ? 400 : 450;
    }

    const discount = paymentMode === 'trimestre' ? 0.85 : 0.9; // 15% discount for trimestre, 10% discount for semestriel
    setFinalAmount(adjustedAmount * discount);
    setShowNextButton(true);
  };
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      await axios.put(`http://localhost:4000/api/users/update-insurance-price/${id}`, { price: finalAmount, modeDePaiement: paymentMode  }, {
        headers: {
          Authorization: `Bearer ${token}`
        
        }
      });

      alert('Price updated successfully');
 
      navigate(`/paymentForm/${id}/${finalAmount}`);

    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update price');
    }
  };

  const renderConditionInputs = () => {
    if (selectedInsurance === 'Voiture') {
      return (
        <div className="form-group">
          <label>Age de la Voiture</label>
          <input
            type="number"
            name="age"
            value={conditions.age || ''}
            onChange={handleConditionChange}
          />
        </div>
      );
    } else if (selectedInsurance === 'Habitation') {
      return (
        <div className="form-group">
          <label>Type d'Habitation</label>
          <select
            name="size"
            value={conditions.size || ''}
            onChange={handleConditionChange}
          >
            <option value="">Sélectionnez un type</option>
            <option value="s+1">S+1</option>
            <option value="s+2">S+2</option>
            <option value="s+3">S+3</option>
          </select>
        </div>
      );
    } else if (selectedInsurance === 'Santé') {
      return (
        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={conditions.status || ''}
            onChange={handleConditionChange}
          >
            <option value="">Sélectionnez un status</option>
            <option value="celibataire">Célibataire</option>
            <option value="marie">Marié</option>
            <option value="marieEnfants">Marié avec enfants</option>
          </select>
        </div>
      );
    } else if (selectedInsurance === 'Pension à la Retraite') {
      return (
        <div className="form-group">
          <label>Age de la Retraite</label>
          <input
            type="number"
            name="ageRetirement"
            value={conditions.ageRetirement || ''}
            onChange={handleConditionChange}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="cot-container">
      <h2>Formulaire de Cotisation et Mode de Paiement</h2>
      <form className="cot-container">
        <div className="form-group">
          <label>Type d'Assurance</label>
          <input type="text" value={selectedInsurance} readOnly />
        </div>
        {renderConditionInputs()}
        <div className="form-group">
          <label>Mode de Paiement</label>
          <select value={paymentMode} onChange={handlePaymentChange}>
            <option value="">Sélectionnez un mode de paiement</option>
            <option value="trimestre">Trimestre</option>
            <option value="semestriel">Semestre</option>
          </select>
        </div>
        <div className="form-group">
          <label>Montant</label>
          <input type="text" value={amount} readOnly />
        </div>
        <button type="button" onClick={calculateFinalAmount}>
          Calculer la Cotisation
        </button>
        {finalAmount > 0 && (
          <div className="form-group">
            <label>Montant Final</label>
            <input type="text" value={finalAmount} readOnly />
          </div>
        )}
        {showNextButton && (
          <button type="button" className="next-button" onClick={handleConfirm}>
            Confirmer
          </button>
        )}
      </form>
    </div>
  );
};

export default CotisationForm;
