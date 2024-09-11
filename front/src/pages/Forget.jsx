import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/forget.css';
import { hover } from '@testing-library/user-event/dist/hover';

function Forget() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setIsLoading(true); // Set isLoading to true when the request starts

    try {
      const response = await axios.post('http://localhost:4000/api/users/request-reset-password', {
        email,
      });

      // Assuming the server response indicates success with a specific data structure
      if (response.data && response.data === 'Password reset email sent.') {
        console.log(response);
        setSuccess('Password reset email sent successfully.');
         navigate ('/join')
      } else {
        setError('An error occurred. Please try again later.');
        setEmail(''); 
      }
    } catch (error) {
      console.error('Request Error:', error);
      // Handle errors from the server or network
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Set isLoading back to false when the request completes
    }
  };

  return (
    <div className='con'>
      <form className='con_form' onSubmit={handlePasswordReset}>
        <h2>Réinitialisation de Mot de Passe</h2>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <div>
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'En cours...' : 'Envoyer'}
        </Button>

        <div className='back-link'>
          <Link style={{ color: '#ff416c' }}   onMouseEnter={(e) => {

    e.target.style.color = '#fff';
  }} to="/join">Retour à la connexion</Link>
        </div>
      </form>
    </div>
  );
}

export default Forget;
