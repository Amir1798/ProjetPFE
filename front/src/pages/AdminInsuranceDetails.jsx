import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/admininsuranceDetails.css';

const InsuranceDetails = () => {
    const { id } = useParams();
    const [insurance, setInsurance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInsuranceDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get(`http://localhost:4000/api/users/AdminGetInsuranceById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setInsurance(response.data.data.insurance);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching insurance details:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchInsuranceDetails();
    }, [id]);

    const handleStateUpdate = async (newState) => {
        try {
            if (newState === 'Not Paid' && !insurance.contrat) {
                alert('Erreur : Aucun contrat trouvé. Veuillez ajouter un contrat avant de valider.');
                return;
            }

            const token = localStorage.getItem('userToken');
            if (!token) {
                throw new Error('Token not found');
            }

            const url = newState === 'Agreement'
                ? `http://localhost:4000/api/users/initial-accept-insurance/${id}`
                : `http://localhost:4000/api/users/update-state-not-paid/${id}`;

            await axios.put(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setInsurance({ ...insurance, state: newState });
            alert(`État de l'assurance mis à jour en ${newState}`);
        } catch (err) {
            console.error('Error updating insurance state:', err);
            alert('Échec de la mise à jour de l\'état de l\'assurance');
        }
    };

    const handleReject = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                throw new Error('Token not found');
            }

            await axios.put(`http://localhost:4000/api/users/update-state-refused/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('L\'assurance a été refusée.');
        } catch (err) {
            console.error('Error rejecting insurance:', err);
            alert('Échec du refus de l\'assurance');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const renderEnfants = (enfants) => {
        if (!enfants || enfants.length === 0) {
            return <p>Aucun enfant</p>;
        }
        return (
            <div>
                <p><strong>Enfants:</strong></p>
                <ul>
                    {enfants.map((enfant, index) => (
                        <li key={index}>
                            Enfant {index + 1}: {enfant.prenom} {enfant.nom}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const renderInsuranceDetails = () => {
        switch (insurance.insuranceType) {
            case 'HealthInsurance':
                return (
                    <div>
                        <p>Type d'assurance: Santé</p>
                        <p>Etat civil: {insurance.statut}</p>
                        <p>Nom & prenom du partenaire: {`${insurance.partenaire.nom} ${insurance.partenaire.prenom}` || 'Utilisateur celibataire'}</p>
                        <div className='documents'>
                            <p>Documents:</p>
                            {insurance.Documents.map((doc, index) => (
                                <div key={index} className="document-item">
                                    {doc.endsWith('.pdf') ? (
                                        <object data={`http://localhost:4000/${doc}`} type="application/pdf" width="80" height="80">
                                            <a href={`http://localhost:4000/${doc}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                        </object>
                                    ) : (
                                        <img src={`http://localhost:4000/${doc}`} alt={`document ${index + 1}`} />
                                    )}
                                    <a href={`http://localhost:4000/${doc}`} download={`document_${index + 1}`}>
                                        <button className="document-download-button">Download</button>
                                    </a>
                                </div>
                            ))}
                        </div>
                        {renderEnfants(insurance.enfants)}
                    </div>
                );
            case 'ProjectInsurance':
                return (
                    <div>
                        <p>Type d'assurance: Projet</p>
                        <p>Nom du projet: {insurance.nomProjet}</p>
                        <p>Adresse du local: {insurance.adresse}</p>
                        <p>Secteur d'activité: {insurance.secteurActivite}</p>
                        <p>Statut juridique: {insurance.statutJuridique}</p>
                        <p>Date de création: {insurance.dateCreation.split('T')[0]}</p>
                        <div className='photos'>
                            <p>Photos du local:</p>
                            {insurance.photoLocal.map((photo, index) => (
                                <img key={index} src={`http://localhost:4000/${photo}`} alt={`insurance photo ${index + 1}`} />
                            ))}
                        </div>
                        <div className='documents'>
                            <p>Documents:</p>
                            {insurance.Documents.flat().map((doc, index) => (
                                <div key={index} className="document-item">
                                    {doc.endsWith('.pdf') ? (
                                        <object data={`http://localhost:4000/${doc}`} type="application/pdf" width="80" height="80">
                                            <a href={`http://localhost:4000/${doc}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                        </object>
                                    ) : (
                                        <img src={`http://localhost:4000/${doc}`} alt={`document ${index + 1}`} />
                                    )}
                                    <a href={`http://localhost:4000/${doc}`} download={`document_${index + 1}`}>
                                        <button className="document-download-button">Download</button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'CarInsurance':
                return (
                    <div>
                        <p>Type d'assurance: Voiture</p>
                        <p>Modèle de la voiture: {insurance.model}</p>
                        <p>Numéro d'immatriculation: {insurance.numeroImmatriculation}</p>
                        <p>Numéro de Châssis: {insurance.numeroChassis}</p>
                        <p>Valeur estimée de la voiture: {insurance.valeurEstime}</p>
                        <p>Cas d'utilisation: {insurance.useCase}</p>
                        <div className='photos'>
                            <p>Photos de la voiture:</p>
                            {insurance.photo.map((photo, index) => (
                                <img key={index} src={`http://localhost:4000/${photo}`} alt={`insurance photo ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                );
            case 'HouseInsurance':
                return (
                    <div>
                        <p>Type d'assurance: Maison</p>
                        <p>Adresse: {insurance.address}</p>
                        <p>Année de construction: {insurance.constructionYear.split('T')[0]}</p>
                        <p>Surface: {insurance.totalArea}m²</p>
                        <p>Nombre de chambres: S+{insurance.numberOfRooms}</p>
                        <div className='photos'>
                            <p>Photos de la maison:</p>
                            {insurance.housePictures.map((photo, index) => (
                                <img key={index} src={`http://localhost:4000/${photo}`} alt={`insurance photo ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                );
            case 'RetirementInsurance':
                return (
                    <div>
                        <p>Détails de l'assurance retraite</p>
                        <p>Revenu mensuel: {insurance.revenuesMensuel}</p>
                        <p>Somme à déposer: {insurance.sommeADeposer}</p>
                    </div>
                );
            default:
                return <div>Type d'assurance inconnu</div>;
        }
    };

    return (
        <div className="container">
            <h2>Détails d'assurance</h2>
            <h3>Nom & prénom: {`${insurance.user.firstname} ${insurance.user.lastname}`}</h3>
            <p>ID Utilisateur: {insurance.user._id}</p>
            <p>État: {insurance.state}</p>
            {renderInsuranceDetails()}
            {insurance.contrat && (
                <div className='documents'>
                    <p>Contrat:</p>
                    <div className="document-item">
                        {insurance.contrat.endsWith('.pdf') ? (
                            <object data={`http://localhost:4000/${insurance.contrat}`} type="application/pdf" width="80" height="80">
                                <a href={`http://localhost:4000/${insurance.contrat}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                            </object>
                        ) : (
                            <img src={`http://localhost:4000/${insurance.contrat}`} alt={`Contrat`} />
                        )}
                        <a href={`http://localhost:4000/${insurance.contrat}`} download="contrat">
                            <button className="document-download-button">Download</button>
                        </a>
                    </div>
                </div>
            )}
            {insurance.state === 'Treatement' && (
                <>
                    <button className="accept-button" onClick={() => handleStateUpdate('Agreement')}>Accepter</button>
                    <button className="reject-button" onClick={handleReject}>Refuser</button>
                </>
            )}
            {insurance.state === 'Agreement' && (
                <>
                    <button className="validate-button" onClick={() => handleStateUpdate('Not Paid')}>Valider</button>
                    <button className="reject-button" onClick={handleReject}>Refuser</button>
                </>
            )}
        </div>
    );
};

export default InsuranceDetails;
