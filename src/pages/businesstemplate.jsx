import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Event from "../components/Events/events";
import {useLocation} from 'react-router-dom'
import Calendar from "../components/BusinessSection/calender";
import ReviewSection from "../components/Reviews/reviewSection";
import BusinessTimings from "../components/BusinessSection/businessTimings";

function Businesstemplate() {
  const location = useLocation();
  const { id } = location.state || {};
  console.log(id)

  const API_KEY = '';

  const address = 'Thakadiyil+Chelad+Karingazha+Keerampara';
  const zipcode = '686681';

  // const rawAddress = "Thakadiyil Chelad Karingazha Keerampara";
  // const addresses = encodeURIComponent(rawAddress).replace(/%20/g, '+');

  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(`${address}, ${zipcode}`)}`;


  const [prod, setProd] = useState([]);
  const [business, setBusiness] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getInventory = axios.get(`http://127.0.0.1:8000/api/inventory/?business=${id}`);
    const getUsers = axios.get("http://127.0.0.1:8000/api/users/");

    axios
      .all([getInventory, getUsers])
      .then(axios.spread((inventoryResponse, userResponse) => {
        setProd(inventoryResponse.data);
        setUsers(userResponse.data);
        setLoading(false);
      })
      
      ).catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get(`http://127.0.0.1:8000/api/businesses/${id}/`,{
        // headers: {
        //   'Authorization': `Bearer ${token}`,
        //   'Content-Type': 'application/json',
        // },
      }) 
      .then((response) => {
        setBusiness(response.data);console.log(response.data)
        setLoading(false);
      }).catch((error) => {
        setError(error);
        setLoading(false);
      });
  },   []);

  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const colors = [
    "#DEB79B","#80A567","#8E6547"
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
      
      {/* Welcome Section */}
      <div>
        <Event name={business.b_name} id={business.id} mainImage={business.images}/>
      </div>

      {/* About Section */}
      <div className="m-10 ml-18 h-44">
        <div className="text-center">
          <h2 className="text-2xl text-center font-semibold mt-20 mb-4">Welcome</h2>
          {business && (
            <div id={business.id}>
              <p className="text-gray-700 text-center">{business.description}</p>
              <p className="text-gray-700 text-center">{business.address}</p>
            </div>
    )}
          {console.log("business",business.address)}
          <div className="justify-center">
            <br/>
          <i className="fab fa-facebook pr-5"></i>
          <i className="fab fa-twitter pr-5"></i>
          <i className="fab fa-instagram "></i>
          </div>
          <br/>


{/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}>open event calender</button>
<dialog id="my_modal_1" className="modal">
<div className="modal-box">
  <h3 className="font-bold text-lg">Hello!</h3>
  <p className="py-4 flex justify-center items-center">
    <Calendar id={id} />
  </p>
  <div className="modal-action">
    <form method="dialog">
      <button className="btn">Close</button>
    </form>
  </div>
</div>

</dialog>

        </div>   
      </div>

      <section className="mt-20 mx-auto px-10 py-12">
        <h1 className="text-2xl text-black text-center"> Our Menu </h1>
        <br />
        <br />
        {console.log(prod)}
        <div className="mt-14 ml-24 grid grid-cols-3 gap-3">
         {prod.map((product, index) => (
         <div key={index}>
            <div className="card card-compact bg-base-100 w-72 h-96 shadow-xl rounded-none">
              <figure className="h-48 rounded-none overflow-hidden">
                <img
                 src={product.image}
                 alt="Product Image"
                 className="h-full w-full object-cover rounded-none"
                />
              </figure>
           <div className="card-body h-48 p-2 overflow-hidden rounded-none">
            <h2 className="card-title text-sm truncate">{product.product_name}</h2>
            <p className="text-xs truncate">{product.description}</p>
           <div className="flex justify-between text-sm">
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
            </div>

        </div>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* booking and Timing Section */}
      <div className="">

        <div className="grid grid-cols-2">

       
          <BusinessTimings workTime={business.work_time} />


          <div className="bg-[url()]">
            <br/>
            <h1 className="text-2xl text-center mt-2 text-white"> Contact Us</h1><br/>
            <div className="ml-32 card glass w-full max-w-sm shrink-0 shadow-2xl">
              <p>Phone number:{business.phone}</p>
              <p>Email: {business.email}</p>
            </div>
            <br/>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      < ReviewSection />
      {/* Gallery Section */}
      <div className="bg-black mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">gallery</h2>
        <p className="text-gray-700 mb-6">images</p>
      </div>
    </>
  );
}

export default Businesstemplate;