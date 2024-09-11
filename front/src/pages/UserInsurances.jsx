import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/userInsurances.css'; // Import the CSS file

const UserInsurances = () => {
    const [insurances, setInsurances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchInsurances = async () => {
            try {
                const token = localStorage.getItem('userToken');
                const response = await axios.get('http://localhost:4000/api/users/getUserInsurances', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setInsurances(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user insurances:', error);
                setLoading(false);
            }
        };

        fetchInsurances();
    }, []);

    const handleDelete = (id) => {
        setSelectedInsuranceId(id);
        setShowConfirmation(true);
    };

    const deleteInsurance = async (id) => {
        try {
            const token = localStorage.getItem('userToken');
            await axios.delete(`http://localhost:4000/api/users/Delete-insurance/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setInsurances((prevInsurances) => ({
                ...prevInsurances,
                healthInsurances: prevInsurances.healthInsurances.filter(ins => ins._id !== id),
                projectInsurances: prevInsurances.projectInsurances.filter(ins => ins._id !== id),
                carInsurances: prevInsurances.carInsurances.filter(ins => ins._id !== id),
                houseInsurances: prevInsurances.houseInsurances.filter(ins => ins._id !== id)
            }));
        } catch (error) {
            console.error('Error deleting insurance:', error);
        }
        setShowConfirmation(false);
    };

    const ConfirmationPopup = () => {
        return (
            <div className="popup">
                <div className="popup-content">
                    <p>Êtes-vous sûr de vouloir supprimer cette assurance ?</p>
                    <button onClick={() => setShowConfirmation(false)}>Annuler</button>
                    <button onClick={() => deleteInsurance(selectedInsuranceId)}>Supprimer</button>
                </div>
            </div>
        );
    };

    return (
        <div className="user-insurances-container">
            <h2>Vos assurances</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div>
                    {insurances.healthInsurances.length > 0 && (
                        <div className="insurance-category">
                            <h3>Assurances santé</h3>
                            {insurances.healthInsurances.map((insurance) => (
                                <div key={insurance._id} className="insurance-block">
                                    <p>ID : {insurance._id}</p>
                                    <p>Type : Assurance santé</p>
                                    <button onClick={() => handleDelete(insurance._id)} className="delete-button">Annuler</button>
                                    <Link to={`/insurance/${insurance._id}`} className="details-button">Plus de détails</Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {insurances.projectInsurances.length > 0 && (
                        <div className="insurance-category">
                            <h3>Assurances projet</h3>
                            {insurances.projectInsurances.map((insurance) => (
                                <div key={insurance._id} className="insurance-block">
                                    <p>ID : {insurance._id}</p>
                                    <p>Type : Assurance projet</p>
                                    <button onClick={() => handleDelete(insurance._id)} className="delete-button">Annuler</button>
                                    <Link to={`/insurance/${insurance._id}`} className="details-button">Plus de détails</Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {insurances.carInsurances.length > 0 && (
                        <div className="insurance-category">
                            <h3>Assurances auto</h3>
                            {insurances.carInsurances.map((insurance) => (
                                <div key={insurance._id} className="insurance-block">
                                    <p>ID : {insurance._id}</p>
                                    <p>Type : Assurance auto</p>
                                    <button onClick={() => handleDelete(insurance._id)} className="delete-button">Annuler</button>
                                    <Link to={`/insurance/${insurance._id}`} className="details-button">Plus de détails</Link>
                                </div>
                            ))}
                        </div>
                    )}

                    {insurances.houseInsurances.length > 0 && (
                        <div className="insurance-category">
                            <h3>Assurances habitation</h3>
                            {insurances.houseInsurances.map((insurance) => (
                                <div key={insurance._id} className="insurance-block">
                                    <p>ID : {insurance._id}</p>
                                    <p>Type : Assurance habitation</p>
                                    <button onClick={() => handleDelete(insurance._id)} className="delete-button">Annuler</button>
                                    <Link to={`/insurance/${insurance._id}`} className="details-button" >Plus de détails</Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {showConfirmation && <ConfirmationPopup />}
            </div>
        );
    };

    export default UserInsurances;
