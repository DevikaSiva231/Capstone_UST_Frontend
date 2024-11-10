import React from 'react';

// IconCard Component
function IconCard({ icon, label }) {
  return (
    <div className="flex flex-col items-center">
      <i className={`fas ${icon} text-3xl`}></i>
      <p className="mt-2 text-sm">{label}</p>
    </div>
  );
}

export default IconCard;
