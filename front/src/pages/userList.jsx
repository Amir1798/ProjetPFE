import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/userList.css'; // Ensure correct import path

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const usersPerPage = 3; // Define how many users you want per page

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await axios.get('http://localhost:4000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsers(response.data.data); // Access the 'data' array inside 'data' object
                setLoading(false);
            } catch (err) {
                console.error('Error fetching users:', err); // Log the error
                setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Logic for filtering users based on search query
    const filteredUsers = users.filter(user => 
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Logic for displaying current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="search-bar"
            />
            <div className="user-list">
                {currentUsers.map(user => (
                    <div className="user-block" key={user._id}>
                        <img src={`http://localhost:4000/uploads/avatar/${user.avatar}`} alt="Avatar" className="avatar" />
                        <div className="user-details">
                            <h3>{`${user.firstname} ${user.lastname}`}</h3>
                            <p>Email: {user.email}</p>
                            <p>Phone Number: {user.phonenumber}</p>
                            <p>Address: {user.address}</p>
                            <Link to={`/userDetails/${user._id}`} className="details-link">
                                Plus de détails
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserList;
