import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../../pages/ownerprofile';
import BusinessList from './businessList';
import UserReviewSection from './userReviewSection';

const Dashboard = () => {
    const userId = useSelector((state) => state.user.userId);
    const isBusinessOwner = useSelector((state) => state.user.isBusinessOwner);

    return (
        <div className="dashboard-container p-4">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <UserProfile userId={userId} />
            {isBusinessOwner && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">My Businesses</h2>
                    <BusinessList userId={userId}/>
                </>
            )}
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
            <UserReviewSection userId={userId} />
        </div>
    );
};

export default Dashboard;
