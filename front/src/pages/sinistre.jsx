import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sinistre.css'; // Import the CSS file

const AssuranceSinistreForm = () => {
    const [formData, setFormData] = useState({
        assuranceType: '',
        date: '',
        description: '',
        photos: [],
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFormData({
            ...formData,
            photos: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formPayload = new FormData();
        formPayload.append('assuranceType', formData.assuranceType);
        formPayload.append('date', formData.date);
        formPayload.append('description', formData.description);
        for (let i = 0; i < formData.photos.length; i++) {
            formPayload.append('photos', formData.photos[i]);
        }

        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post('http://localhost:4000/api/sinistre/addSinistre', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Sinistre added successfully');
        } catch (error) {
            setMessage('Error adding sinistre');
            console.error('Error adding sinistre:', error);
        }
    };

    return (
        <div className="sinistre-container">
            <h2>Déclarer un Sinistre</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Type d'assurance :
                        <select
                            name="assuranceType"
                            value={formData.assuranceType}
                            onChange={handleInputChange}
                        >
                            <option value="">Sélectionnez le type d'assurance</option>
                            <option value="ProjectInsurance">Assurance Projet</option>
                            <option value="HealthInsurance">Assurance Santé</option>
                            <option value="CarInsurance">Assurance Automobile</option>
                            <option value="HouseInsurance">Assurance Habitation</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Date du sinistre :
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description du sinistre :
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Photos du sinistre :
                        <input
                            type="file"
                            accept="image/*"
                            name="photos"
                            multiple
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <button type="submit">Déclarer le sinistre</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AssuranceSinistreForm;
