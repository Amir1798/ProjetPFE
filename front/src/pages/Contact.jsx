import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../styles/contact.css';

const Contact = React.forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        Subject: '',
        message: '',
        phoneNumber: '',
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        if (!formData.firstname.trim() || !formData.lastname.trim() || !formData.email.trim() || !formData.Subject.trim() || !formData.message.trim() || formData.message.trim().length < 100 || !formData.phoneNumber.trim()) {
            setError('All fields are required, and the message must be more than 100 characters.');
            return false;
        }
        return true;
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true); // Définit l'état du chargement sur true lors de la soumission du formulaire
            try {
                const response = await axios.post('http://localhost:4000/api/contact/addcontact', formData);
                if (response.status === 200) {
                    setSuccess('Form submitted successfully!');
                    setError('');
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        Subject: '',
                        message: '',
                        phoneNumber: '',
                    });
                } else {
                    setError('Error submitting form. Please try again.');
                }
            } catch (error) {
                setError('An error occurred. Please try again.');
            }
            setIsLoading(false); // Réinitialise l'état du chargement après la réponse de l'API
        } else {
            setSuccess('');
        }
    };

    return (
        <div className='con' style={{ marginTop: '180px', background: 'linear-gradient(to right, #ff4b2b, #ff416c)', minHeight: 'calc(100vh - 200px)' }}>
            <form className='con_form' onSubmit={onSubmit}>
                <h1 >Contactez-nous</h1>
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <div className='row'>
                    <input
                        type="text"
                        placeholder="Nom"
                        name="lastname"
                        value={formData.lastname}
                        onChange={onChange}
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="text"
                        name="firstname"
                        placeholder="Prénom"
                        value={formData.firstname}
                        onChange={onChange}
                        style={{ marginRight: '10px' }}
                    />
                </div>
                <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={onChange} style={{ marginBottom: '10px' }} required />
                <input type="number" name="phoneNumber" placeholder="Numéro de téléphone" value={formData.phoneNumber} onChange={onChange} style={{ marginBottom: '10px' }} required />
                <input type="text" name="Subject" placeholder='Sujet' value={formData.Subject} onChange={onChange} style={{ marginBottom: '10px' }} required />
                <textarea name="message" placeholder="Message" value={formData.message} onChange={onChange} style={{ marginBottom: '10px' }}></textarea>
                <Button type="submit" variant="dark" style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    {isLoading ? 'En cours...' : 'Envoyer'} {/* Modifie le texte du bouton en fonction de l'état de chargement */}
                </Button>
            </form>
        </div>
    );
});

export default Contact;
