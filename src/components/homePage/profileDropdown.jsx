import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserId, clearLocation } from '../../redux/userSlice'; // Ensure correct path

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const accessToken = localStorage.getItem('accessToken');
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the user's profile picture
  const fetchProfilePicture = async () => {
    if (!userId || !accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const picture = response.data?.profile_picture;

      if (picture) {
        setProfilePicture(picture);
      } else {
        console.warn('Profile picture not found in response:', response.data);
      }
    } catch (err) {
      console.error('Error fetching profile picture:', err);
      setError('Failed to load profile picture.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && accessToken) {
      fetchProfilePicture();
    }
  }, [userId]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(clearUserId());
    dispatch(clearLocation());
    window.location.reload();
  };

  if (!accessToken) {
    return (
      <div className="flex space-x-4">
        <button className="btn" onClick={() => window.location.href = '/login'}>
          Login
        </button>
        <button className="btn" onClick={() => window.location.href = '/signup'}>
          Sign Up
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Profile"
            src={profilePicture || 'defaultProfilePic.png'}
            onError={(e) => e.target.src = 'defaultProfilePic.png'} // Fallback image
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a href="/profile" className="justify-between">
            Profile
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
