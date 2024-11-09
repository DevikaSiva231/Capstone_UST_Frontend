import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { salonImages, bookStoreImages, superMarketImages, restaurantsImages } from '../components/BusinessSection/images';
import BusinessSection from '../components/BusinessSection/businessSection';

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log("response--->",category,response.data);
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

  businesses && businesses.restaurants.map((item) => {

    console.log("-------------");
    console.log(item);
    console.log("-------------");
  })

  return (
    
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <div className="hero-overlay" style={{backgroundColor:"#866756"}}>
            <div className="bg-opacity-20"></div>
                <div className="text-neutral-content text-left">
                <div className="max-w-md">
                  <br/>
                  <h1 className="ml-10 mb-5 text-5xl font-bold">Hello there</h1>
                    <h2 className="text-2xl">Welcome to Around Town - Supporting Your Local Favourites</h2>
                        <p className="mb-10 mt-2">
                        Discover the best that our community has to offer. Join us in supporting local business, and be a part of a thriving community where each purchase has a positive impact. 
                        Explore, shop, and share the love for local.
                        </p>
                    <Link to="login/"><button className="mb-5 btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
        <section>
        <div className="text-center glass h-44 w-full">
          <div className="flex justify-center pt-14 space-x-20">
            {/* Restaurant Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-utensils text-3xl"></i>
              <p className="mt-2 text-sm">Restaurant</p>
            </div>
            
            {/* Bookstore Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-book text-3xl"></i>
              <p className="mt-2 text-sm">Bookstore</p>
            </div>
            
            {/* Salon Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-bath text-3xl"></i>
              <p className="mt-2 text-sm">Salon</p>
            </div>
            
            {/* Plant Nursery Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-seedling text-3xl"></i>
              <p className="mt-2 text-sm">Others</p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <p className="text-center"><a href="/registerbusiness">Register now</a></p>
      </div>
      
      <BusinessSection arr={businesses.restaurants} image={restaurantsImages}/>
      <br />
      <BusinessSection arr={businesses.salons} image={salonImages}/>
      <br />
      <BusinessSection arr={businesses.supermarkets} image={superMarketImages}/>
      <br />
      <BusinessSection arr={businesses.bookstores} image={bookStoreImages}/>


      <div className="m-20 container h-96 ">
        <div>
          <p className="text-center">our happy users</p>
        </div>
      </div>
    </div>
  )
}

export default Home