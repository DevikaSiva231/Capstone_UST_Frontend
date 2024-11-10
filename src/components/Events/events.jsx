import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Event({name, id, mainImage}) {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/events/?business=${id}&status=published`) 
    .then((response) => {
      setEvents(response.data);console.log(response.data)
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);

  console.log('Main Image:', mainImage);
  return (
    <Carousel
      autoPlay={true} // Enable autoplay
      interval={2000} // Delay between slides in milliseconds (3 seconds)
      infiniteLoop={true} // Enable infinite loop
      showThumbs={false} // Hide thumbnail navigation
      showStatus={false} // Hide the status (slide number)
    >
      <div id="item1" className="carousel-item w-full h-96 bg-contain relative">
        <img
       
          src={mainImage}
          className="w-full"
          alt="Event 1"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{name}</h3>
      </div>
        
      </div>
      {events.map((eventitem,index) =>(
        <div id="item4" className="h-96 carousel-item w-full">
          <img
            src={eventitem.image}
            className="w-full"
            alt="Event 4"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Event;
