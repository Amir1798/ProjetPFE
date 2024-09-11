import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
 // Importez le fichier CSS contenant le style du message d'erreur
 import { useNavigate } from 'react-router-dom';

function SignInForm({setIsAuthenticated,setrole}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault(); // Empêche le comportement de soumission du formulaire par défaut

    try {
      setLoading(true); // Définit l'état de chargement sur true pendant que la requête API est en cours

      const response = await axios.post('http://localhost:4000/api/users/login', {
        email,
        password,
      });
      const token = response.data.data.jwttoken;
       const role = response.data.user.checkuser.role;
       console.log('role is',role);
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);

      setIsAuthenticated(true)
      setrole(role)
      console.log('role is', role);

      setSuccess('Connexion réussie!');
      if (role === 'ADMIN') {
        navigate('/admin'); // Redirect to AdminDashboard
      } else {
        navigate('/'); // Redirect to home
      }

      
    } catch (error) {
      // Gère les erreurs, affiche les messages d'erreur, etc.
      console.error('Échec de la connexion :', error.message);

      // Met à jour l'état d'erreur pour afficher le message d'erreur à l'utilisateur
      setError('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
    } finally {
      setLoading(false); // Définit l'état de chargement sur false après que la requête API est terminée
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSignIn}>
        <h1>Connexion</h1>
        <span>ou utilisez votre compte</span>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Affiche le message d'erreur avec la classe CSS 'error' */}
        {error && <div className="error">{error}</div>}
        <Link to="/forget">Mot de passe oublié ?</Link>
        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Se connecter'}
        </button>
        {/* Affiche le message de succès */}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default SignInForm;