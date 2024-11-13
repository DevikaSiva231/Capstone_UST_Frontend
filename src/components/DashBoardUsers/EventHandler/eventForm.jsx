import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function EventForm({ eventId = null }) {
  const { businessId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    status: "published",
    location: "",
    image: null,
  });

  const [businessName, setBusinessName] = useState('');

  // Fetch event data if editing
  useEffect(() => {
    if (eventId) {
      axios
        .get(`http://127.0.0.1:8000/api/events/${eventId}/`)
        .then((response) => {
          setEventData(response.data);
        })
        .catch((error) => console.error("Error fetching event data:", error));
    }

    // Fetch business name based on businessId
    axios
      .get(`http://127.0.0.1:8000/api/businesses/${businessId}/`)
      .then((response) => {
        setBusinessName(response.data.b_name);
      })
      .catch((error) => console.error("Error fetching business name:", error));
  }, [eventId, businessId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload (if needed)
  const handleImageChange = (e) => {
    setEventData({
      ...eventData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("start_time", eventData.start_time);
    formData.append("end_time", eventData.end_time);
    formData.append("status", eventData.status);
    formData.append("location", eventData.location);
    formData.append("business", businessId);
    if (eventData.image) formData.append("image", eventData.image);

    const request = eventId
      ? axios.put(`http://127.0.0.1:8000/api/events/${eventId}/`, formData)
      : axios.post("http://127.0.0.1:8000/api/events/", formData);

    request
      .then((response) => {
        console.log("Event saved successfully:", response.data);
        // Redirect to the userDashboard after the event is created or updated
        navigate("/userDashboard");
      })
      .catch((error) => {
        console.error("Error saving event:", error);
      });
  };

  return (
    <div className="event-form py-8 px-4 bg-transparent backdrop-blur-lg bg-opacity-30">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-yellow-600">
          {eventId ? "Edit Event" : "Create Event"}
        </h2>
        <h3 className="text-xl font-medium text-center mb-6 text-gray-600">
          <span className="font-semibold text-yellow-600">{businessName}</span>
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-medium text-yellow-600">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Event Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-lg font-medium text-yellow-600">
              Event Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Event Timing */}
          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label htmlFor="start_time" className="block text-lg font-medium text-yellow-600">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="start_time"
                name="start_time"
                value={eventData.start_time}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div className="w-1/2 space-y-2">
              <label htmlFor="end_time" className="block text-lg font-medium text-yellow-600">
                End Time
              </label>
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={eventData.end_time}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          {/* Event Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-lg font-medium text-yellow-600">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Event Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="block text-lg font-medium text-yellow-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={eventData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Event Image (Optional) */}
          <div className="space-y-2">
            <label htmlFor="image" className="block text-lg font-medium text-yellow-600">
              Event Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border-2 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              {eventId ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
