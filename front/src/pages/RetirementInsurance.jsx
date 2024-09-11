import React, { useState } from 'react';
import axios from 'axios';
import '../styles/retraite.css'; // Import the CSS file for retirement insurance
import { useNavigate } from 'react-router-dom';

const RetirementInsuranceForm = () => {
    const [formData, setFormData] = useState({
        revenuesMensuel: '',
        sommeADeposer: '',
        extraitDeNaissance: null,
        preuveDActivite: null,
        cin: null,
    });

    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData({
            ...formData,
            [name]: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const form = new FormData();
        form.append('revenuesMensuel', formData.revenuesMensuel);
        form.append('sommeADeposer', formData.sommeADeposer);
        if (formData.extraitDeNaissance) form.append('extraitDeNaissance', formData.extraitDeNaissance);
        if (formData.preuveDActivite) form.append('preuveDActivite', formData.preuveDActivite);
        if (formData.cin) form.append('cin', formData.cin);

        const token = localStorage.getItem('userToken');
        if (!token) {
            setError('User token is missing');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/retraite/addRetraiteInsurance', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            navigate('/userInsurances'); // Redirect to user insurances page after successful submission
        } catch (error) {
            console.error('There was an error!', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Error: ${error.response.data.message || 'Unknown server error'}`);
            } else if (error.request) {
                console.error('Request data:', error.request);
                setError('No response from server.');
            } else {
                console.error('Error message:', error.message);
                setError('Error setting up request.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="retraite-container" onSubmit={handleSubmit}>
            <div className='retraite'>
                <div className="input-group">
                    <label>
                        Revenues Mensuel:
                        <input
                            type="text"
                            name="revenuesMensuel"
                            value={formData.revenuesMensuel}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Somme à Déposer:
                        <input
                            type="text"
                            name="sommeADeposer"
                            value={formData.sommeADeposer}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Extrait de Naissance:
                        <input
                            type="file"
                            name="extraitDeNaissance"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        Preuve d'Activité:
                        <input
                            type="file"
                            name="preuveDActivite"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                        />
                    </label>
                    <label>
                        CIN:
                        <input
                            type="file"
                            name="cin"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
            <button className='btretraite' type="submit" disabled={isLoading}>
                {isLoading ? 'En cours...' : 'Suivant'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default RetirementInsuranceForm;
