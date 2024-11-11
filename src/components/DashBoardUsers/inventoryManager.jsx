import React from 'react';

const InventoryManager = ({ businessId }) => {
    return (
        <div className="inventory-manager mb-4">
            <h4 className="text-lg font-semibold">Manage Inventory</h4>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Edit Inventory
            </button>
        </div>
    );
};

export default InventoryManager;
