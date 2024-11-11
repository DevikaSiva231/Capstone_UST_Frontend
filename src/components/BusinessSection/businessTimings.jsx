import React from 'react';

const BusinessTimings = ({ workTime }) => {
  return (
    <div className="glass" style={{ padding: "2rem", borderRadius: "4px" }}>
      <p
        className="text-4xl font-semibold text-center"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Our Timings
      </p>
      <br/>

      <div className="text-lg">
        <p className="flex justify-center mb-1">
          <span>Monday  :  {workTime.Monday.open} - {workTime.Monday.close}</span>
        </p>
        <p className="flex justify-center mb-1">
          <span>Tuesday  :  {workTime.Tuesday.open} - {workTime.Tuesday.close}</span>
        </p>
        <p className="flex justify-center mb-2">
          <span>Wednesday  :  {workTime.Wednesday.open} - {workTime.Wednesday.close}</span>
        </p>
        <p className="flex justify-center mb-2">
          <span>Thursday  :  {workTime.Thursday.open} - {workTime.Thursday.close}</span>
        </p>
        <p className="flex justify-center mb-2">
          <span>Friday  :  {workTime.Friday.open} - {workTime.Friday.close}</span>
        </p>
        <p className="flex justify-center mb-2">
          <span>Saturday  :  {workTime.Saturday.open} - {workTime.Saturday.close}</span>
        </p>
        <p className="flex justify-center mb-2">
          <span>Sunday  :  {workTime.Sunday.open}</span>
        </p>
      </div>
    </div>
  );
};

export default BusinessTimings;
