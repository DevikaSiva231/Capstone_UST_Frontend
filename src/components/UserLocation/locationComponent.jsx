import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/userSlice';

const LocationComponent = () => {
  const dispatch = useDispatch();
  
  // Get latitude and longitude from Redux state
  const { latitude, longitude } = useSelector((state) => state.user);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error accessing location:", error);
          // Optionally handle errors here, if needed for logging or analytics
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Only request location if latitude or longitude is not set
    if (latitude === null || longitude === null) {
      requestLocation();
    }
  }, [dispatch, latitude, longitude]); // Re-run effect only if latitude or longitude changes

  return null;
};

export default LocationComponent;
