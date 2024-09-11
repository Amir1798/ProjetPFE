import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    cinnumber: '',
    email: '',
    password: '',
    birthdate: '',
    address: '',
    city: '',
    phonenumber: '',
    avatar: null
  });
  const [loading, setLoading] = useState(false);
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { firstname, lastname, cinnumber, email, password, birthdate, address, city, phonenumber, avatar } = formData;
    const data = new FormData();
    data.append('firstname', firstname);
    data.append('lastname', lastname);
    data.append('cinnumber', cinnumber);
    data.append('email', email);
    data.append('password', password);
    data.append('birthdate', birthdate);
    data.append('address', address);
    data.append('city', city);
    data.append('phonenumber', phonenumber);
    if (avatar) {
      data.append('avatar', avatar);
    }

    try {
      await axios.post('http://localhost:4000/api/users/register', data);
      // Handle success (redirect, show success message, etc.)
    } catch (error) {
      // Handle error (show error message, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Créer un Compte</h1>
        <div className="row">
          <input type="text" name="firstname" placeholder="Prénom" value={formData.firstname} onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Nom" value={formData.lastname} onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="text" name="cinnumber" placeholder="CIN" value={formData.cinnumber} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} required />
        </div>
        <input type="date" name="birthdate" id="birthdate" value={formData.birthdate.split('T')[0]} onChange={handleChange} required />
        <div className="row">
          <input type="text" name="address" placeholder="Adresse" value={formData.address} onChange={handleChange} required />
          <input type="text" name="city" placeholder="Ville" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="number" name="phonenumber" placeholder="Numéro de téléphone" value={formData.phonenumber} onChange={handleChange} required />
          <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'En cours...' : 'S\'inscrire'}</button>
      </form>
    </div>
  );
}

export default SignUpForm;
