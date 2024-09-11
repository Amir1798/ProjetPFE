import React, { useState } from 'react';
import axios from 'axios';
import '../styles/projet.css'; // Import the CSS file

const AddProjectInsurance = () => {
    const [formData, setFormData] = useState({
        nomProjet: '',
        adresse: '',
        secteurActivite: '',
        statutJuridique: 'individuel',
        dateCreation: '',
        actionnaires: [{ nom: '', prenom: '', cin: '' }],
        photos: [],
        documents: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: Array.from(files)
        }));
    };

    const handleActionnaireChange = (index, e) => {
        const { name, value } = e.target;
        const actionnaires = [...formData.actionnaires];
        actionnaires[index][name] = value;
        setFormData((prevState) => ({
            ...prevState,
            actionnaires
        }));
    };

    const addNewActionnaire = () => {
        setFormData((prevState) => ({
            ...prevState,
            actionnaires: [...prevState.actionnaires, { nom: '', prenom: '', cin: '' }]
        }));
    };

    const deleteActionnaire = (index) => {
        const actionnaires = [...formData.actionnaires];
        actionnaires.splice(index, 1);
        setFormData((prevState) => ({
            ...prevState,
            actionnaires
        }));
    };

    const token = localStorage.getItem('userToken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('nomProjet', formData.nomProjet);
        formDataToSend.append('adresse', formData.adresse);
        formDataToSend.append('secteurActivite', formData.secteurActivite);
        formDataToSend.append('statutJuridique', formData.statutJuridique);
        formDataToSend.append('dateCreation', formData.dateCreation);

        formData.photos.forEach((file) => {
            formDataToSend.append('photos', file);
        });
        formData.documents.forEach((file) => {
            formDataToSend.append('documents', file);
        });

        if (formData.statutJuridique === 'collabortatif') {
            formData.actionnaires.forEach((actionnaire, index) => {
                formDataToSend.append(`actionnaires[${index}][nom]`, actionnaire.nom);
                formDataToSend.append(`actionnaires[${index}][prenom]`, actionnaire.prenom);
                formDataToSend.append(`actionnaires[${index}][cin]`, actionnaire.cin);
            });
        }

        try {
            const res = await axios.post('http://localhost:4000/api/projectInsurance/addProjectInsurance', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data);
            // Handle success, e.g., clear form or redirect
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <form className="proj-container" onSubmit={handleSubmit}>
            <div className="input-row">
                <div className="input-group">
                    <label>Nom du Projet:</label>
                    <input
                        type="text"
                        name="nomProjet"
                        value={formData.nomProjet}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Adresse:</label>
                    <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="input-row">
                <div className="input-group">
                    <label>Secteur d'Activité:</label>
                    <input
                        type="text"
                        name="secteurActivite"
                        value={formData.secteurActivite}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Statut Juridique:</label>
                    <select
                        name="statutJuridique"
                        value={formData.statutJuridique}
                        onChange={handleChange}
                        required
                    >
                        <option value="individuel">Individuel</option>
                        <option value="collabortatif">Collaboratif</option>
                    </select>
                </div>
            </div>
            <div className="input-row">
                <div className="input-group">
                    <label>Date de Création:</label>
                    <input
                        type="date"
                        name="dateCreation"
                        value={formData.dateCreation}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="input-row">
                <div className="input-group">
                    <label>Photos Local:</label>
                    <input
                        type="file"
                        name="photos"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Documents:</label>
                    <input
                        type="file"
                        name="documents"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
            </div>
            {formData.statutJuridique === 'collabortatif' && (
                <>
                    {formData.actionnaires.map((actionnaire, index) => (
                        <div key={index} className="input-group actionnaire-group">
                            <label>Actionnaire {index + 1}</label>
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom"
                                value={actionnaire.nom}
                                onChange={(e) => handleActionnaireChange(index, e)}
                                required
                            />
                            <input
                                type="text"
                                name="prenom"
                                placeholder="Prénom"
                                value={actionnaire.prenom}
                                onChange={(e) => handleActionnaireChange(index, e)}
                                required
                            />
                            <input
                                type="number"
                                name="cin"
                                placeholder="CIN"
                                value={actionnaire.cin}
                                onChange={(e) => handleActionnaireChange(index, e)}
                                required
                            />
                            <button type="button" onClick={() => deleteActionnaire(index)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addNewActionnaire}>Ajouter Actionnaire</button>
                </>
            )}
            <button type="submit">Suivant</button>
        </form>
    );
};

export default AddProjectInsurance;
