import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sante.css';

const AddHealthInsurance = () => {
    const [formData, setFormData] = useState({
        statut: '',
        partenaire: {
            nom: '',
            prenom: '',
            cin: '',
            dateDeNaissance: ''
        },
        enfants: [],
        documents: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePartenaireChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            partenaire: {
                ...prevState.partenaire,
                [name]: value
            }
        }));
    };

    const handleEnfantChange = (e, index) => {
        const { name, value } = e.target;
        const newEnfants = [...formData.enfants];
        newEnfants[index][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            enfants: newEnfants
        }));
    };

    const addEnfant = () => {
        setFormData((prevState) => ({
            ...prevState,
            enfants: [...prevState.enfants, { nom: '', prenom: '' }]
        }));
    };

    const deleteEnfant = (index) => {
        const newEnfants = [...formData.enfants];
        newEnfants.splice(index, 1);
        setFormData((prevState) => ({
            ...prevState,
            enfants: newEnfants
        }));
    };

    const handleDocumentChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            documents: Array.from(e.target.files)
        }));
    };

    const token = localStorage.getItem('userToken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('statut', formData.statut);
        formDataToSend.append('partenaire', JSON.stringify(formData.partenaire));
        formDataToSend.append('enfants', JSON.stringify(formData.enfants));
        formData.documents.forEach((file) => {
            formDataToSend.append('documents', file);
        });

        try {
            const res = await axios.post('http://localhost:4000/api/healthInsurance/addhealthtInsurance', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <form className="san-container" onSubmit={handleSubmit}>
            <div>
                <label>Statut:</label>
                <select name="statut" value={formData.statut} onChange={handleChange} required>
                    <option value="">Select Statut</option>
                    <option value="celibataire">Célibataire</option>
                    <option value="marie">Marié</option>
                </select>
            </div>
            {formData.statut === 'marie' && (
                <div className="san-partner">
                    <h3>Partenaire Details</h3>
                    <div className="san-row">
                        <div className="san-column">
                            <label>Nom:</label>
                            <input type="text" name="nom" value={formData.partenaire.nom} onChange={handlePartenaireChange} required />
                        </div>
                        <div className="san-column">
                            <label>Prénom:</label>
                            <input type="text" name="prenom" value={formData.partenaire.prenom} onChange={handlePartenaireChange} required />
                        </div>
                    </div>
                    <div className="san-row">
                        <div className="san-column">
                            <label>CIN:</label>
                            <input type="text" name="cin" value={formData.partenaire.cin} onChange={handlePartenaireChange} required />
                        </div>
                        <div className="san-column">
                            <label>Date de Naissance:</label>
                            <input type="date" name="dateDeNaissance" value={formData.partenaire.dateDeNaissance} onChange={handlePartenaireChange} required />
                        </div>
                    </div>
                </div>
            )}
            <div>
                <h3>Enfants</h3>
                {formData.enfants.map((enfant, index) => (
                    <div key={index} className="san-row">
                        <div className="san-column">
                            <label>Nom:</label>
                            <input type="text" name="nom" value={enfant.nom} onChange={(e) => handleEnfantChange(e, index)} required />
                        </div>
                        <div className="san-column">
                            <label>Prénom:</label>
                            <input type="text" name="prenom" value={enfant.prenom} onChange={(e) => handleEnfantChange(e, index)} required />
                        </div>
                        <button type="button" onClick={() => deleteEnfant(index)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
                <button type="button" className="add-button" onClick={addEnfant}>Ajouter Enfant</button>
            </div>
            <div>
                <label>Documents:</label>
                <input type="file" name="documents" onChange={handleDocumentChange} multiple required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddHealthInsurance;
