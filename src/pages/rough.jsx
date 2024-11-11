import React from 'react'

const Rough = () => {
  return (
    <div>
      <div className="p-10 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
  <h2
    className="text-4xl font-semibold text-center mb-8"
    style={{ fontFamily: 'Playfair Display, serif' }}
  >
    Opening Time Hours
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Column: General Opening Times */}
    <div>
      <h3 className="text-2xl font-semibold mb-4">General Hours</h3>
      <div className="text-lg">
        <p className="flex justify-between mb-2">
          <span>Monday - Friday:</span> <span>9-9</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Saturday:</span> <span>10-10</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Sunday:</span> <span>10-10</span>
        </p>
      </div>
    </div>

    {/* Right Column: Meal Times */}
    <div>
      <h3 className="text-2xl font-semibold mb-4">Meal Hours</h3>
      <div className="text-lg">
        <p className="flex justify-between mb-2">
          <span>Breakfast:</span>
          <span>Monday - Friday: 7:00 AM - 11:30 AM</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Lunch:</span>
          <span>Monday - Sunday: 11:30 AM - 3:00 PM</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Dinner:</span>
          <span>Monday - Sunday: 6:00 PM - 11:00 PM</span>
        </p>
      </div>
    </div>
  </div>

  <p className="text-sm text-center mt-4 italic">
    * On holidays, special hours may apply.
  </p>
</div>

    </div>
  )
}

export default Rough