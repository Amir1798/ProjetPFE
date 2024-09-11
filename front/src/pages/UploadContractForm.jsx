import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../styles/UploadContractForm.css'; // Import the new CSS file
import { useParams } from 'react-router-dom';

const UploadContractForm = () => {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const { id } = useParams(); 
    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('contract', selectedFile);

        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                throw new Error('Token not found');
            }
            const response = await axios.put(`http://localhost:4000/api/users/update-contract/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Contract uploaded successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            setMessage('Failed to upload contract.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Signed Contract</h2>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Déposez les fichiers ici...</p>
                ) : (
                    <p>Glissez-déposez un fichier ici, ou cliquez pour sélectionner un fichier</p>
                )}
            </div>
            <button type="button" className="add-button" onClick={open}>
                Choisir un fichier
            </button>
            <button onClick={handleSubmit}>Upload Contract</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadContractForm;
