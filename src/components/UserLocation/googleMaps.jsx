import React from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyC8_8HyP3rIPOBemdhXgFheAe61sIUkSas';

const GoogleMapsBusiness = ({ address, zipcode}) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(`${address}, ${zipcode}`)}`;

  return (
    <div className="">
      <h1>Business Location</h1>
      <p>{address}, {zipcode}</p>
      <iframe
        title="Google Maps Location"
        src={googleMapsUrl}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GoogleMapsBusiness;
