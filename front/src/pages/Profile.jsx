import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css'; 
import logo from "../assets/testlog.png";
import { Link } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    city: '',
    address: '',
    phoneNumber: '',
  });

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
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Mon profil</h1>
      </div>
      <div className='avatar'>
        <img src={`http://localhost:4000/uploads/avatar/${userData.avatar}`}  alt="Avatar" />
      </div>
      <div className="profile-body">
        <div className="profile-details">
          <div className="detail">
            <span className="label">Prénom :</span>
            <span className="value">{userData.firstname}</span>
          </div>
          <div className="detail">
            <span className="label">Nom de famille :</span>
            <span className="value">{userData.lastname}</span>
          </div>
          <div className="detail">
            <span className="label">Date de naissance :</span>
            <span className="value">{userData.birthdate.split('T')[0]}</span>
          </div>
          <div className="detail">
            <span className="label">Ville :</span>
            <span className="value">{userData.city}</span>
          </div>
          <div className="detail">
            <span className="label">Adresse :</span>
            <span className="value">{userData.address}</span>
          </div>
          <div className="detail">
            <span className="label">Numéro de téléphone :</span>
            <span className="value">{userData.phonenumber}</span>
          </div>
      <Link to='/EditProfile'>  <button className="button">Modifier le profil</button> </Link>  
        </div>
      </div>
    </div>
  );
}

export default Profile;
