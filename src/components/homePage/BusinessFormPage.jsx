import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state

function BusinessFormPage() {
  // Get the userId from Redux store
  const userId = useSelector((state) => state.user.userId);

  const [bname, setBname] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [worktime, setWorktime] = useState({
    Monday: { open: '', close: '' },
    Tuesday: { open: '', close: '' },
    Wednesday: { open: '', close: '' },
    Thursday: { open: '', close: '' },
    Friday: { open: '', close: '' },
    Saturday: { open: '', close: '' },
    Sunday: { open: '', close: '' },
  });

  const navigate = useNavigate();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('image',file)
    if (file) {
      setImage(file);
    }
  };

  // Set the same work time for all days
  const handleSetSameTime = () => {
    const openTime = worktime.Monday.open;
    const closeTime = worktime.Monday.close;
    setWorktime({
      Monday: { open: openTime, close: closeTime },
      Tuesday: { open: openTime, close: closeTime },
      Wednesday: { open: openTime, close: closeTime },
      Thursday: { open: openTime, close: closeTime },
      Friday: { open: openTime, close: closeTime },
      Saturday: { open: openTime, close: closeTime },
      Sunday: { open: openTime, close: closeTime },
    });
  };

  // Prepare the details for submission, including userId and worktime
  const details = {
    
    owner: userId,
    b_name: bname,
    address: address,
    zipcode: zipcode,
    phone: phone,
    email: email,
    website: website,
    description: description,
    category: category.toUpperCase(), // Ensure category is in uppercase
    work_time: worktime,
  };

  console.log('UserId owner:', userId);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('owner', details.owner);
    formData.append('b_name', details.b_name);
    formData.append('address', details.address);
    formData.append('zipcode', details.zipcode);
    formData.append('phone', details.phone);
    formData.append('email', details.email);
    formData.append('website', details.website);
    formData.append('description', details.description);
    formData.append('category', details.category);
    formData.append('work_time', JSON.stringify(details.work_time));

    // Only append image if one is selected
    if (image) {
      formData.append('image', image);
    }
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/businesses/', formData, {
            headers: {
              'Authorization': `Bearer ${accessToken}`, // Send the access token in the Authorization header
              // 'Content-Type': 'multipart/form-data' // axios automatically sets the content type for FormData
            },
          });
      console.log('Form submitted successfully:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register Your Business</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="block text-lg font-medium">Business Name</label>
          <input
            type="text"
            value={bname}
            onChange={(e) => setBname(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Zipcode</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Website</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Salon">Salon</option>
            <option value="Bookstore">Bookstore</option>
            <option value="Supermarket">Supermarket</option>
          </select>
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="form-control">
          <label className="block text-lg font-medium">Work Time</label>
          <div className="space-y-2">
            {Object.keys(worktime).map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span>{day}</span>
                <input
                  type="time"
                  value={worktime[day].open}
                  onChange={(e) =>
                    setWorktime({
                      ...worktime,
                      [day]: { ...worktime[day], open: e.target.value },
                    })
                  }
                  className="p-2 border rounded-md"
                />
                <span>to</span>
                <input
                  type="time"
                  value={worktime[day].close}
                  onChange={(e) =>
                    setWorktime({
                      ...worktime,
                      [day]: { ...worktime[day], close: e.target.value },
                    })
                  }
                  className="p-2 border rounded-md"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleSetSameTime}
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md"
          >
            Set Same Time for All Days
          </button>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BusinessFormPage;
