import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventManager = ({ userId }) => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [events, setEvents] = useState({}); // Store events for each business
  
  // Fetch all businesses for the user
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/businesses?user_id=${userId}`)
      .then((response) => {
        setBusinesses(response.data);
        // For each business, fetch the events
        response.data.forEach((business) => {
          axios
            .get(`http://127.0.0.1:8000/api/events?business=${business.id}`)
            .then((eventResponse) => {
              setEvents((prevEvents) => ({
                ...prevEvents,
                [business.id]: eventResponse.data,
              }));
            });
        });
      })
      .catch((error) => console.error("Error fetching businesses:", error));
  }, [userId]);

  const handleCreateEventClick = (businessId) => {
    navigate(`/events/create/${businessId}`);
  };

  const handleDeleteEvent = (eventId, businessId) => {
    axios
      .delete(`http://127.0.0.1:8000/api/events/${eventId}/`)
      .then(() => {
        setEvents((prevEvents) => ({
          ...prevEvents,
          [businessId]: prevEvents[businessId].filter((event) => event.id !== eventId),
        }));
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  const handleUpdateEvent = (eventId) => {
    navigate(`/events/edit/${eventId}`);
  };

  return (
    <div className="event-manager mb-4">
      <h4 className="text-lg font-semibold">Manage Events</h4>
      {businesses.map((business) => (
        <div key={business.id} className="business-events mb-6">
          <h5 className="text-xl font-semibold text-yellow-600">{business.b_name}</h5>
          <button
            className="py-2 px-4 bg-yellow-600 text-white rounded-lg"
            onClick={() => handleCreateEventClick(business.id)}
          >
            Create Event
          </button>

          <div className="events-grid mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events[business.id] && events[business.id].map((event) => (
              <div key={event.id} className="event-card bg-white p-4 rounded-lg shadow-lg">
                <h6 className="font-semibold text-lg">{event.name}</h6>
                <p>{event.description}</p>
                <div className="mt-2 flex justify-between">
                  <button
                    className="py-2 px-4 bg-yellow-500 text-white rounded-lg"
                    onClick={() => handleUpdateEvent(event.id)}
                  >
                    Update
                  </button>
                  <button
                    className="py-2 px-4 bg-red-600 text-white rounded-lg"
                    onClick={() => handleDeleteEvent(event.id, business.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventManager;
