import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function OwnerProfile() {
  const userId = useSelector((state) => state.user.userId);

  const [userDetails, setUserDetails] = useState({});
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}/`)
      .then((response) => {
        const data = response.data;
        setUserDetails(data);
        setIsBusinessOwner(data.is_business_owner);

        if (data.is_business_owner) {
          fetchBusinessDetails();
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  // Fetch businesses for the authenticated owner
  const fetchBusinessDetails = () => {
    axios
      .get('http://127.0.0.1:8000/api/businesses/owner/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* User Details */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
        <p><strong>Username:</strong> {userDetails.username}</p>
        <p><strong>First Name:</strong> {userDetails.first_name || "N/A"}</p>
        <p><strong>Email:</strong> {userDetails.email || "N/A"}</p>
      </div>

      {/* Display Business Details */}
      {isBusinessOwner && (
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Businesses</h2>
          {businesses.length > 0 ? (
            <ul>
              {businesses.map((business) => (
                <li key={business.id}>
                  <h3>{business.b_name}</h3>
                  <p>{business.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No businesses found for this user.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerProfile;
