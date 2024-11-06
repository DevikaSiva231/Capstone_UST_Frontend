import React from 'react'
import {Link} from 'react-router-dom'
function Home() {
  return (
    
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
        <div className="hero-overlay bg-[url(https://promptlibrary.org/wp-content/uploads/2023/06/Metaverses-Neon-Ukiyo-e-Inside-midjourney-prompt.png)]">
            <div className=" bg-opacity-20"></div>
                <div className="m-10 text-neutral-content text-left">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <h2 className="text-2xl">Welcome to Around Town - Supporting Your Local Favourites</h2>
                        <p className="mb-5 mt-2">
                        Discover the best that our community has to offer. Join us in supporting local business, and be a part of a thriving community where each purchase has a positive impact. 
                        Explore, shop, and share the love for local.
                        </p>
                    <Link to="login/"><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
        <section>
        <div className="text-center glass h-44 w-full">
          <div className="flex justify-center pt-14 space-x-20">
            {/* Restaurant Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-utensils text-3xl"></i>
              <p className="mt-2 text-sm">Restaurant</p>
            </div>
            
            {/* Bookstore Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-book text-3xl"></i>
              <p className="mt-2 text-sm">Bookstore</p>
            </div>
            
            {/* Salon Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-bath text-3xl"></i>
              <p className="mt-2 text-sm">Salon</p>
            </div>
            
            {/* Plant Nursery Icon */}
            <div className="flex flex-col items-center">
              <i className="fas fa-seedling text-3xl"></i>
              <p className="mt-2 text-sm">Plant Nursery</p>
            </div>
          </div>
        </div>
      </section>

      <section className=" container w-full h-96">
        <div>
          <p className="text-center">restaurant</p>
        </div>
      </section>

      <section className="container h-96">
        <div>
          <p className="text-center">book shops</p>
        </div>
      </section>

      <section className="container h-96">
        <div>
          <p className="text-center">salon</p>
        </div>
      </section>

      <section className="container h-96">
        <div>
          <p className="text-center">others</p>
        </div>
      </section>
    </div>
  )
}

export default Home