import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function OwnerProfile() {
  const userId = useSelector(state => state.user.userId);

  const [users, setUsers] = useState([]);
  const [isBusinessOwner, setIsBusinessOwner] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}/`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setIsBusinessOwner(response.data.is_business_owner);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/events/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Event created successfully:", response.data);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isBusinessOwner && (
        <form
          id="eventForm"
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Event Form</h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-600">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>

            <div>
              <label htmlFor="start_time" className="block text-gray-600">
                Start Time:
              </label>
              <input
                type="datetime-local"
                id="start_time"
                name="start_time"
                required
                value={formData.start_time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="end_time" className="block text-gray-600">
                End Time:
              </label>
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                required
                value={formData.end_time}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>


            <div>
              <label htmlFor="location" className="block text-gray-600">
                Location:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="business_name" className="block text-gray-600">
                Business Name:
              </label>
              <input
                type="text"
                id="business_name"
                name="business_name"
                required
                value={formData.business_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-gray-600">
                Business ID:
              </label>
              <input
                type="number"
                id="business"
                name="business"
                required
                value={formData.business}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-gray-600">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default OwnerProfile;
