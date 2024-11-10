import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function OwnerProfile() {
  const userId = useSelector((state) => state.user.userId);

  const [userDetails, setUserDetails] = useState({});
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    location: "",
    business_name: "",
    business: "",
    status: "published",
  });

  // Fetch user details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}/`)
      .then((response) => {
        setUserDetails(response.data);
        setIsBusinessOwner(response.data.is_business_owner);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [userId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/events/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Event created successfully!");
      console.log("Event created successfully:", response.data);
      setShowEventForm(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  // Toggle Event Form Modal
  const toggleEventForm = () => {
    setShowEventForm(!showEventForm);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* User Details */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h2>
        <p><strong>Username:</strong> {userDetails.username}</p>
        <p><strong>First Name:</strong> {userDetails.first_name || "N/A"}</p>
        <p><strong>Last Name:</strong> {userDetails.last_name || "N/A"}</p>
        <p><strong>Email:</strong> {userDetails.email || "N/A"}</p>
        <p><strong>Location:</strong> {userDetails.location || "N/A"}</p>
        <p><strong>Bio:</strong> {userDetails.bio || "N/A"}</p>
        <p><strong>Date Joined:</strong> {new Date(userDetails.date_joined).toLocaleDateString()}</p>
      </div>

      {/* Button to Show Event Form Modal */}
      {isBusinessOwner && (
        <button
          onClick={toggleEventForm}
          className="py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mb-6"
        >
          {showEventForm ? "Close Event Form" : "Create Event"}
        </button>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Event Form</h3>
            <form id="eventForm" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-600">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-600">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="start_time" className="block text-gray-600">Start Time:</label>
                  <input
                    type="datetime-local"
                    id="start_time"
                    name="start_time"
                    required
                    value={formData.start_time}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="end_time" className="block text-gray-600">End Time:</label>
                  <input
                    type="datetime-local"
                    id="end_time"
                    name="end_time"
                    required
                    value={formData.end_time}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleEventForm}
                    className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerProfile;
