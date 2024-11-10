import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import superMarketPic from '../../images/home/superMarket-pic.jpg';
import bookStorePic from '../../images/home/bookstore-pic.jpg';
import restaurantPic from '../../images/home/restaurant-pic.jpg';
import salonPic from '../../images/home/barber-pic.jpg';


const HomeCarousel = () => {
  return (
    <div>
        <Carousel
            autoPlay={true}
            interval={3000}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            
            >
            {/* Slide 1: Supermarket */}
            <div className="carousel-item w-full relative h-[600px]">
                <img src={superMarketPic} className="w-full object-cover h-[600px]" alt="Supermarket" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
                <h1 className="text-4xl font-bold">Your Daily Essentials, Right Around the Corner</h1>
                <p className="mt-2 text-lg">Support your local supermarket and enjoy fresh produce every day.</p>
                </div>
            </div>

            {/* Slide 2: Bookstore */}
            <div className="carousel-item w-full relative h-[600px]">
                <img src={bookStorePic} className="w-full object-cover h-[600px]" alt="Bookstore" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
                <h1 className="text-4xl font-bold">Discover New Stories at Your Local Bookstore</h1>
                <p className="mt-2 text-lg">Find your next favorite read and support local authors.</p>
                </div>
            </div>

            {/* Slide 3: Restaurant */}
            <div className="carousel-item w-full relative h-[600px]">
                <img src={restaurantPic} className="w-full object-cover h-[600px]" alt="Restaurant" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
                <h1 className="text-4xl font-bold">Savor Local Flavors, One Bite at a Time</h1>
                <p className="mt-2 text-lg">Dine at your neighborhood's best eateries and taste the love in every dish.</p>
                </div>
            </div>

            {/* Slide 3: Salon */}
            <div className="carousel-item w-full relative h-[600px]">
                <img src={salonPic} className="w-full object-cover h-[600px]" alt="Restaurant" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4">
                <h1 className="text-4xl font-bold">Transform Your Look, Elevate Your Day</h1>
                <p className="mt-2 text-lg">Discover the finest stylists in town and leave feeling refreshed and renewed.</p>

                </div>
            </div>
        </Carousel>

    </div>
  )
}

export default HomeCarousel