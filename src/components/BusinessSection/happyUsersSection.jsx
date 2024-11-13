import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const HappyUsersSection = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/reviews/');
                const sortedReviews = response.data.sort((a, b) => b.rating - a.rating); // Sort by rating, highest first
                setReviews(sortedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM d, yyyy");
    };

    return (
        <div className="m-20 container h-auto text-center">
            <h2 className="text-3xl font-semibold text-gold-700 mb-8">Our Happy Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-6 rounded-lg shadow-lg bg-black/60 glass hover:bg-black/70 transition-all relative"
                            style={{ height: '320px', width: '280px' }} // Fixed card dimensions
                        >
                            <div className="text-left h-full">
                                <div className="text-2xl font-semibold text-[#FFD700] mb-2">{review.user_name}</div>
                                <h2 className="text-xl font-bold text-[#FFD700] mb-2">{review.title}</h2>
                                <p className="text-gray-200 mb-2 h-16 overflow-hidden overflow-ellipsis">{review.content}</p>

                                {/* Rating Stars */}
                                <div className="flex justify-start gap-1 mb-4">
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

                                {/* Likes and Date */}
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="text-gray-400 text-sm flex items-center gap-1">
                                        <span>👍 {review.likes}</span>
                                    </div>
                                    <div className="text-gray-400 text-sm absolute bottom-2 left-2">
                                        {formatDate(review.created_at)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No reviews available.</p>
                )}
            </div>
        </div>
    );
};

export default HappyUsersSection;
