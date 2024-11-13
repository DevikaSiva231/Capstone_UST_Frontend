import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewItem from "./reviewItem";

const BusinessOwnerDashboard = () => {
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState({});
  const isBusinessOwner = useSelector((state) => state.user.isBusinessOwner);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/businesses/owner/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    if (isBusinessOwner) {
      fetchBusinesses();
    }
  }, [isBusinessOwner, userId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const reviewPromises = businesses.map((business) =>
          axios.get("http://127.0.0.1:8000/api/reviews/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: { business: business.id },
          })
        );

        const reviewsResponses = await Promise.all(reviewPromises);
        const reviewsData = reviewsResponses.reduce((acc, response, index) => {
          acc[businesses[index].id] = response.data;
          return acc;
        }, {});

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (businesses.length > 0) {
      fetchReviews();
    }
  }, [businesses]);

  return (
    <div className="container mx-auto p-6">
      {isBusinessOwner && (
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center text-gold">Your Businesses</h2>
          {businesses.length === 0 ? (
            <p className="text-center text-gold">No businesses registered under your account.</p>
          ) : (
            businesses.map((business) => (
              <div
                key={business.id}
                className="mb-8 p-6 bg-black/60 backdrop-blur-md rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-gold">{business.b_name}</h3>
                <p className="text-gold"><strong>Location:</strong> {business.address}</p>
                <p className="text-gold"><strong>Phone:</strong> {business.phone}</p>
                <p className="text-gold"><strong>Opening Hours:</strong></p>
                <ul className="text-gold">
                  {Object.entries(business.work_time).map(([day, hours]) => (
                    <li key={day}>
                      <strong>{day}:</strong> {hours.open === "Closed" ? "Closed" : `${hours.open} - ${hours.close}`}
                    </li>
                  ))}
                </ul>

                {/* Review Slider */}
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-gold mb-2">Reviews</h4>
                  <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                    {reviews[business.id] && reviews[business.id].length > 0 ? (
                      reviews[business.id].map((review) => (
                        <ReviewItem key={review.id} review={review} />
                      ))
                    ) : (
                      <p className="text-gray-400 text-gold">No reviews for this business yet.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// ReviewItem Component with Read More functionality

export default BusinessOwnerDashboard;
