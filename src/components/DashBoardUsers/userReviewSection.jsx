import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserReviewSection = ({ userId }) => {
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/reviews/?user=${userId}`);
                setUserReviews(response.data);
            } catch (error) {
                console.error('Error fetching user reviews:', error);
            }
        };

        fetchUserReviews();
    }, [userId]);

    return (
        <div className="user-review-section">
            {userReviews.map((review) => (
                <div key={review.id} className="review-item">
                    <h4>{review.title}</h4>
                    <p>{review.content}</p>
                </div>
            ))}
        </div>
    );
};

export default UserReviewSection;
