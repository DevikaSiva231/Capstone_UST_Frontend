import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DefaultEventImage from "../../../public/Events-default.jpg";

function Event({ name, id, mainImage }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/?business=${id}&status=published`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading events.</div>;

  return (
    <Carousel
      autoPlay={true}
      interval={2000}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
    >
      {/* Main Image Display with Glass Effect and Logo */}
      <div className="carousel-item w-full h-[500px] relative">
        <img
          src={mainImage || "/default-main-image.jpg"}
          className="w-full h-full object-cover"
          alt="Main Event Image"
        />
        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex justify-center items-center">
          {/* Centered Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black rounded-full flex items-center justify-center">
            <div className="w-40 h-40 bg-[#FFD700] rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
                <h3 className="text-3xl font-bold text-[#FFD700]">{name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Events with Glass Effect, All Text in Gold, Larger Font */}
      {events.map((eventItem) => (
        <div key={eventItem.id} className="carousel-item w-full h-[500px] relative">
          <img
            src={DefaultEventImage}
            className="w-full h-full object-cover"
            alt="Event Image"
          />
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-center items-center text-center px-4">
            <h3 className="text-4xl text-[#FFD700] font-extrabold mb-4">
              {eventItem.name}
            </h3>
            <p className="text-2xl text-[#FFD700] font-semibold mb-4">{eventItem.description}</p>
            <p className="text-xl text-[#FFD700] mb-4">
              {new Date(eventItem.start_time).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              -{" "}
              {new Date(eventItem.end_time).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-xl text-[#FFD700]">{eventItem.location}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default Event;
