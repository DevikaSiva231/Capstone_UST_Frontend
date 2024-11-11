import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { salonImages, bookStoreImages, superMarketImages, restaurantsImages } from '../components/BusinessSection/images';
import BusinessSection from '../components/BusinessSection/businessSection';
import BusinessSection1 from '../components/BusinessSection/businessSection1';
import superMarketPic from '../images/home/superMarket-pic.jpg';
import HomeCarousel from '../components/homePage/homeCarousel';
import HomePageIcons from '../components/homePage/homePageIcons';

// Import the LocationComponent
import LocationComponent from '../components/UserLocation/LocationComponent';


function Home() {

  const [businesses, setBusinesses] = useState({
    restaurants: [],
    bookstores: [],
    salons: [],
    supermarkets: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = {
    restaurants: 'RESTAURANT',
    bookstores: 'BOOKSTORE',
    salons: 'SALON',
    supermarkets: 'SUPERMARKET',
  };

  const fetchBusinesses = async (category, key) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/businesses/?category=${category}`
      );
      setBusinesses((prev) => ({ ...prev, [key]: response.data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllBusinesses = async () => {
      await Promise.all(
        Object.entries(categories).map(([key, value]) => fetchBusinesses(value, key))
      );
      setLoading(false);
    };
  
    fetchAllBusinesses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Include LocationComponent here */}
      <LocationComponent />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      
      <div>
        <HomeCarousel />
      </div>
      
      <section>
        <div className="text-center glass h-44 w-full">
          <HomePageIcons />
        </div>
      </section>
      
      <br />
      <div id="restaurants">
        <BusinessSection 
          arr={businesses.restaurants} 
          image={restaurantsImages} 
          businessCategory={businesses.restaurants.length > 0 ? businesses.restaurants[0].category : 'No category available'} 
        />
      </div>
      <br />
      <div id="salons">
        <BusinessSection1 
          arr={businesses.salons} 
          image={salonImages} 
          businessCategory={businesses.salons.length > 0 ? businesses.salons[0].category : 'No category available'} 
        />
      </div>
      <br />
      <div id="supermarkets">
        <BusinessSection 
          arr={businesses.supermarkets} 
          image={superMarketImages} 
          businessCategory={businesses.supermarkets.length > 0 ? businesses.supermarkets[0].category : 'No category available'} 
        />
      </div>
      <br />
      <div id="bookstores">
        <BusinessSection1 
          arr={businesses.bookstores} 
          image={bookStoreImages} 
          businessCategory={businesses.bookstores.length > 0 ? businesses.bookstores[0].category : 'No category available'} 
        />
      </div>


      <div className="m-20 container h-96 ">
        <div>
          <p className="text-center">Our happy users</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
