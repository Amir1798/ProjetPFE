import React, { useState } from 'react';
import axios from 'axios';
import '../styles/habitation.css'; // Import the CSS file

const AddHouseInsurance = () => {
    const [formData, setFormData] = useState({
        address: '',
        constructionYear: '',
        totalArea: '',
        numberOfRooms: '',
        housePictures: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            housePictures: Array.from(e.target.files)
        }));
    };

    const token = localStorage.getItem('userToken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('address', formData.address);
        formDataToSend.append('constructionYear', formData.constructionYear);
        formDataToSend.append('totalArea', formData.totalArea);
        formDataToSend.append('numberOfRooms', formData.numberOfRooms);
        formData.housePictures.forEach((file) => {
            formDataToSend.append('housePictures', file);
        });

        try {
            const res = await axios.post('http://localhost:4000/api/houseInsurance/addHouseInsurance', formDataToSend, {
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
        <form className="habit-container" onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Addresse:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label>Année de Construction:</label>
                <input
                    type="date"
                    name="constructionYear"
                    value={formData.constructionYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label>Surface (m²):</label>
                <input
                    type="number"
                    name="totalArea"
                    value={formData.totalArea}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label>Nombres de chambres:</label>
                <input
                    type="number"
                    name="numberOfRooms"
                    value={formData.numberOfRooms}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label>Photos de Maison :</label>
                <input
                    type="file"
                    name="housePictures"
                    onChange={handleFileChange}
                    multiple
                    required
                />
            </div>
            <button type="submit">Suivant</button>
        </form>
    );
};

export default AddHouseInsurance;
