import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Events = () => {
  const [businesses, setBusinesses] = useState([]);
  const [events, setEvents] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState(null);

  const isBusinessOwner = useSelector((state) => state.user.isBusinessOwner);

  useEffect(() => {
    const fetchBusinessesAndEvents = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/businesses/owner/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setBusinesses(response.data);

        // Fetch events for each business
        const eventsData = {};
        await Promise.all(response.data.map(async (business) => {
          const eventsResponse = await axios.get("http://127.0.0.1:8000/api/events/", {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { business: business.id },
          });
          eventsData[business.id] = eventsResponse.data;
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching businesses or events:", error);
      }
    };

    if (isBusinessOwner) {
      fetchBusinessesAndEvents();
    }
  }, [isBusinessOwner]);

  const handleCreateEvent = (business) => {
    setNewEvent({ business: business.id, business_name: business.b_name, status: "published" });
    setIsCreating(true);
  };

  const handleSaveEvent = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/events/", newEvent, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setEvents({
        ...events,
        [newEvent.business]: [...(events[newEvent.business] || []), response.data],
      });
      setIsCreating(false);
      setNewEvent(null);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
      {businesses.map((business) => (
        <div key={business.id} className="mb-8">
          <h3 className="text-xl font-bold">{business.b_name}</h3>
          {events[business.id]?.map((event) => (
            <div key={event.id} className="border-b-2 py-4">
              <h4 className="text-lg">{event.name}</h4>
              <p>{event.description}</p>
              <p>{event.location}</p>
              {/* Other event details... */}
            </div>
          ))}
          <button
            onClick={() => handleCreateEvent(business)}
            className="mt-2 p-2 bg-gold rounded-full text-white"
          >
            Create New Event
          </button>
        </div>
      ))}

      {/* Create Event Popup */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl mb-4">Create Event for {newEvent.business_name}</h3>
            <div className="mb-2">
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                value={newEvent.name || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Description</label>
              <textarea
                name="description"
                value={newEvent.description || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Start Time</label>
              <input
                type="datetime-local"
                name="start_time"
                value={newEvent.start_time || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label>End Time</label>
              <input
                type="datetime-local"
                name="end_time"
                value={newEvent.end_time || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={newEvent.location || ""}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <button
              onClick={handleSaveEvent}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Save Event
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
