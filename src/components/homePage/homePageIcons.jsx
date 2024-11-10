import React from 'react';
import IconCard from './IconCard';

const HomePageIcons = () => {
  return (
    <div className="flex justify-center pt-14 space-x-20">
      {/* Restaurant Icon */}
      <a href="#restaurants">
        <IconCard icon="fa-utensils" label="Restaurant" />
      </a>

      {/* Bookstore Icon */}
      <a href="#bookstores">
        <IconCard icon="fa-book" label="Bookstore" />
      </a>
      
      {/* Salon Icon */}
      <a href="#salons">
        <IconCard icon="fa-bath" label="Salon" />
      </a>
      
      {/* Supermarket Icon */}
      <a href="#supermarkets">
        <IconCard icon="fa-seedling" label="Others" />
      </a>
    </div>
  );
};

export default HomePageIcons;
