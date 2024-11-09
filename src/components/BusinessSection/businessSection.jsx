import React from 'react';

const BusinessSection = ({arr, image}) => {
  return (
    <>
        <div className="relative h-96 bg-cover bg-center" 
            style = {{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <div className="relative z-10 grid grid-cols-3 gap-2 h-full items-center p-8">
          <div className="bg-white p-6 max-w-sm mx-auto">
              <h2 className="text-xl font-semibold text-gray-800">Restaurants</h2>
              <p className="text-gray-600 mt-2">Details about other businesses ,register business,view business.</p>
          </div>


          <div className="carousel carousel-center rounded-box col-span-2 mt-8 space-x-10 p-2 ">
            {arr.map((restaurant) => (
              <div key={restaurant.id} className="business-category">
                <div className="carousel carousel-center rounded-box space-x-10 p-2">
                  <div key={restaurant.id} className="carousel-item">
                    <div className="card bg-base-100 image-full w-64 h-72 shadow-xl">
                      <figure>
                        <img
                          src={restaurant.images || 'https://via.placeholder.com/150'} // Use a fallback if no image is available
                          alt={restaurant.b_name}
                        />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{restaurant.b_name}</h2>
                        <p>{restaurant.description}</p>
                        {restaurant.work_time?.Monday && (
                          <p>
                            Monday: {restaurant.work_time.Monday.open} - {restaurant.work_time.Monday.close}
                          </p>
                        )}
                        <div className="card-actions justify-end">
                          <button onClick={() => nav(restaurant)} className="btn btn-primary">
                            Search
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