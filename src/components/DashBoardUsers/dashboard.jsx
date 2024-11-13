import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for API calls
import SideNavigation from "./SideNavigation";
import UserDetails from "./UserDetails";
import UserReviews from "./UserReviews";
import BusinessOwnerDashboard from "./BusinessReviews";
import Inventory from "./Inventory";
import Events from "./Events";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [activeOption, setActiveOption] = useState("userDetails");

  const user = useSelector((state) => state.user); // Get user details from Redux store
  const isBusinessOwner = user.isBusinessOwner;
  const userId = user.id; // Assuming `user` has an `id` field


  const renderContent = () => {
    switch (activeOption) {
      case "userDetails":
        return <UserDetails />;
      case "userReviews":
        return <UserReviews />;
      case "businessReviews":
        return <BusinessOwnerDashboard />;
      case "inventory":
        return <Inventory />;
      case "events":
        return <Events />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="flex">
      <SideNavigation
        setActiveOption={setActiveOption}
        isBusinessOwner={isBusinessOwner}
      />
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;