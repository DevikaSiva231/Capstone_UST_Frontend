import React, { useState,useEffect, useMemo } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { salonImages, bookStoreImages, superMarketImages, restaurantsImages } from '../components/BusinessSection/images';
import BusinessSection from '../components/BusinessSection/businessSection';
import BusinessSection1 from '../components/BusinessSection/businessSection1';
import superMarketPic from '../images/home/superMarket-pic.jpg';
import HomeCarousel from '../components/homePage/homeCarousel';
import HomePageIcons from '../components/homePage/homePageIcons';

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
        `http://127.0.0.1:8000/api/businesses/?category=${category}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // }
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
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <div >
          < HomeCarousel />
        </div>
        <section>
        <div className="text-center glass h-44 w-full">
          < HomePageIcons />
        </div>
      </section>
      <div>
        <p className="text-center"><a href="/registerbusiness">Register now</a></p>
      </div>
      {console.log('Business:', businesses.restaurants)}

      <div id="restaurants">
        <BusinessSection  arr={businesses.restaurants} image={restaurantsImages}/>
      </div>

      <br />
      <div id="salons">
        <BusinessSection1 arr={businesses.salons} image={salonImages}/>
      </div>
      <br />
      <div id="supermarkets">
        <BusinessSection arr={businesses.supermarkets} image={superMarketImages}/>
      </div>
      <br />
      <div id="bookstores">
        <BusinessSection1 arr={businesses.bookstores} image={bookStoreImages}/>
      </div>


      <div className="m-20 container h-96 ">
        <div>
          <p className="text-center">our happy users</p>
        </div>
      </div>
    </div>
  )
}

export default Home