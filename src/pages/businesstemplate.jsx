import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Businesstemplate() {

  const API_KEY = '';

  const address = 'Thakadiyil+Chelad+Karingazha+Keerampara';
  const zipcode = '686681';

  // const rawAddress = "Thakadiyil Chelad Karingazha Keerampara";
  // const addresses = encodeURIComponent(rawAddress).replace(/%20/g, '+');

  // console.log(addresses);

  // Construct the Google Maps URL with encoded address and zipcode
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(`${address}, ${zipcode}`)}`;


  const [prod, setProd] = useState([]);
  const [business, setBusiness] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getInventory = axios.get("http://127.0.0.1:8000/api/inventory/");
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
      .get("http://127.0.0.1:8000/api/businesses/",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
    // <div>Businesstemplate
    //     Events poster,
    //     Address,
    //     Description,
    //     location (map),
    //     products,price,
    //     reviews,
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
      {/* Welcome Section */}
      <div className="text-center h-96 text-white py-20 bg-[url(https://tse2.mm.bing.net/th/id/OIP.rvO-FyN5O8CBShQkyQmKcgHaE8?w=317&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7)] bg-flex">
        
      </div>

      {/* About Section */}
      <div className="m-10 ml-18 h-44">
        <div className="text-center">
          <h2 className="text-2xl text-center font-semibold mt-20 mb-4">Welcome</h2>
          {business && (
            <div id={business[0].id}>
              {console.log('ID:', business[0].id)}
              <p className="text-gray-700 text-center">{business[0].description}</p>
              <p className="text-gray-700 text-center">{business[0].address}</p>
            </div>
    )}
          {console.log("business",business[0].address)}
          <div className="justify-center">
            <br/>
          <i className="fab fa-facebook pr-5"></i>
          <i className="fab fa-twitter pr-5"></i>
          <i className="fab fa-instagram "></i>
          </div>
        </div>   
      </div>

      <div className="mt-20 mx-auto px-10 py-12">
        <h1 className="text-2xl text-black text-center"> Our Menu </h1>
        <br />
        <br />
        <div className="mt-14 ml-24 grid grid-cols-3 gap-3">
          {prod.map((product, index)=>(
            <div key={index}>
            <div className="relative w-64 mb-14">
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-52 h-52 rounded-full overflow-hidden border-2 border-white shadow-lg">
                <img
                  src={product.image}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className={`mt-16 p-6 pt-16 ${randomColor} shadow-lg h-44 text-center`} style={{ backgroundColor: randomColor }}>
                <h2 className="text-xl font-semibold mb-2"></h2>
                <p className=" mt-14 text-gray-600">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
          ))}

        </div>
      </div>

      {/* booking and Timing Section */}
      <div className="">
        <div className="grid grid-cols-2">
          <div style={{ backgroundColor:"#8E6547"}}>
            Restaurant timings
            <br />
            blah
            <br />
            <br />
            blah
            <br />
            <br />
            blah
            <br />
            <br />
            blah
            <br />
          </div>
          <div className="bg-[url(https://tse4.mm.bing.net/th/id/OIP.T56Bd63N3eTV-zxPRwgPVQAAAA?rs=1&pid=ImgDetMain)]">
            <br/>
            <h1 className="text-2xl text-center mt-2 text-white"> Book a Table</h1><br/>
            <div className="ml-32 card glass w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body m-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="phone number"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">No. of People</span>
                  </label>
                  <input
                    type="text"
                    placeholder="no of people"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="enter date"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="time"
                    placeholder="enter date"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
                <div className="form-control mt-6">
                  <button className="btn ">Book now</button>
                </div>
              </form>
            </div>
            <br/>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-orange-950 mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Heres what our customer have to say.
        </h2>
        <br />
        <div className="grid grid-cols-3 gap-4 ml-2">
          <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <br />
              <div className="card-actions justify-end">
                {/* <button className="btn btn-primary">Buy Now</button> */}
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <br />
              <div className="card-actions justify-end">
                {/* <button className="btn btn-primary">Buy Now</button> */}
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <br />
              <div className="card-actions justify-end">
                {/* <button className="btn btn-primary">Buy Now</button> */}
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 w-80 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <br />
              <div className="card-actions justify-end">
                {/* <button className="btn btn-primary">Buy Now</button> */}
                <div className="rating gap-1">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-red-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-yellow-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-lime-400"
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-heart bg-green-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="glass mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <p className="text-center">{address}, {zipcode}</p>
        <div className="ml-72 w-96">
        {/* <p>location map</p> */}
          <iframe className=""
            title="Google Maps Location"
            src={googleMapsUrl}
            width="700"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-black mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">gallery</h2>
        <p className="text-gray-700 mb-6">images</p>
      </div>
    </>
  );
}

export default Businesstemplate;