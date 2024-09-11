import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword({ setShowLogin }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // État pour contrôler le chargement

  const { token } = useParams();
  const navigate = useNavigate();

  const handleForgetPasswordClick = () => {
    setShowLogin(true);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setIsLoading(true); // Définir isLoading à true lors du chargement de la requête

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setIsLoading(false); // Remettre isLoading à false après avoir défini l'erreur
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4000/api/users/reset-password/${token}`, {
        password: newPassword,
      });

      setSuccess(response.data);
      navigate("/Join")
      setShowLogin(true);
      

    } catch (error) {
      console.log("Une erreur s'est produite");
    } finally {
      setIsLoading(false); // Remettre isLoading à false après que la requête soit terminée
    }
  };

  return (
    <div className='con'>
      <form className='con_form' onSubmit={handlePasswordReset}>
        <h2 style={{ color: '#ffffff80' }}>Réinitialisation de Mot de Passe</h2>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <div>
          <input
            type="password"
            placeholder="Nouveau Mot de Passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmer le Mot de Passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}> {/* Désactiver le bouton si isLoading est vrai */}
          {isLoading ? 'En cours...' : 'Réinitialiser le Mot de Passe'} {/* Afficher "En cours..." si isLoading est vrai */}
        </button>
        <div className='back-link'>
        <Link style={{ color: '#ff4b2b' }}   onMouseEnter={(e) => {

e.target.style.color = '#fff';
}} 
onMouseLeave={(e) => {
  e.target.style.color = '#ff4b2b';
}}
to="/join">Retour à la connexion</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
