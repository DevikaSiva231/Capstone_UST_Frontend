import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    if (loading) return <div>Loading user details...</div>;

    return (
        <div className="user-profile bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-lg mt-4">
                Edit Profile
            </button>
        </div>
    );
};

export default UserProfile;
