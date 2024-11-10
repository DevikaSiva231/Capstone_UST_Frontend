import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReviewForm = () => {
    const userId = useSelector((state) => state.user.userId); // Access userId from Redux
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [likes, setLikes] = useState(0);
    const [business, setBusiness] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) return; // Ensure userId is present

        const reviewData = { title, content, rating, likes, user: userId, business };

        try {
            await axios.post('http://127.0.0.1:8000/api/reviews/', reviewData);
            alert('Review submitted successfully!');
        } catch (error) {
            alert('Failed to submit review');
            console.error(error);
        }
    };

    if (!userId) {
        return (
            <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
                <p className="text-gray-600 font-semibold">Please log in to submit a review.</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6 transition-all hover:shadow-2xl transform hover:scale-105 duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submit Your Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Rating</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Likes</label>
                    <input
                        type="number"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Business</label>
                    <input
                        type="text"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;