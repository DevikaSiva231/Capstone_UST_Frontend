import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

function Login() {
    const navigate=useNavigate()
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api/token/`, {
            username: 'devika',
            password: 'anjudevu123',
          });
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          console.log('INside');
          navigate('/home');
        } catch (error) {
          console.error('Login failed', error);
        }
      };
      
  return (
    <div>
        <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now</h1>
            <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            </div>
            <div className="m-10 card glass w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="text" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login