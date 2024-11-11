import React, { useState } from 'react';

function InventoryForm() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic (e.g., send data to an API)
    console.log('Form Submitted:', {
      product_name: productName,
      description,
      quantity,
      price,
    });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="block text-lg font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"  // To allow decimal values
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InventoryForm;
