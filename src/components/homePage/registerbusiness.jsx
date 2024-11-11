import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterBusiness() {
  const navigate = useNavigate();

  // Check if user is signed in (access and refresh tokens exist)
  const isUserSignedIn = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken && refreshToken;
  };

  const handleRegisterClick = () => {
    if (isUserSignedIn()) {
      navigate('/registerBusiness');
    } else {
      alert('Please sign in first.');
      navigate('/login');
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleRegisterClick}>
        Register Your Business
      </button>
    </div>
  );
}

export default RegisterBusiness;
