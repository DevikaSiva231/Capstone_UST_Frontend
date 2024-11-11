import React from 'react';
import { useNavigate } from 'react-router';

const BusinessSection1 = ({arr, image, businessCategory}) => {
  const navigate = useNavigate()
  return (
    <>
  <div className="relative h-96 bg-cover bg-center" 
     style={{ backgroundImage: `url(${image})` }}>
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div className="relative z-10 grid grid-cols-3 grid-rows-2 gap-4 h-full items-center p-8">
    {/* Right Column - Carousel Section (2-row span) */}
    <div className="carousel carousel-center  col-span-2 row-span-2 space-x-10 p-2">
      {arr.map((restaurant) => (
        <div key={restaurant.id} className="business-category">
          <div className="carousel carousel-center rounded-lg space-x-10 p-2 h-80 relative">
            <div key={restaurant.id} className="carousel-item">
              <div className="card card-compact bg-base-100 w-72 shadow-xl rounded-lg relative">
                {/* Button in the top right corner */}
                <button
                  onClick={() =>
                    navigate('/business', { state: { id: restaurant?.id || -1 } })
                  }
                  className="btn bg-[#D8A32A] text-black btn-sm rounded-full absolute top-2 right-2 flex items-center gap-1"
                >
                  <span>Visit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5l6 6m0 0l-6 6m6-6H3"
                    />
                  </svg>
                </button>

                <figure className="rounded-lg h-[70%]">
                  <img
                    src={restaurant.images}
                    alt="Business Image"
                    className="rounded-t-lg object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body rounded-b-lg h-[30%]">
                  <h2 className="card-title">{restaurant.b_name}</h2>
                  <p>{restaurant.description}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
    
    {/* Left Column - Category Info Box */}
    <div className="p-6 max-w-sm row-span-2 mx-auto bg-opacity-70 rounded-lg backdrop-blur-lg bg-gray-800">
      <h2 className="text-xl font-semibold">{businessCategory}</h2>
      <p className="mt-2">
        Details about other businesses, register business, view business.
      </p>
    </div>


  </div>
</div>

    </>
  )
}

export default BusinessSection1

