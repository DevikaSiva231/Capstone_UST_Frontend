import React from "react";

const SideNavigation = ({ setActiveOption, isBusinessOwner }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Dashboard</h2>
      <ul>
        <li onClick={() => setActiveOption("userDetails")} className="cursor-pointer mb-2">User Details</li>
        <li onClick={() => setActiveOption("userReviews")} className="cursor-pointer mb-2">Reviews</li>
        {isBusinessOwner && (
          <>
            <li onClick={() => setActiveOption("businessReviews")} className="cursor-pointer mb-2">Business Reviews</li>
            <li onClick={() => setActiveOption("inventory")} className="cursor-pointer mb-2">Inventory</li>
            <li onClick={() => setActiveOption("events")} className="cursor-pointer mb-2">Events</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNavigation;
