import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    location: '',
    zipcode: '',
    is_business_owner: false,
    bio: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.password || !formData.email || !formData.location || !formData.zipcode) {
      alert('Please fill all required fields.');
      return;
    }

    const formPayload = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'profile_picture' && value) {
        formPayload.append(key, value);
      } else {
        formPayload.append(key, value);
      }
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Error signing up.');
      } else {
        alert('Sign Up successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <div className="hero glass min-h-screen bg-[url(https://images.pexels.com/photos/15309299/pexels-photo-15309299/free-photo-of-drawing-in-book.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="m-10 card glass w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input input-bordered"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="input input-bordered"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Zipcode</span>
                </label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  className="input input-bordered"
                  required
                  value={formData.zipcode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Are you a business owner?</span>
                </label>
                <input
                  type="checkbox"
                  name="is_business_owner"
                  className="checkbox"
                  checked={formData.is_business_owner}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bio</span>
                </label>
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself"
                  className="input input-bordered"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  name="profile_picture"
                  className="file-input file-input-bordered"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
