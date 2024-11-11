import React from 'react';
import { useNavigate } from 'react-router';

const BusinessSection = ({arr, image}) => {
  const navigate = useNavigate()
  return (
    <>
  <div className="relative h-96 bg-cover bg-center" 
     style={{ backgroundImage: `url(${image})` }}>
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

  <div className="relative z-10 grid grid-cols-3 grid-rows-2 gap-4 h-full items-center p-8">

    {/* Left Column-Category Info Box */}

    <div className="bg-white p-6 max-w-sm row-span-2 mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">{arr.category}</h2>
      <p className="text-gray-600 mt-2">
        Details about other businesses, register business, view business.
      </p>
    </div>

    {/* Right Column-Carousel Section (2-row span) */}

    <div className="carousel carousel-center  col-span-2 row-span-2 space-x-10 p-2">
      {arr.map((restaurant) => (
        <div key={restaurant.id} className="business-category">
          <div className="carousel carousel-center rounded-none space-x-10 p-2 h-80">
            <div key={restaurant.id} className="carousel-item">
              <div className="card card-compact bg-base-100 w-72 shadow-xl rounded-none">
                <figure className="rounded-none">
                  <img
                    src={restaurant.images}
                    alt="Business Image"
                    className="rounded-none"
                  />
                </figure>
                <div className="card-body rounded-none">
                  <h2 className="card-title">{restaurant.b_name}</h2>
                  <p>{restaurant.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        navigate('/business', { state: { id: restaurant?.id || -1 } })}
                      className="btn btn-primary rounded-none"
                    >
                      Visit Website
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  )
}

export default BusinessSection

