import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Event() {
  return (
    <Carousel
      autoPlay={true} // Enable autoplay
      interval={2000} // Delay between slides in milliseconds (3 seconds)
      infiniteLoop={true} // Enable infinite loop
      showThumbs={false} // Hide thumbnail navigation
      showStatus={false} // Hide the status (slide number)
    >
      <div id="item1" className="carousel-item w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
          className="w-full"
          alt="Event 1"
        />
      </div>
      <div id="item2" className="carousel-item w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
          className="w-full"
          alt="Event 2"
        />
      </div>
      <div id="item3" className="carousel-item w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
          className="w-full"
          alt="Event 3"
        />
      </div>
    </Carousel>
  );
}

export default Event;
