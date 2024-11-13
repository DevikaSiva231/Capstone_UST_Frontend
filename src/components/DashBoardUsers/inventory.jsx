import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API requests
import { useSelector } from "react-redux"; // To access userId from Redux

const Inventory = () => {
  const userId = useSelector((state) => state.user.userId); // Access userId from Redux
  const [businesses, setBusinesses] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [isEditingInventory, setIsEditingInventory] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Function to get the access token from localStorage
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  // Fetch businesses for the user when userId changes
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const token = getAccessToken(); // Get the token from localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/businesses/owner`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });
        setBusinesses(response.data); // Set businesses to state
        if (response.data.length > 0) {
          setSelectedBusinessId(response.data[0].id); // Select the first business by default
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    if (userId) {
      fetchBusinesses();
    }
  }, [userId]);

  // Fetch inventory for the selected business
  useEffect(() => {
    if (selectedBusinessId) {
      const fetchInventory = async () => {
        try {
          const token = getAccessToken(); // Get the token from localStorage
          const response = await axios.get("http://127.0.0.1:8000/api/inventory/", {
            params: { business: selectedBusinessId },
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          });
          setInventory(response.data);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      };

      fetchInventory();
    }
  }, [selectedBusinessId]);

  const handleDelete = async (itemId) => {
    try {
      const token = getAccessToken(); // Get the token from localStorage
      await axios.delete(`http://127.0.0.1:8000/api/inventory/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
        },
      });
      setInventory(inventory.filter((item) => item.id !== itemId)); // Remove from list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEditInventory = (item) => {
    setCurrentItem(item);
    setIsEditingInventory(true);
  };

  const handleSaveInventory = async () => {
    try {
      const token = getAccessToken(); // Get the token from localStorage
      const response = await axios.put(
        `http://127.0.0.1:8000/api/inventory/${currentItem.id}/`,
        currentItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        }
      );
      setInventory(inventory.map((item) =>
        item.id === currentItem.id ? response.data : item
      ));
      setIsEditingInventory(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleChangeInventory = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value,
    });
  };

  const renderBusinessList = () => {
    return businesses.map((business) => (
      <button
        key={business.id}
        onClick={() => setSelectedBusinessId(business.id)}
        className="border p-2 mb-2"
      >
        {business.b_name}
      </button>
    ));
  };

  const renderInventoryList = () => {
    return inventory.map((item) => (
      <div key={item.id} className="border-b-2 py-2">
        <h3>{item.product_name}</h3>
        <p>{item.description}</p>
        <p><strong>Price:</strong> ${item.price}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <img src={item.image} alt={item.product_name} className="w-32 h-32 object-cover" />
        <div>
          <button
            onClick={() => handleEditInventory(item)}
            className="mr-2 text-blue-500"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const renderEditInventoryForm = () => {
    if (!currentItem) return null;

    return (
      <div className="mb-4">
        <h3>Edit Inventory Item</h3>
        <div className="mb-2">
          <label className="block">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={currentItem.product_name}
            onChange={handleChangeInventory}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Description</label>
          <textarea
            name="description"
            value={currentItem.description}
            onChange={handleChangeInventory}
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div className="mb-2">
          <label className="block">Price</label>
          <input
            type="number"
            name="price"
            value={currentItem.price}
            onChange={handleChangeInventory}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={currentItem.quantity}
            onChange={handleChangeInventory}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block">Image URL</label>
          <input
            type="text"
            name="image"
            value={currentItem.image}
            onChange={handleChangeInventory}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleSaveInventory}
          className="bg-green-500 text-white p-2 mt-2"
        >
          Save Inventory Item
        </button>
        <button
          onClick={() => setIsEditingInventory(false)}
          className="bg-gray-500 text-white p-2 mt-2 ml-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h2>Manage Your Businesses</h2>
      <div className="my-4">
        <h3>Select a Business</h3>
        {renderBusinessList()}
      </div>
      {selectedBusinessId && (
        <div>
          <h3>Inventory for Selected Business</h3>
          {renderInventoryList()}
          {isEditingInventory && renderEditInventoryForm()}
        </div>
      )}
    </div>
  );
};

export default Inventory;
