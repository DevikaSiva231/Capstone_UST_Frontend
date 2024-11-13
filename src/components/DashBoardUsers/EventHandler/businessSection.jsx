import React from "react";
import { useNavigate } from "react-router-dom";
import EventManager from "./EventManager"; // Import the EventManager

const BusinessSection = ({ userId, arr, image, businessCategory }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 grid grid-cols-3 grid-rows-2 gap-4 h-full items-center p-8">
          <div className="p-6 max-w-sm row-span-2 mx-auto bg-opacity-70 rounded-lg backdrop-blur-lg bg-gray-800">
            <h2 className="text-xl font-semibold text-yellow-600">{businessCategory}</h2>
            <p className="mt-2">Details about businesses in this category.</p>
          </div>

          <div className="col-span-2 row-span-2 space-y-4">
            {arr.map((restaurant) => (
              <div key={restaurant.id} className="business-category bg-white p-4 rounded-lg shadow-lg">
                <div className="relative">
                  <button
                    onClick={() =>
                      navigate("/business", { state: { id: restaurant.id } })
                    }
                    className="btn bg-yellow-500 text-black absolute top-2 right-2 rounded-full"
                  >
                    Visit
                  </button>

                  <figure className="rounded-lg">
                    <img
                      src={restaurant.images}
                      alt="Business"
                      className="rounded-t-lg object-cover w-full h-48"
                    />
                  </figure>

                  <div className="card-body rounded-b-lg">
                    <h3 className="text-lg font-semibold">{restaurant.b_name}</h3>
                    <p>{restaurant.description}</p>
                  </div>

                  {/* Event Management */}
                  <EventManager userId={userId} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSection;
