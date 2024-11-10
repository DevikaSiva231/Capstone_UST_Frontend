import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/userSlice';

const LocationComponent = () => {
  const dispatch = useDispatch();

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
    requestLocation();
  }, [dispatch]);

  return null;
};

export default LocationComponent;
