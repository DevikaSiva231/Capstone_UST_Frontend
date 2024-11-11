import React from 'react';

const EventManager = ({ businessId }) => {
    return (
        <div className="event-manager mb-4">
            <h4 className="text-lg font-semibold">Manage Events</h4>
            <button className="py-2 px-4 bg-blue-600 text-white rounded-lg">
                Create Event
            </button>
        </div>
    );
};

export default EventManager;
