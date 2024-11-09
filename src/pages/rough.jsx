
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const scrollAnimation = {
//   hidden: { opacity: 0, y: 100 },
//   visible: { opacity: 1, y: 0 },
// };

// function ScrollAnimation() {
//   const { ref, inView } = useInView({
//     triggerOnce: true,     // Only trigger the animation once
//     threshold: 0.1,        // Trigger animation when 10% of the element is visible
//   });

//   return (
//     <div className="App">
//         <div className="hero min-h-screen">hi</div>
//       <h1>Scroll Down to See Animation</h1>
//       <motion.div
//         ref={ref}
//         className="animated-container"
//         initial="hidden"
//         animate={inView ? "visible" : "hidden"}
//         variants={scrollAnimation}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <motion.img
//           src="https://tse3.mm.bing.net/th/id/OIP.fVteXNVbJejGLybVXCmQBwHaE8?w=288&h=192&c=7&r=0&o=5&dpr=1.5&pid=1.7"
//           alt="Animated Object"
//           className="animated-image"
//         />
//       </motion.div>
//     </div>
//   );
// }

// export default ScrollAnimation;


// App.jsx


// App.jsx
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Rough() {


  const [businesses, setBusinesses] = useState({
    restaurants: [],
    bookstores: [],
    salons: [],
    supermarkets: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // const categories = {
  //   restaurants: 'RESTAURANT',
  //   bookstores: 'BOOKSTORE',
  //   salons: 'SALON',
  //   supermarkets: 'SUPERMARKET',
  // };

  const fetchBusinesses = async (category, key) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/businesses/?category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log("response--->",category,response.data);
      setBusinesses((prev) => ({ ...prev, [key]: response.data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllBusinesses = async () => {
      await Promise.all(
        Object.entries(categories).map(([key, value]) => fetchBusinesses(value, key))
      );
      setLoading(false);
    };
    
    fetchAllBusinesses();

  }, []);

  const categories = ['restaurants', 'bookstores', 'salons', 'supermarkets'];
  return (

    <div className="relative h-96 bg-[url(https://eatdrinkflash.co.uk/wp-content/uploads/2021/06/DSC00807-scaled.jpg)] bg-cover bg-center">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
    <div className="relative z-10 grid grid-cols-3 gap-2 h-full items-center p-8">

<div className="carousel carousel-center rounded-box col-span-2 mt-8 space-x-10 p-2">
  {categories.map((category) => (
    <div key={category} className="business-category">
      <h2 className="text-xl font-semibold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <div className="carousel carousel-center rounded-box space-x-10 p-2">
        {/* Check if the category exists in businesses object */}
        {businesses[category] && businesses[category].length > 0 && businesses[category].map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="card bg-base-100 image-full w-64 h-72 shadow-xl">
              <figure>
                <img
                  src={item.images || 'https://via.placeholder.com/150'} // Use a fallback if no image is available
                  alt={item.b_name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.b_name}</h2>
                <p>{item.description}</p>
                {item.work_time?.Monday && (
                  <p>
                    Monday: {item.work_time.Monday.open} - {item.work_time.Monday.close}
                  </p>
                )}
                <div className="card-actions justify-end">
                  <button onClick={() => nav(item)} className="btn btn-primary">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
</div>
</div>

  );
}

export default Rough;

