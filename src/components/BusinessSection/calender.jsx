import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

const Calendar = ({ id }) => {
  const [selected, setSelected] = useState(null);
  const [events, setEvents] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch events data
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/events/?business=${id}&status=published`)
      .then((response) => {
        const publishedEvents = response.data.filter(
          (event) => event.status === 'published'
        );

        // Store the event start times as Date objects for correct comparison
        const dates = publishedEvents.map((event) => new Date(event.start_time));

        setEvents(publishedEvents);
        setHighlightedDates(dates);
        setLoading(false);
        console.log('events:', events);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Find the event for the selected date
  const getEventDetails = (date) => {
    const selectedDateString = date.toLocaleDateString();
    const event = events.find(
      (event) => new Date(event.start_time).toLocaleDateString() === selectedDateString
    );
    return event ? (
      <div>
        <h3 className="font-semibold text-lg">{event.name}</h3>
        <p>{event.description}</p>
        <p>
          <strong>Time:</strong> {new Date(event.start_time).toLocaleTimeString()} -{' '}
          {new Date(event.end_time).toLocaleTimeString()}
        </p>
      </div>
    ) : (
      <p>No events for this day.</p>
    );
  };

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{ highlighted: highlightedDates }}
        modifiersStyles={{
          highlighted: { backgroundColor: '#4caf50', color: 'white',borderRadius: '50%', 
          padding: '5px', },
        }}
        footer={
          selected ? (
            getEventDetails(selected)
          ) : (
            <p>Pick a day to see the events.</p>
          )
        }
      />

      {loading && <p>Loading events...</p>}
      {error && <p>Error loading events: {error.message}</p>}
    </div>
  );
};

export default Calendar;
