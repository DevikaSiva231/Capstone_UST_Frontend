import React from 'react';

const BusinessTimings = ({ workTime }) => {
  return (
    <div style={{ padding: "2rem", borderRadius: "4px" }}>
      <p
        className="text-4xl font-semibold text-black text-center"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Our Timings
      </p>

      <div className="text-black text-lg">
        <p className="flex justify-between mb-1">
          <span>Monday:</span> <span>{workTime.Monday.open} - {workTime.Monday.close}</span>
        </p>
        <p className="flex justify-between mb-1">
          <span>Tuesday:</span> <span>{workTime.Tuesday.open} - {workTime.Tuesday.close}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Wednesday:</span> <span>{workTime.Wednesday.open} - {workTime.Wednesday.close}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Thursday:</span> <span>{workTime.Thursday.open} - {workTime.Thursday.close}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Friday:</span> <span>{workTime.Friday.open} - {workTime.Friday.close}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Saturday:</span> <span>{workTime.Saturday.open} - {workTime.Saturday.close}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Sunday:</span> <span>{workTime.Sunday.open}</span>
        </p>
      </div>
    </div>
  );
};

export default BusinessTimings;
