import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventManager from './EventManager';
import InventoryManager from './InventoryManager';
import ReviewManager from './ReviewManager';

const BusinessList = ({ userId }) => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/businesses/?owner=${userId}`);
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            }
        };

        fetchBusinesses();
    }, [userId]);

    return (
        <div className="business-list">
            {businesses.map((business) => (
                <div key={business.id} className="business-item mb-4">
                    <h3 className="text-xl font-semibold">{business.name}</h3>
                    <EventManager businessId={business.id} />
                    <InventoryManager businessId={business.id} />
                    <ReviewManager businessId={business.id} />
                </div>
            ))}
        </div>
    );
};

export default BusinessList;
