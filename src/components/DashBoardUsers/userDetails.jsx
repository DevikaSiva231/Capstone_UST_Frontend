import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios"; // For API calls

const UserDetails = () => {
  const userId = useSelector((state) => state.user.userId); // Accessing userId from Redux state

  const [editing, setEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("Authorization token not found. Please log in.");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setUserDetails(response.data);
        setInitialData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details, please try again.");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!userDetails.username || !userDetails.email || !userDetails.location || !userDetails.bio) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Authorization token not found. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${userDetails.id}/`,
        userDetails,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setEditing(false);
      setInitialData(userDetails);
      console.log("User details updated:", response.data);
      setError(null);
    } catch (error) {
      console.error("Error updating user details:", error);
      setError("Error updating user details, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setUserDetails(initialData);
    setEditing(false);
    setError(null);
  };

  const isModified = JSON.stringify(userDetails) !== JSON.stringify(initialData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-gold">
      <div className="bg-opacity-30 backdrop-blur-lg shadow-lg p-8 rounded-xl w-4/5 md:w-2/3 lg:w-1/2 text-center bg-black/60 border border-gold">
        <h2 className="text-3xl font-extrabold mb-6 text-gold drop-shadow-lg">User Details</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex flex-col space-y-6 mb-6">
          <div className="flex flex-col">
            <label className="font-bold text-lg text-gold">Name</label>
            {editing ? (
              <input
                type="text"
                name="username"
                value={userDetails.username || ''}
                onChange={handleChange}
                className="p-3 rounded-xl bg-black/70 border border-gold text-white focus:outline-none focus:ring-2 focus:ring-gold transition duration-300"
              />
            ) : (
              <p className="text-lg">{userDetails.username}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-lg text-gold">Email</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email || ''}
                onChange={handleChange}
                className="p-3 rounded-xl bg-black/70 border border-gold text-white focus:outline-none focus:ring-2 focus:ring-gold transition duration-300"
              />
            ) : (
              <p className="text-lg">{userDetails.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-lg text-gold">Location</label>
            {editing ? (
              <input
                type="text"
                name="location"
                value={userDetails.location || ''}
                onChange={handleChange}
                className="p-3 rounded-xl bg-black/70 border border-gold text-white focus:outline-none focus:ring-2 focus:ring-gold transition duration-300"
              />
            ) : (
              <p className="text-lg">{userDetails.location}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-bold text-lg text-gold">Bio</label>
            {editing ? (
              <textarea
                name="bio"
                value={userDetails.bio || ''}
                onChange={handleChange}
                className="p-3 rounded-xl bg-black/70 border border-gold text-white focus:outline-none focus:ring-2 focus:ring-gold transition duration-300"
              />
            ) : (
              <p className="text-lg">{userDetails.bio}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <img
            src={userDetails.profile_picture}
            alt="Profile"
            className="rounded-full border-4 border-gold w-32 h-32 mx-auto shadow-xl"
          />
        </div>

        <div className="space-x-4">
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-3 rounded-full text-black bg-gold font-semibold text-lg transition duration-300 hover:bg-yellow-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          {editing && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 rounded-full text-black bg-gold font-semibold text-lg transition duration-300 hover:bg-yellow-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
          {!editing && isModified && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 rounded-full text-black bg-gray-700 font-semibold text-lg transition duration-300 hover:bg-gray-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
