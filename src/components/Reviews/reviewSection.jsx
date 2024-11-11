import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewSection = ({ businessId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Modify the API call to include businessId as a query parameter
                const response = await axios.get('http://127.0.0.1:8000/api/reviews/', {
                    params: { business: businessId },  // Pass businessId in the query parameters
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (businessId) {
            fetchReviews();  // Only fetch reviews if businessId is provided
        }
    }, [businessId]);  // Dependency array includes businessId to refetch on change

    return (
        <div className="mx-auto ml-14 py-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">
                Here's what our customers have to say.
            </h2>
            <br />
            <div className="grid grid-cols-3 gap-4 ml-2">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="card bg-base-100 w-80 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{review.title}</h2>
                                <p>{review.content}</p>
                                <br />
                                <div className="card-actions justify-end">
                                    <div className="rating gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <input
                                                key={index}
                                                type="radio"
                                                name={`rating-${review.id}`}
                                                className={`mask mask-heart ${
                                                    index < review.rating
                                                        ? 'bg-yellow-400'
                                                        : 'bg-gray-200'
                                                }`}
                                                defaultChecked={index === review.rating - 1}
                                                disabled
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available for this business.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
