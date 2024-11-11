import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import InventoryForm from '../components/DashBoardUsers/inventoryForm';

function InventorySection({ businessId, businessName }) {
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    if (businessId) {
      axios
        .get(`http://127.0.0.1:8000/api/inventory/?business=${businessId}`)
        .then((response) => {
          console.log('Inventory Data:', response.data);
          setInventory(response.data);
        })
        .catch((error) => setError(error));
    }
  }, [businessId]);

  const handleEdit = (item) => {
    
    alert(`Edit item: ${item.product_name}`);
  };

  if (error) return <div>Error loading inventory: {error.message}</div>;

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Inventory for {businessName}</h3>
      {inventory.length === 0 ? (
        <p>No inventory items found.</p>
      ) : (
        <ul>
          {inventory.map((item) => (
            <li key={item.id} className="mb-4">
              <p><strong>Product Name:</strong> {item.product_name}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <button
                onClick={() => handleEdit(item)}
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InventorySection;
