import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ReviewSection = ({ businessId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/reviews/', {
                    params: { business: businessId },
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        if (businessId) {
            fetchReviews();
        }
    }, [businessId]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM d, yyyy");
    };

    return (
        <div className="max-w-4xl mx-auto py-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-200 mb-8">
                What our customers are saying
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="p-6 rounded-lg shadow-lg bg-black/60 glass hover:bg-black/70 transition-all relative">
                            <div className="text-left">
                                {/* User name in large font */}
                                <div className="text-2xl font-semibold text-[#FFD700] mb-2">{review.user_name}</div>
                                <h2 className="text-xl font-bold text-[#FFD700] mb-2">{review.title}</h2>
                                <p className="text-gray-200 mb-4 h-20 overflow-hidden">{review.content}</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span
                                                key={index}
                                                className={`text-xl ${
                                                    index < review.rating
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-gray-400 text-sm flex items-center gap-1">
                                        <span>👍 {review.likes}</span>
                                    </div>
                                </div>
                                {/* Date positioned at the bottom left */}
                                <div className="absolute bottom-2 left-2 text-gray-400 text-sm">
                                    {formatDate(review.created_at)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No reviews available for this business.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
