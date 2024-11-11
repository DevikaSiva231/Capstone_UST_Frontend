import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewsSection({ businessId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/reviews/`)
      .then((response) => {
        const reviewsData = response.data.filter(review => review.business === businessId);
        setReviews(reviewsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      })
      .catch((error) => setError(error));
  }, [businessId]);

  if (error) return <div>Error loading reviews: {error.message}</div>;

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-4">
              <p><strong>Title:</strong> {review.title}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Content:</strong> {review.content}</p>
              <p><strong>User:</strong> {review.user_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReviewsSection;
