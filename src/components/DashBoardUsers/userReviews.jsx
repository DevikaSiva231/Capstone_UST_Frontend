import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [newReviewText, setNewReviewText] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/reviews/");
        const userReviews = response.data.filter(review => review.user === userId);
        setReviews(userReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchUserReviews();
  }, [userId]);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/reviews/${reviewId}/`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (reviewId, text, rating, title) => {
    setEditingReviewId(reviewId);
    setNewReviewText(text);
    setNewRating(rating);
    setNewTitle(title);
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      // Get the current review details to preserve unmodified fields
      const currentReview = reviews.find((review) => review.id === reviewId);

      // Prepare the updated review data with the fields that are editable
      const updatedReview = {
        text: newReviewText || currentReview.text,  // Use new text if provided
        rating: newRating || currentReview.rating,  // Use new rating if provided
        title: newTitle || currentReview.title,  // Use new title if provided
        user: currentReview.user,  // Keep original user
        business: currentReview.business,  // Keep original business
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/reviews/${reviewId}/`,
        updatedReview
      );
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, ...response.data } : review
        )
      );
      setEditingReviewId(null);
      setNewReviewText("");
      setNewRating("");
      setNewTitle("");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-gold p-8">
      <div className="w-full max-w-3xl bg-black/60 p-6 rounded-lg shadow-xl backdrop-blur-lg border-2 border-gold">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-gold">Your Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-center text-lg text-gray-300">You haven't written any reviews yet.</p>
        ) : (
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-black/70 bg-opacity-30 rounded-lg p-4 border border-gold text-white shadow-md transition duration-300 hover:bg-black/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{review.title}</h3>
                  <small className="text-sm">{new Date(review.created_at).toLocaleString()}</small>
                </div>

                {editingReviewId === review.id ? (
                  <div>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-gold rounded text-white focus:outline-none focus:ring-2 focus:ring-gold mb-4"
                      placeholder="Title"
                    />
                    <textarea
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-gold rounded text-white focus:outline-none focus:ring-2 focus:ring-gold mb-4"
                      placeholder="Write your review..."
                    />
                    <div className="flex items-center mb-4">
                      <label htmlFor="rating" className="mr-4 font-bold text-lg text-gold">Rating:</label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                        className="w-16 p-2 bg-black/60 border border-gold rounded text-white focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleSaveEdit(review.id)}
                        className="px-6 py-2 rounded-full text-black bg-gold font-medium transition duration-300 hover:bg-yellow-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="px-6 py-2 rounded-full text-gray-200 bg-gray-700 font-medium transition duration-300 hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="mb-4">{review.text}</p>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-400">Rating: {review.rating}</div>
                      <div className="text-sm text-gray-400">By: {review.user_name}</div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(review.id, review.text, review.rating, review.title)}
                        className="px-4 py-1 rounded text-gold bg-gold font-medium transition duration-300 hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="px-4 py-1 rounded text-gray-200 bg-red-600 font-medium transition duration-300 hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
