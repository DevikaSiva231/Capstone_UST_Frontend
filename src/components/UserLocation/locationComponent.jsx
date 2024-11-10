import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage("Location access denied by user.");
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setErrorMessage("Location request timed out.");
              break;
            default:
              setErrorMessage("An unknown error occurred.");
          }
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  // Use useEffect to request location as soon as the component mounts
  useEffect(() => {
    requestLocation();
  }, []); // Empty dependency array ensures it runs only on mount

  return (
    <div>
      <h1>Find Nearby Businesses</h1>
      {location ? (
        <p>Your location: Latitude {location.latitude}, Longitude {location.longitude}</p>
      ) : (
        <p>We’d like to use your location to show businesses near you. Please allow location access.</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LocationComponent;
