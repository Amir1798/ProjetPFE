import React, { useState } from 'react';
import axios from 'axios';
import '../styles/voiture.css'; // Import the CSS file

const AssuranceAutomobileForm = () => {
    const [formData, setFormData] = useState({
        marque: '',
        model: '',
        annee: '',
        numeroImmatriculation: '',
        numeroChassis: '',
        valeurEstime: '',
        useCase: 'personnel',
        photo: []
    });

    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [error, setError] = useState(''); // For error messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            photo: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const form = new FormData();
        for (const key in formData) {
            if (key === 'photo') {
                formData.photo.forEach(file => {
                    form.append('car', file);
                });
            } else {
                form.append(key, formData[key]);
            }
        }

        console.log('FormData contents:');
        form.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const token = localStorage.getItem('userToken');
        if (!token) {
            setError('User token is missing');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/carInsurance/addCarInsurance', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            // Handle success (e.g., navigate to another page or show a success message)
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
        <form className="voit-container" onSubmit={handleSubmit}>
            <div className='voit'>
                <div className="input-group">
                    <label>
                        Marque:
                        <input
                            type="text"
                            name="marque"
                            value={formData.marque}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Modèle:
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Année:
                        <input
                            type="text"
                            name="annee"
                            value={formData.annee}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Numéro d'immatriculation:
                        <input
                            type="text"
                            name="numeroImmatriculation"
                            value={formData.numeroImmatriculation}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Numéro de châssis:
                        <input
                            type="text"
                            name="numeroChassis"
                            value={formData.numeroChassis}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Valeur estimée:
                        <input
                            type="text"
                            name="valeurEstime"
                            value={formData.valeurEstime}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <label>
                    Utilisation principale du véhicule:
                    <select
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleInputChange}
                    >
                        <option value="personnel">Personnel</option>
                        <option value="professionnel">Professionnel</option>
                    </select>
                </label>
                <label>
                    Photo de l'automobile:
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <span className="file-input-label" onClick={() => document.querySelector('input[type="file"]').click()}>Choisir des fichiers</span>
                </label>
            </div>
            <button className='btvoit' type="submit" disabled={isLoading}>
                {isLoading ? 'En cours...' : 'Suivant'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </form>
    );
};

export default AssuranceAutomobileForm;
