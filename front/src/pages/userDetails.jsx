import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/profile.css';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get(`http://localhost:4000/api/users/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user details:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="profile">
            <div className="profile-header">
                <h2>User Details</h2>
            </div>
            <div className="avatar">
            <img  src={`http://localhost:4000/uploads/avatar/${user.avatar}`} alt="Avatar" />          
              </div>
            <div className="profile-body">
                <div className="profile-details">
                    {user && (
                        <div>
                            <div className="detail">
                                <span className="label">ID:</span>
                                <span className="value">{user._id}</span>
                            </div>
                            <div className="detail">
                                <span className="label">First Name:</span>
                                <span className="value">{user.firstname}</span>
                            </div>
                            <div className="detail">
                                <span className="label">Last Name:</span>
                                <span className="value">{user.lastname}</span>
                            </div>
                            <div className="detail">
                                <span className="label">Email:</span>
                                <span className="value">{user.email}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
