import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/editProfile.css';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    city: '',
    address: '',
    phonenumber: '',
    avatar: null, // For uploading avatar(profile picture)
  });

  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('http://localhost:4000/api/users/user-profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setFormData(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Définit l'état du chargement sur true lors de la soumission du formulaire
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        'http://localhost:4000/api/users/update-account-info',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Updated user data:', response.data);
      navigate('/Profile');
      // Optionally, you can handle success response here, e.g., show a success message
    } catch (error) {
      console.error('Error updating user info:', error);
      // Optionally, you can handle error response here, e.g., show an error message
    }
    setIsLoading(false); // Réinitialise l'état du chargement après la réponse de l'API
  };

  return (
    <div className="edit-profile">
      <div className="profile-header">
        <h1 style={{ color: '#ffffff80' }}>Modifier le profil</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Prénom"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Nom de famille"
          />
        </div>
        <div className="input-field">
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate.split('T')[0]}
            onChange={handleChange}
            placeholder="Date de naissance"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ville"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Adresse"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
          />
        </div>
        {/* Avatar upload input */}
        <input type="file" name="avatar" onChange={handleAvatarChange} accept="image/*" />

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'En cours...' : 'Enregistrer'} {/* Modifie le texte du bouton en fonction de l'état de chargement */}
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
