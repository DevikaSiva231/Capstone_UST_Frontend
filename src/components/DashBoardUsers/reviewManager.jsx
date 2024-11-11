import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewManager = ({ businessId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/reviews/?business=${businessId}&ordering=-date`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [businessId]);

    return (
        <div className="review-manager mb-4">
            <h4 className="text-lg font-semibold">Manage Reviews</h4>
            {reviews.map((review) => (
                <div key={review.id} className="review-item">
                    <p><strong>{review.title}</strong></p>
                    <p>{review.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewManager;
